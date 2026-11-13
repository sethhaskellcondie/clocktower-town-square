import { ChangeDetectionStrategy, Component, ElementRef, HostListener, inject } from '@angular/core';
import { StorytellerAidCardComponent } from './storyteller-aid-card.component';
import { STORYTELLER_AIDS } from './storyteller-aid-library';
import { StorytellerAid } from './storyteller-aid';

// A drag counts as a swipe once it's gone a quarter of the way across the
// screen, or sooner if it was a quick flick: at least this many pixels, at
// this many pixels a millisecond or faster
const SWIPE_FRACTION = 0.25;
const FLICK_DISTANCE = 30;
const FLICK_SPEED = 0.5;

// The arrow keys step through the aids on a computer
const KEY_STEPS: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };

// A finger on the screen, from where it first touched down
interface Drag {
  pointerId: number;
  startX: number;
  startY: number;
  startTime: number;
  width: number;
}

// The storyteller's own page, opened on their phone rather than the host's
// screen. It shows one aid at a time, filling the screen, so it can be held
// up to a player as is. Swiping left moves on to the next aid and swiping
// right goes back, round and round, with the card following the finger as
// it's dragged. The arrow keys do the same on a computer.
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
  readonly aids = STORYTELLER_AIDS;
  index = 0;
  // How far the cards are pulled sideways, in pixels: following the finger
  // during a drag, then sliding a whole screen over to change aids
  offset = 0;
  // Whether the cards are sliding into place after a drag
  settling = false;

  private drag: Drag | null = null;
  // Which way the aids move once the cards finish sliding: 1 for the next
  // aid, -1 for the previous one, 0 to stay put
  private pendingStep = 0;
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;

  // The current aid, in view, with the aids either side of it waiting just
  // off each edge of the screen, ready to be dragged in
  get slots(): { position: number; aid: StorytellerAid }[] {
    if (this.aids.length < 2) return [{ position: 0, aid: this.aids[0] }];
    return [-1, 0, 1].map(position => ({ position, aid: this.aidAt(this.index + position) }));
  }

  onPointerDown(event: PointerEvent): void {
    if (!event.isPrimary || this.aids.length < 2) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    // A new drag cuts short the cards still sliding from the last one
    if (this.settling) this.finishSettling();
    const target = event.currentTarget as HTMLElement;
    // Keep hearing about this pointer even once it leaves the page
    target.setPointerCapture(event.pointerId);
    this.drag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startTime: event.timeStamp,
      width: target.clientWidth,
    };
  }

  onPointerMove(event: PointerEvent): void {
    if (event.pointerId !== this.drag?.pointerId) return;
    this.offset = event.clientX - this.drag.startX;
  }

  // Lifting the finger decides it: a swipe changes aids, anything else, like
  // a tap or a drag mostly up or down, springs back to the current aid
  onPointerUp(event: PointerEvent): void {
    const drag = this.drag;
    if (event.pointerId !== drag?.pointerId) return;
    this.drag = null;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    const distance = Math.abs(dx);
    const speed = distance / Math.max(event.timeStamp - drag.startTime, 1);
    const isSwipe =
      distance > Math.abs(dy) &&
      (distance > drag.width * SWIPE_FRACTION || (distance > FLICK_DISTANCE && speed > FLICK_SPEED));
    if (isSwipe) {
      // Swiping left pulls in the aid from the right, which is the next one
      this.step(dx < 0 ? 1 : -1, drag.width);
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

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    const direction = KEY_STEPS[event.key];
    if (!direction || this.aids.length < 2 || this.drag) return;
    if (this.settling) this.finishSettling();
    event.preventDefault();
    this.step(direction, this.host.clientWidth);
  }

  onTransitionEnd(event: TransitionEvent): void {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform' || !this.settling) return;
    this.finishSettling();
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
    this.index = this.indexOf(this.index + this.pendingStep);
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
