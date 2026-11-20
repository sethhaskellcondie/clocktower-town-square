import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, computed, inject, signal, viewChild } from '@angular/core';
import { StorytellerAidCardComponent } from './storyteller-aid-card.component';
import { STORYTELLER_AIDS } from './storyteller-aid-library';
import { STORYTELLER_AID_CATEGORIES, StorytellerAid } from './storyteller-aid';
import { LoadedAidsService } from './loaded-aids.service';
import { AidTextService, tidy } from './aid-text.service';

// The most a custom aid's words can run to: a short sentence, for a card
// that's all the storyteller's own words. Much more than that would be too
// small on the card for a player to read across the room.
const EDITABLE_TEXT_LENGTH = 60;

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

// The overview shows this many aids at a time, three rows of three
const AIDS_PER_PAGE = 9;

// The arrow keys step through the aids, or the overview's pages, on a computer
const KEY_STEPS: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };

type Axis = 'x' | 'y';

// A page of the overview: nine aids, or what's left of them on the last
// page, headed by the categories they come from
interface AidPage {
  title: string;
  aids: readonly StorytellerAid[];
}

// An aid where it sits across the screen: 0 in view, and -1 and 1 waiting
// just off the left and right edges
interface AidSlot {
  aid: StorytellerAid;
  position: number;
}

// A finger on the screen, from where it first touched down
interface Drag {
  pointerId: number;
  startX: number;
  startY: number;
  startTime: number;
  width: number;
  height: number;
  axis: Axis | null;
}

// The storyteller's own page, opened on their phone rather than the host's
// screen. It shows one aid at a time, filling the screen, so it can be held
// up to a player as is. Swiping left moves on to the next aid and swiping
// right goes back, round and round, with the card following the finger as
// it's dragged. Only the loaded aids come round.
//
// Swiping up opens the overview: every aid there is, laid out small, nine
// at a time, the unloaded ones dimmed. Each page of nine is headed by the
// categories its aids come from, with a dot for each page below. Swiping
// left or right turns to the next or previous page, round and round, with
// the page following the finger like the cards do. Tapping an aid there
// loads or unloads it, and swiping down goes back to the loaded aids one at
// a time. On a computer the arrow keys do the same, with Escape closing the
// overview as well. The overview opens again on the page it was left on.
//
// A tap loads or unloads an aid as soon as the finger lifts, without waiting
// for the browser's click, and it goes by where the aids sit once the
// overview has slid into place. So a quick tap just after a swipe up, while
// the overview is still sliding, gets the aid coming to rest under the
// finger. The browser would click nothing at all, since the finger lifts
// over a different spot on the overview than the one it touched down on.
//
// A custom aid, like "Your secret word is haberdashery" or a card that's all
// the storyteller's own words, has an Edit button beside its card. Tapping
// it opens the editor, over everything else: the aid's words to change, with
// the card below them showing the words as they're typed, and Done to keep
// them or Cancel to leave them as they were. It all sits at the top of the
// screen, which a phone's keyboard leaves clear. Only the button opens it,
// not the card, so a thumb on the card while it's held up to a player
// doesn't bring up the keyboard.
//
// Swipes are read from pointer events, which cover fingers, mice, and pens
// alike: where the pointer goes down, where it moves, and where it comes up.
//
// So that a swipe lands without a stutter, nothing is drawn again as the
// cards slide into place. Each card is kept as it moves from one spot to the
// next, so the card that comes to rest in view is the very one that was
// waiting off the edge, and only the card coming up behind it is new. The
// overview draws every page once and keeps them all, out of sight a little
// further off when they aren't in view or beside it, so turning the page
// draws nothing at all. And a drag moves the cards without going over any of
// them, since a card is only drawn again when its aid changes.
@Component({
  selector: 'app-storyteller-aids-page',
  imports: [StorytellerAidCardComponent],
  templateUrl: './storyteller-aids-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './storyteller-aids-page.component.scss'
})
export class StorytellerAidsPageComponent {
  readonly library = STORYTELLER_AIDS;
  readonly pages = pagesOf(STORYTELLER_AIDS);
  readonly loadedAids = inject(LoadedAidsService);
  readonly aidText = inject(AidTextService);
  readonly editableTextLength = EDITABLE_TEXT_LENGTH;
  // The aids that come round, in the order they come
  readonly aids = this.loadedAids.aids;
  // The aid in view
  readonly index = signal(0);
  // The overview's page in view
  readonly page = signal(0);
  // How far the cards, or with the overview open its pages, are pulled
  // sideways, in pixels: following the finger during a drag, then sliding a
  // whole screen over to change aids or pages
  readonly offset = signal(0);
  // Whether the cards, or the pages, are sliding into place after a drag
  readonly settling = signal(false);
  readonly overviewOpen = signal(false);
  // The custom aid whose words are being changed, as it is in the library,
  // and the words typed so far
  readonly editing = signal<StorytellerAid | null>(null);
  readonly draft = signal('');

