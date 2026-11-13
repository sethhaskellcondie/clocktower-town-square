import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StorytellerAidsPageComponent } from './storyteller-aids-page.component';
import { STORYTELLER_AIDS, YOU_ARE_EVIL, YOU_ARE_GOOD } from './storyteller-aid-library';
import { StorytellerAid } from './storyteller-aid';

describe('StorytellerAidsPageComponent', () => {
  let fixture: ComponentFixture<StorytellerAidsPageComponent>;
  let page: HTMLElement;
  const sentence = (offset: number) => STORYTELLER_AIDS[(offset + STORYTELLER_AIDS.length) % STORYTELLER_AIDS.length].sentence;

  beforeEach(async () => {
    localStorage.clear();
    // Synthetic pointers aren't real ones the browser can capture
    spyOn(Element.prototype, 'setPointerCapture');
    await TestBed.configureTestingModule({
      imports: [StorytellerAidsPageComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(StorytellerAidsPageComponent);
    fixture.detectChanges();
    page = fixture.nativeElement as HTMLElement;
  });

  afterEach(() => {
    localStorage.clear();
  });

  // The aid in view, which is the only one not hidden from screen readers
  function shown(): string | null | undefined {
    return page.querySelector('.slot:not([aria-hidden]) .card')?.getAttribute('aria-label');
  }

  function pointer(type: string, x: number, y: number): void {
    page.querySelector('main')!.dispatchEvent(new PointerEvent(type, { pointerId: 1, isPrimary: true, clientX: x, clientY: y, bubbles: true }));
    fixture.detectChanges();
  }

  // The cards finish sliding, as the browser says once the slide is over
  function settle(): void {
    page.querySelector('.track')!.dispatchEvent(new TransitionEvent('transitionend', { propertyName: 'transform', bubbles: true }));
    fixture.detectChanges();
  }

  function swipe(dx: number, dy = 0): void {
    pointer('pointerdown', 200, 300);
    pointer('pointermove', 200 + dx, 300 + dy);
    pointer('pointerup', 200 + dx, 300 + dy);
    settle();
  }

  // The aids in the overview, in library order
  function choices(): HTMLButtonElement[] {
    return Array.from(page.querySelectorAll('.choice'));
  }

  function choice(aid: StorytellerAid): HTMLButtonElement {
    return choices()[STORYTELLER_AIDS.indexOf(aid)];
  }

  function overviewOpen(): boolean {
    return page.querySelector('main')!.classList.contains('overview-open');
  }

  // A finger touches down and lifts on an aid in the overview without
  // moving, and the browser clicks it
  function tap(aid: StorytellerAid): void {
    pointer('pointerdown', 200, 300);
    pointer('pointerup', 200, 300);
    choice(aid).dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 }));
    fixture.detectChanges();
  }

  function key(name: string): void {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: name }));
    fixture.detectChanges();
  }

  it('starts on the first aid, with its neighbors waiting off either side', () => {
    expect(shown()).toBe(sentence(0));
    const slots = Array.from(page.querySelectorAll('.slot')) as HTMLElement[];
    expect(slots.map(slot => slot.style.left)).toEqual(['-100%', '0%', '100%']);
    expect(slots.map(slot => slot.querySelector('.card')?.getAttribute('aria-label'))).toEqual([sentence(-1), sentence(0), sentence(1)]);
  });

  it('moves the cards with the finger while it drags', () => {
    pointer('pointerdown', 200, 300);
    pointer('pointermove', 140, 300);
    expect((page.querySelector('.track') as HTMLElement).style.transform).toBe('translateX(-60px)');
  });

  it('swipes left to the next aid, and round again from the last to the first', () => {
    for (let step = 1; step <= STORYTELLER_AIDS.length; step++) {
      swipe(-150);
      expect(shown()).toBe(sentence(step));
    }
    expect(shown()).toBe(sentence(0));
  });

  it('swipes right to the previous aid, which from the first is the last', () => {
    swipe(150);
    expect(shown()).toBe(sentence(-1));
  });

  it('springs back from a drag too short and slow to be a swipe', () => {
    pointer('pointerdown', 200, 300);
    pointer('pointermove', 190, 300);
    pointer('pointerup', 190, 300);
    expect((page.querySelector('.track') as HTMLElement).style.transform).toBe('translateX(0px)');
    settle();
    expect(shown()).toBe(sentence(0));
  });

  it('ignores a drag that goes more up or down than sideways', () => {
    swipe(-150, 300);
    expect(shown()).toBe(sentence(0));
  });

  it('slides the cards a whole screen over before changing aids', () => {
    pointer('pointerdown', 200, 300);
    pointer('pointerup', 50, 300);
    const track = page.querySelector('.track') as HTMLElement;
    expect(track.classList).toContain('settling');
    expect(track.style.transform).toBe(`translateX(${-page.querySelector('main')!.clientWidth}px)`);
    settle();
    expect(track.classList).not.toContain('settling');
    expect(track.style.transform).toBe('translateX(0px)');
    expect(shown()).toBe(sentence(1));
  });

  it('steps through the aids with the arrow keys', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();
    settle();
    expect(shown()).toBe(sentence(1));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    fixture.detectChanges();
    settle();
    expect(shown()).toBe(sentence(0));
  });

  it('keeps the cards still under a drag that goes up or down', () => {
    pointer('pointerdown', 200, 300);
    pointer('pointermove', 230, 200);
    expect((page.querySelector('.track') as HTMLElement).style.transform).toBe('translateX(0px)');
  });

  it('swipes up to lay out every aid, each loaded to begin with', () => {
    expect(overviewOpen()).toBeFalse();
    expect((page.querySelector('.overview') as HTMLElement).inert).toBeTrue();
    swipe(0, -300);
    expect(overviewOpen()).toBeTrue();
    expect((page.querySelector('.overview') as HTMLElement).inert).toBeFalse();
    expect((page.querySelector('.track') as HTMLElement).inert).toBeTrue();
    expect(choices().map(button => button.querySelector('.card')?.getAttribute('aria-label'))).toEqual(STORYTELLER_AIDS.map(aid => aid.sentence));
    expect(choices().map(button => button.getAttribute('aria-pressed'))).toEqual(STORYTELLER_AIDS.map(() => 'true'));
  });

  it('taps an aid to unload it, and again to load it back', () => {
    swipe(0, -300);
    tap(YOU_ARE_EVIL);
    expect(choice(YOU_ARE_EVIL).getAttribute('aria-pressed')).toBe('false');
    expect(choice(YOU_ARE_EVIL).classList).toContain('unloaded');
    expect(choice(YOU_ARE_GOOD).getAttribute('aria-pressed')).toBe('true');
    tap(YOU_ARE_EVIL);
    expect(choice(YOU_ARE_EVIL).getAttribute('aria-pressed')).toBe('true');
    expect(choice(YOU_ARE_EVIL).classList).not.toContain('unloaded');
  });

  it('swipes down to go round the loaded aids alone', () => {
    swipe(0, -300);
    STORYTELLER_AIDS.filter(aid => aid !== YOU_ARE_GOOD && aid !== YOU_ARE_EVIL).forEach(tap);
    swipe(0, 300);
    expect(overviewOpen()).toBeFalse();
    expect(shown()).toBe(YOU_ARE_GOOD.sentence);
    swipe(-150);
    expect(shown()).toBe(YOU_ARE_EVIL.sentence);
    swipe(-150);
    expect(shown()).toBe(YOU_ARE_GOOD.sentence);
  });

  it('stays put with a single aid loaded', () => {
    swipe(0, -300);
    STORYTELLER_AIDS.filter(aid => aid !== YOU_ARE_GOOD).forEach(tap);
    swipe(0, 300);
    expect(page.querySelectorAll('.slot').length).toBe(1);
    swipe(-150);
    expect(shown()).toBe(YOU_ARE_GOOD.sentence);
  });

  it('comes back to the aid that was in view, or the next loaded one if it was unloaded', () => {
    swipe(-150);
    expect(shown()).toBe(sentence(1));
    swipe(0, -300);
    swipe(0, 300);
    expect(shown()).toBe(sentence(1));

    swipe(0, -300);
    tap(STORYTELLER_AIDS[1]);
    swipe(0, 300);
    expect(shown()).toBe(sentence(2));
  });

  it('says so when no aids are loaded, and still swipes up to load some', () => {
    swipe(0, -300);
    STORYTELLER_AIDS.forEach(tap);
    swipe(0, 300);
    expect(page.querySelector('.slot')).toBeNull();
    expect(page.querySelector('.empty')).not.toBeNull();
    swipe(-150);
    swipe(0, -300);
    expect(overviewOpen()).toBeTrue();
    tap(YOU_ARE_EVIL);
    swipe(0, 300);
    expect(page.querySelector('.empty')).toBeNull();
    expect(shown()).toBe(YOU_ARE_EVIL.sentence);
  });

  it("doesn't take a drag over an aid for a tap, though the keyboard can still choose it", () => {
    swipe(0, -300);
    pointer('pointerdown', 200, 300);
    pointer('pointermove', 200, 250);
    pointer('pointerup', 200, 250);
    choice(YOU_ARE_EVIL).dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 }));
    fixture.detectChanges();
    expect(choice(YOU_ARE_EVIL).getAttribute('aria-pressed')).toBe('true');
    choice(YOU_ARE_EVIL).dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 0 }));
    fixture.detectChanges();
    expect(choice(YOU_ARE_EVIL).getAttribute('aria-pressed')).toBe('false');
  });

  it('opens the overview with the up arrow, and closes it with the down arrow or Escape', () => {
    key('ArrowUp');
    expect(overviewOpen()).toBeTrue();
    key('ArrowRight');
    key('ArrowDown');
    expect(overviewOpen()).toBeFalse();
    expect(shown()).toBe(sentence(0));
    key('ArrowUp');
    key('Escape');
    expect(overviewOpen()).toBeFalse();
  });
});
