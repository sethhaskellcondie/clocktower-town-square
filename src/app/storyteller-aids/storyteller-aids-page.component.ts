import { ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, viewChild } from '@angular/core';
import { StorytellerAidCardComponent } from './storyteller-aid-card.component';
import { STORYTELLER_AID_GROUPS, STORYTELLER_AIDS } from './storyteller-aid-library';
import { StorytellerAid } from './storyteller-aid';
import { LoadedAidsService } from './loaded-aids.service';

// A drag counts as a swipe once it's gone a quarter of the way across (or
// up or down) the screen, or sooner if it was a quick flick: at least this
// many pixels, at this many pixels a millisecond or faster
const SWIPE_FRACTION = 0.25;
const FLICK_DISTANCE = 30;
const FLICK_SPEED = 0.5;

// Once a drag has gone this many pixels, whichever way it's gone most,
// sideways or up and down, is the way it goes from then on, so the cards
// don't wobble sideways under a swipe up
const AXIS_DISTANCE = 10;

// The arrow keys step through the aids on a computer
const KEY_STEPS: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };

type Axis = 'x' | 'y';

// A finger on the screen, from where it first touched down
interface Drag {
  pointerId: number;
  startX: number;
  startY: number;
  startTime: number;
  width: number;
  height: number;
  // How far down the overview was scrolled when the drag began
  scrollTop: number;
  axis: Axis | null;
}

// The storyteller's own page, opened on their phone rather than the host's
// screen. It shows one aid at a time, filling the screen, so it can be held
// up to a player as is. Swiping left moves on to the next aid and swiping
// right goes back, round and round, with the card following the finger as
// it's dragged. Only the loaded aids come round.
//
// Swiping up opens the overview: every aid there is, laid out small under
// a heading for each category, the unloaded ones dimmed. Tapping an aid there loads or unloads it, and
// swiping down goes back to the loaded aids one at a time. On a computer the
// arrow keys do the same, with Escape closing the overview as well.
//
// Swipes are read from pointer events, which cover fingers, mice, and pens
// alike: where the pointer goes down, where it moves, and where it comes up.
@Component({
  selector: 'app-storyteller-aids-page',
  imports: [StorytellerAidCardComponent],
  templateUrl: './storyteller-aids-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './storyteller-aids-page.component.scss'
})
export class StorytellerAidsPageComponent {
  readonly library = STORYTELLER_AIDS;
  readonly groups = STORYTELLER_AID_GROUPS;
  readonly loadedAids = inject(LoadedAidsService);
  index = 0;
  // How far the cards are pulled sideways, in pixels: following the finger
  // during a drag, then sliding a whole screen over to change aids
  offset = 0;
  // Whether the cards are sliding into place after a drag
  settling = false;
  overviewOpen = false;

  private drag: Drag | null = null;
  // Whether the last drag went anywhere, so the click a mouse sends after
  // one isn't taken for a tap on an aid in the overview
  private dragged = false;
  // Which way the aids move once the cards finish sliding: 1 for the next
  // aid, -1 for the previous one, 0 to stay put
  private pendingStep = 0;
  // The aid in view when the overview opened, to come back to
  private returnTo: StorytellerAid | undefined;
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;
  private readonly overview = viewChild.required<ElementRef<HTMLElement>>('overview');

  // The aids that come round, in the order they come
  get aids(): readonly StorytellerAid[] {
    return this.loadedAids.aids();
  }

  // The current aid, in view, with the aids either side of it waiting just
  // off each edge of the screen, ready to be dragged in
  get slots(): { position: number; aid: StorytellerAid }[] {
    if (this.aids.length < 2) return this.aids.map(aid => ({ position: 0, aid }));
    return [-1, 0, 1].map(position => ({ position, aid: this.aidAt(this.index + position) }));
  }