  // With only two aids, or two pages, to go round, the other one is both the
  // next and the previous, so it waits on the side it's being pulled in
  // from: the right (1) while the cards are pulled left, and the left (-1)
  // while they're pulled right. It stays there as they spring back or slide
  // the rest of the way.
  private readonly side = signal(1);

  // The current aid, in view, with the aids either side of it waiting just
  // off each edge of the screen, ready to be dragged in. They're in the
  // order they come round, not the order they sit in, so as they move along
  // none of them has to be moved among the others to keep its card.
  readonly slots = computed<AidSlot[]>(() => {
    const aids = this.aids();
    const positions = positionsFor(aids.length, this.index(), aids.length === 2 ? this.side() : 1);
    return aids.flatMap((aid, index) => {
      const position = positions[index];
      return position === null ? [] : [{ aid, position }];
    });
  });

  // Where each of the overview's pages sits, the same way, the rest of them
  // out of sight further off
  readonly pagePositions = computed(() =>
    positionsFor(this.pages.length, this.page(), this.pages.length === 2 ? this.side() : 1),
  );

  // The aid being edited as it'll look with the words typed so far, or as it
  // comes while there are none
  readonly preview = computed(() => {
    const editing = this.editing();
    return editing?.withEditableText(tidy(this.draft()) || editing.editableText!);
  });

  // Whether the words typed so far are the ones the aid comes with, so
  // there's nothing to reset
  readonly draftIsDefault = computed(() => tidy(this.draft()) === this.editing()?.editableText);

  private drag: Drag | null = null;
  // Whether the last pointer has been dealt with already: it dragged, or it
  // tapped an aid in the overview, which loaded or unloaded it. The click
  // the browser sends after it is ignored, so it isn't taken for another tap.
  private pointerHandled = false;
  // Which way the aids, or the pages, move once they finish sliding: 1 for
  // the next, -1 for the previous, 0 to stay put
  private pendingStep = 0;
  // The aid in view when the overview opened, to come back to
  private returnTo: StorytellerAid | undefined;
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;
  private readonly overview = viewChild.required<ElementRef<HTMLElement>>('overview');
  private readonly editorInput = viewChild<ElementRef<HTMLInputElement>>('editorInput');
  private readonly changeDetector = inject(ChangeDetectorRef);