  onPointerDown(event: PointerEvent): void {
    if (!event.isPrimary) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    // A new drag cuts short the cards still sliding from the last one
    if (this.settling) this.finishSettling();
    const target = event.currentTarget as HTMLElement;
    // Keep hearing about this pointer even once it leaves the page. Not in
    // the overview, though, where the pointer is left with the aid it went
    // down on, so a tap clicks that aid.
    if (!this.overviewOpen) target.setPointerCapture(event.pointerId);
    this.dragged = false;
    this.drag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startTime: event.timeStamp,
      width: target.clientWidth,
      height: target.clientHeight,
      scrollTop: this.overview().nativeElement.scrollTop,
      axis: null,
    };
  }

  // The cards follow a finger dragging sideways. The overview scrolls under
  // one dragging up and down, which the page has to do itself, since it
  // keeps every touch from the browser.
  onPointerMove(event: PointerEvent): void {
    const drag = this.drag;
    if (event.pointerId !== drag?.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    drag.axis ??= axisOf(dx, dy);
    if (this.overviewOpen) {
      if (drag.axis === 'y') this.overview().nativeElement.scrollTop = drag.scrollTop - dy;
    } else if (drag.axis === 'x' && this.aids.length > 1) {
      this.offset = dx;
    }
  }

  // Lifting the finger decides it. With the aids one at a time, a swipe
  // sideways changes aids and a swipe up opens the overview; anything else,
  // like a tap, springs back to the current aid. In the overview, a swipe
  // down closes it, as long as it began at the top: further down, dragging
  // down scrolls back up the overview instead.
  onPointerUp(event: PointerEvent): void {
    const drag = this.drag;
    if (event.pointerId !== drag?.pointerId) return;
    this.drag = null;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    const duration = event.timeStamp - drag.startTime;
    const axis = drag.axis ?? axisOf(dx, dy);
    this.dragged = axis !== null;
    const across = axis === 'x' ? swipeDirection(dx, drag.width, duration) : 0;
    const upDown = axis === 'y' ? swipeDirection(dy, drag.height, duration) : 0;
    if (this.overviewOpen) {
      if (upDown > 0 && drag.scrollTop <= 0) this.closeOverview();
    } else if (upDown < 0) {
      this.openOverview();
    } else if (across && this.aids.length > 1) {
      // Swiping left pulls in the aid from the right, which is the next one
      this.step(-across, drag.width);
    } else {
      this.slideTo(0);
    }
  }

  // The browser took the pointer away, e.g. for a system gesture
  onPointerCancel(event: PointerEvent): void {
    if (event.pointerId !== this.drag?.pointerId) return;
    this.drag = null;
    this.slideTo(0);
  }

  // A mouse clicks whatever it was pressed and let go over, even after
  // dragging, so a click straight after a drag is ignored. A click from the
  // keyboard, with no click count, never comes from a drag.
  onChoose(aid: StorytellerAid, event: MouseEvent): void {
    if (this.dragged && event.detail > 0) return;
    this.loadedAids.toggle(aid);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.drag) return;
    if (this.overviewOpen) {
      if (event.key === 'ArrowDown' || event.key === 'Escape') {
        event.preventDefault();
        this.closeOverview();
      }
      return;
    }
    const opening = event.key === 'ArrowUp';
    const direction = this.aids.length > 1 ? KEY_STEPS[event.key] : undefined;
    if (!opening && !direction) return;
    event.preventDefault();
    if (this.settling) this.finishSettling();
    if (direction) {
      this.step(direction, this.host.clientWidth);
    } else {
      this.openOverview();
    }
  }

  onTransitionEnd(event: TransitionEvent): void {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform' || !this.settling) return;
    this.finishSettling();
  }

  // The overview opens at the top, so it can be swiped straight back down
  private openOverview(): void {
    this.returnTo = this.aids[this.index];
    this.overview().nativeElement.scrollTop = 0;
    this.overviewOpen = true;
  }

  // Back to the aid that was in view, or if it's been unloaded, the next
  // loaded aid after it
  private closeOverview(): void {
    this.overviewOpen = false;
    const start = this.returnTo ? this.library.indexOf(this.returnTo) : 0;
    const next = [...this.library.slice(start), ...this.library.slice(0, start)].find(aid => this.loadedAids.isLoaded(aid));
    this.index = next ? this.aids.indexOf(next) : 0;
  }

  // Slide the cards a whole screen over, bringing in the next aid (1) or the
  // previous one (-1)
  private step(direction: number, width: number): void {
    this.pendingStep = direction;
    this.slideTo(-direction * width);
  }

  // The cards slide the rest of the way to the given offset, then the aids
  // move along. With nowhere to slide, or with motion reduced, there's no
  // slide to wait for, so they move along straight away.
  private slideTo(offset: number): void {
    if (offset === this.offset || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.finishSettling();
      return;
    }
    this.settling = true;
    this.offset = offset;
  }

  // The aid that slid into view becomes the current one, and the cards go
  // back to the middle without animating, which looks like nothing at all
  // since the same aid is in view either way
  private finishSettling(): void {
    if (this.pendingStep) this.index = this.indexOf(this.index + this.pendingStep);
    this.pendingStep = 0;
    this.offset = 0;
    this.settling = false;
  }

  private aidAt(index: number): StorytellerAid {
    return this.aids[this.indexOf(index)];
  }

  // Wraps round from the last aid to the first, and back
  private indexOf(index: number): number {
    const count = this.aids.length;
    return ((index % count) + count) % count;
  }
}

// Which way a drag went, if it went far enough, or quickly enough, along a
// screen this many pixels long to count as a swipe: 1 for right or down, -1
// for left or up, and 0 when it wasn't a swipe
function swipeDirection(delta: number, size: number, duration: number): number {
  const distance = Math.abs(delta);
  const speed = distance / Math.max(duration, 1);
  const isSwipe = distance > size * SWIPE_FRACTION || (distance > FLICK_DISTANCE && speed > FLICK_SPEED);
  return isSwipe ? Math.sign(delta) : 0;
}

// Which way a drag is going, once it's gone far enough to tell
function axisOf(dx: number, dy: number): Axis | null {
  if (Math.max(Math.abs(dx), Math.abs(dy)) < AXIS_DISTANCE) return null;
  return Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
}