  onPointerDown(event: PointerEvent): void {
    if (!event.isPrimary) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    // A new drag cuts short the cards still sliding from the last one
    if (this.settling()) this.finishSettling();
    const target = event.currentTarget as HTMLElement;
    // Keep hearing about this pointer even once it leaves the page
    target.setPointerCapture(event.pointerId);
    this.pointerHandled = false;
    this.drag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startTime: event.timeStamp,
      width: target.clientWidth,
      height: target.clientHeight,
      axis: null,
    };
  }

  // The cards, or the overview's pages, follow a finger dragging sideways
  onPointerMove(event: PointerEvent): void {
    const drag = this.drag;
    if (event.pointerId !== drag?.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    drag.axis ??= axisOf(dx, dy);
    if (drag.axis === 'x' && this.count > 1) this.pull(dx);
  }

  // Lifting the finger decides it. With the aids one at a time, a swipe
  // sideways changes aids and a swipe up opens the overview; anything else,
  // like a tap, springs back to the current aid. In the overview, a tap on
  // an aid loads or unloads it, a swipe sideways turns the page, and a swipe
  // down closes the overview.
  onPointerUp(event: PointerEvent): void {
    const drag = this.drag;
    if (event.pointerId !== drag?.pointerId) return;
    this.drag = null;
    this.pointerHandled = true;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    const duration = event.timeStamp - drag.startTime;
    const axis = drag.axis ?? axisOf(dx, dy);
    const across = axis === 'x' ? swipeDirection(dx, drag.width, duration) : 0;
    const upDown = axis === 'y' ? swipeDirection(dy, drag.height, duration) : 0;
    if (this.overviewOpen()) {
      const aid = axis === null ? this.choiceAt(event.clientX, event.clientY) : undefined;
      if (aid) {
        this.loadedAids.toggle(aid);
      } else if (upDown > 0) {
        this.closeOverview();
      } else {
        this.swipeAcross(across, drag.width);
      }
    } else if (upDown < 0) {
      this.openOverview();
    } else {
      this.swipeAcross(across, drag.width);
      if (axis === null && this.editButtonAt(event.clientX, event.clientY)) this.openEditor(this.aids()[this.index()]);
    }
  }

  // The browser took the pointer away, e.g. for a system gesture
  onPointerCancel(event: PointerEvent): void {
    if (event.pointerId !== this.drag?.pointerId) return;
    this.drag = null;
    this.slideTo(0);
  }

  // A pointer's taps and drags are dealt with as it lifts, so the click the
  // browser sends after it is ignored. A click from the keyboard, with no
  // click count, never comes from a pointer.
  onChoose(aid: StorytellerAid, event: MouseEvent): void {
    if (this.pointerHandled && event.detail > 0) return;
    this.loadedAids.toggle(aid);
  }

  // The Edit button, clicked from the keyboard. A tap on it is dealt with as
  // the pointer lifts, like a tap in the overview.
  onEdit(aid: StorytellerAid, event: MouseEvent): void {
    if (this.pointerHandled && event.detail > 0) return;
    this.openEditor(aid);
  }

  onDraftInput(event: Event): void {
    this.draft.set((event.target as HTMLInputElement).value);
  }

  // Back to the words the aid comes with, ready to type over
  resetDraft(): void {
    const input = this.editorInput()?.nativeElement;
    this.draft.set(this.editing()?.editableText ?? '');
    if (input) {
      input.value = this.draft();
      input.focus();
      input.select();
    }
  }

  // Done, or the keyboard's own Done key, keeps the words
  saveEdit(event: Event): void {
    event.preventDefault();
    const editing = this.editing();
    if (editing) this.aidText.write(editing, this.draft());
    this.closeEditor();
  }

  closeEditor(): void {
    this.editing.set(null);
    this.draft.set('');
  }

  // Pressing anywhere in the editor but the words leaves the focus on them,
  // so a phone keeps its keyboard up, as it does pressing Reset. This is
  // also what keeps the keyboard up as the editor opens, under the very
  // finger that tapped Edit, since a phone presses whatever's under the
  // finger once it lifts.
  keepFocus(event: MouseEvent): void {
    if (event.target !== this.editorInput()?.nativeElement) event.preventDefault();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.drag || this.editing()) return;
    const toggling = this.overviewOpen() ? event.key === 'ArrowDown' || event.key === 'Escape' : event.key === 'ArrowUp';
    const direction = this.count > 1 ? KEY_STEPS[event.key] : undefined;
    if (!toggling && !direction) return;
    event.preventDefault();
    if (this.settling()) this.finishSettling();
    if (direction) {
      this.step(direction, this.host.clientWidth);
    } else if (this.overviewOpen()) {
      this.closeOverview();
    } else {
      this.openOverview();
    }
  }

  onTransitionEnd(event: TransitionEvent): void {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform' || !this.settling()) return;
    this.finishSettling();
  }

  // The aids one at a time, or with the overview open, its pages: however
  // many there are of whichever is in front, to swipe through sideways
  private get count(): number {
    return this.overviewOpen() ? this.pages.length : this.aids().length;
  }

  private openOverview(): void {
    this.returnTo = this.aids()[this.index()];
    this.overviewOpen.set(true);
  }

  // Back to the aid that was in view, or if it's been unloaded, the next
  // loaded aid after it
  private closeOverview(): void {
    this.overviewOpen.set(false);
    const start = this.returnTo ? this.library.indexOf(this.returnTo) : 0;
    const next = [...this.library.slice(start), ...this.library.slice(0, start)].find(aid => this.loadedAids.isLoaded(aid));
    this.index.set(next ? this.aids().indexOf(next) : 0);
  }

  // Swiping left pulls in the aid, or page, from the right, which is the
  // next one. Anything short of a swipe springs back.
  private swipeAcross(across: number, width: number): void {
    if (across && this.count > 1) {
      this.step(-across, width);
    } else {
      this.slideTo(0);
    }
  }

  // Slide the cards, or pages, a whole screen over, bringing in the next
  // one (1) or the previous one (-1)
  private step(direction: number, width: number): void {
    this.pendingStep = direction;
    this.slideTo(-direction * width);
  }

  // The cards, or pages, slide the rest of the way to the given offset, then
  // the aids or pages move along. With nowhere to slide, or with motion reduced, there's no
  // slide to wait for, so they move along straight away.
  private slideTo(offset: number): void {
    if (offset === this.offset() || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.finishSettling();
      return;
    }
    this.settling.set(true);
    this.pull(offset);
  }

  // Pulls the cards, or pages, this far sideways, which with only two to go
  // round decides which side the other one waits on
  private pull(offset: number): void {
    this.offset.set(offset);
    if (offset) this.side.set(offset < 0 ? 1 : -1);
  }

  // The aid, or page, that slid into view becomes the current one, and the
  // cards or pages go back to the middle without animating, which looks like
  // nothing at all since the same one is in view either way: the one that
  // slid in stays put on the screen, moved from the edge to the middle as the
  // cards or pages move back the other way
  private finishSettling(): void {
    const step = this.pendingStep;
    if (this.overviewOpen()) {
      this.page.update(page => wrap(page + step, this.pages.length));
    } else if (step) {
      this.index.update(index => wrap(index + step, this.aids().length));
    }
    this.pendingStep = 0;
    this.offset.set(0);
    this.settling.set(false);
  }

  // The editor opens with the aid's words as the storyteller last wrote
  // them, picked out to type over. It's put on the screen straight away,
  // rather than once this tap is over, so the words can take the focus while
  // the tap is still going, since that's the only time a phone will bring up
  // its keyboard for them.
  private openEditor(aid: StorytellerAid): void {
    if (aid.editableText === undefined) return;
    this.editing.set(aid);
    this.draft.set(this.aidText.written(aid).editableText!);
    this.changeDetector.detectChanges();
    const input = this.editorInput()?.nativeElement;
    input?.focus();
    input?.select();
  }

  // Whether this point on the screen is on the Edit button by the aid in view
  private editButtonAt(x: number, y: number): boolean {
    const box = this.host.querySelector('.slot.current .edit')?.getBoundingClientRect();
    return !!box && x >= box.left && x < box.right && y >= box.top && y < box.bottom;
  }

  // The aid on the overview's page in view at this point on the screen, if
  // there is one, where the aids sit once the overview has slid into place:
  // each aid as it is now, raised by however far the overview has still to
  // slide up
  private choiceAt(x: number, y: number): StorytellerAid | undefined {
    const overview = this.overview().nativeElement;
    const rise = overview.getBoundingClientRect().top - this.host.getBoundingClientRect().top;
    const choice = Array.from(overview.querySelectorAll<HTMLElement>('.page.current .choice')).find(button => {
      const box = button.getBoundingClientRect();
      return x >= box.left && x < box.right && y >= box.top - rise && y < box.bottom - rise;
    });
    return this.library.find(aid => aid.id === choice?.dataset['aid']);
  }

}

// The aids in the overview, nine to a page, in the order they come round.
// A page is headed by the category of its aids, or where one category runs
// on into the next, both of them.
function pagesOf(aids: readonly StorytellerAid[]): AidPage[] {
  const pages: AidPage[] = [];
  for (let start = 0; start < aids.length; start += AIDS_PER_PAGE) {
    const onPage = aids.slice(start, start + AIDS_PER_PAGE);
    const categories = new Set(onPage.map(aid => aid.category));
    const title = [...categories].map(category => STORYTELLER_AID_CATEGORIES[category].title).join(' · ');
    pages.push({ title, aids: onPage });
  }
  return pages;
}

// Where each of this many aids, or pages, sits with this one in view: 0 for
// the one in view, 1 for the next, just off the right edge, -1 for the
// previous, just off the left, and null for the rest, further off and out
// of sight. Going round, the last is just before the first. With only two,
// the other one is both the next and the previous, so it sits on this side.
function positionsFor(count: number, current: number, side: number): (number | null)[] {
  return Array.from({ length: count }, (_, index) => {
    const ahead = wrap(index - current, count);
    if (ahead === 0) return 0;
    if (count === 2) return side;
    if (ahead === 1) return 1;
    if (ahead === count - 1) return -1;
    return null;
  });
}

// Wraps round from the last aid, or page, to the first, and back
function wrap(index: number, count: number): number {
  return count ? ((index % count) + count) % count : 0;
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
