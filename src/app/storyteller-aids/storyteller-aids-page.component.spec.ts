import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StorytellerAidsPageComponent } from './storyteller-aids-page.component';
import {
  CUSTOM_AID_1,
  STORYTELLER_AIDS,
  THE_BARBER_DIED_SWAP_TWO_CHARACTERS,
  THE_DAMSEL_IS_IN_PLAY,
  THE_DEMON_IS_GRANTED_THIS_ABILITY,
  THE_GOOD_TWIN_IS,
  THE_HATTER_HAS_DIED_CHANGE_CHARACTER,
  THE_LUNATIC_CHOSE_THESE_PLAYERS,
  THESE_PLAYERS_ARE_NOT_LEGION,
  THIS_PLAYER_IS_THE_KING,
  YOU_ACT_TWICE_TODAY,
  YOU_ARE_EVIL,
  YOU_ARE_GOOD,
  YOU_ARE_MAD_THAT_THIS_PLAYER_IS_EVIL,
  YOU_ARE_MAD_THAT_YOU_ARE,
  YOU_ARE_SOBER_AND_HEALTHY,
  YOU_ARE_THE_GOOD_TWIN,
  YOU_HAVE_THE_ABILITY_OF,
  YOUR_SECRET_PHRASE_IS,
  YOUR_SECRET_WORD_IS,
  YOUR_TASK_IS,
} from './storyteller-aid-library';
import { STORYTELLER_AID_CATEGORIES, StorytellerAid } from './storyteller-aid';

describe('StorytellerAidsPageComponent', () => {
  let fixture: ComponentFixture<StorytellerAidsPageComponent>;
  let page: HTMLElement;
  // The aids loaded to begin with, the standard ones, which are the aids
  // that come round until the storyteller loads or unloads some
  const startingAids = STORYTELLER_AIDS.filter(aid => aid.category === 'standard');
  const sentence = (offset: number) => startingAids[(offset + startingAids.length) % startingAids.length].sentence;

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

  // The cards, or the overview's pages, finish sliding, as the browser says
  // once the slide is over
  function settle(): void {
    page.querySelector('.track.settling, .page-track.settling')?.dispatchEvent(
      new TransitionEvent('transitionend', { propertyName: 'transform', bubbles: true }),
    );
    fixture.detectChanges();
  }

  function swipe(dx: number, dy = 0): void {
    pointer('pointerdown', 200, 300);
    pointer('pointermove', 200 + dx, 300 + dy);
    pointer('pointerup', 200 + dx, 300 + dy);
    settle();
  }

  // The aids on the overview's page in view, which is the only one not inert
  function choices(): HTMLButtonElement[] {
    return Array.from(page.querySelectorAll('.page.current .choice'));
  }

  function sentencesOf(buttons: HTMLButtonElement[]): (string | null | undefined)[] {
    return buttons.map(button => button.querySelector('.card')?.getAttribute('aria-label'));
  }

  // The aid, or the overview's page, at this spot across the screen: 0 in
  // view, and -1 and 1 waiting just off the left and right edges
  function slotAt(position: number): HTMLElement | undefined {
    return placed('.slot', position);
  }

  function pageAt(position: number): HTMLElement | undefined {
    return placed('.page', position);
  }

  function placed(selector: string, position: number): HTMLElement | undefined {
    return (Array.from(page.querySelectorAll(selector)) as HTMLElement[]).find(each => each.style.left === `${position * 100}%`);
  }

  function sentenceAt(position: number): string | null | undefined {
    return slotAt(position)?.querySelector('.card')?.getAttribute('aria-label');
  }

  // The aids on the overview's page at this spot
  function aidsAt(position: number): (string | null | undefined)[] {
    return sentencesOf(Array.from(pageAt(position)?.querySelectorAll<HTMLButtonElement>('.choice') ?? []));
  }

  // The aids on this page of the overview, counting round from the first
  function pageOf(turned: number): string[] {
    const start = wrapped(turned, pageCount) * 9;
    return STORYTELLER_AIDS.slice(start, start + 9).map(aid => aid.sentence);
  }

  function wrapped(index: number, count: number): number {
    return ((index % count) + count) % count;
  }

  // An aid on the overview's page in view, turning to its page first if
  // it's on another
  function choice(aid: StorytellerAid): HTMLButtonElement {
    const selector = `.page.current .choice[data-aid="${aid.id}"]`;
    for (let turns = 0; !page.querySelector(selector) && turns < pageCount; turns++) swipe(-150);
    return page.querySelector(selector) as HTMLButtonElement;
  }

  function heading(): string | undefined {
    return page.querySelector('.page.current .page-heading')?.textContent?.trim();
  }

  function currentDot(): number {
    return Array.from(page.querySelectorAll('.dot')).findIndex(dot => dot.classList.contains('current'));
  }

  // The aids the storyteller has loaded, from the whole library
  function loaded(): StorytellerAid[] {
    return STORYTELLER_AIDS.filter(aid => fixture.componentInstance.loadedAids.isLoaded(aid));
  }

  const pageCount = Math.ceil(STORYTELLER_AIDS.length / 9);

  function overviewOpen(): boolean {
    return page.querySelector('main')!.classList.contains('overview-open');
  }

  // The middle of an aid in the overview, once the overview has slid up into
  // place, however far it has still to go
  function restingCenter(aid: StorytellerAid): { x: number; y: number } {
    const rise = page.querySelector('.overview')!.getBoundingClientRect().top - page.getBoundingClientRect().top;
    const box = choice(aid).getBoundingClientRect();
    return { x: box.left + box.width / 2, y: box.top - rise + box.height / 2 };
  }

  // A finger touches down and lifts on an aid in the overview without
  // moving, and the browser clicks it
  function tap(aid: StorytellerAid): void {
    const { x, y } = restingCenter(aid);
    pointer('pointerdown', x, y);
    pointer('pointerup', x, y);
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
    expect(slots.map(slot => slot.style.left).sort()).toEqual(['-100%', '0%', '100%']);
    expect([-1, 0, 1].map(position => sentenceAt(position))).toEqual([sentence(-1), sentence(0), sentence(1)]);
  });

  it('moves the cards with the finger while it drags', () => {
    pointer('pointerdown', 200, 300);
    pointer('pointermove', 140, 300);
    expect((page.querySelector('.track') as HTMLElement).style.transform).toBe('translateX(-60px)');
  });

  it('swipes left to the next aid, and round again from the last to the first', () => {
    for (let step = 1; step <= startingAids.length; step++) {
      swipe(-150);
      expect(shown()).toBe(sentence(step));
    }
    expect(shown()).toBe(sentence(0));
  });

  it('swipes right to the previous aid, which from the first is the last', () => {
    swipe(150);
    expect(shown()).toBe(sentence(-1));
  });

  it('keeps the aids either side of the one in view as it swipes round, both ways, out of reach of screen readers', () => {
    const check = (swiped: number) => {
      expect([-1, 0, 1].map(position => sentenceAt(position))).toEqual([sentence(swiped - 1), sentence(swiped), sentence(swiped + 1)]);
      expect(page.querySelectorAll('.slot').length).toBe(3);
      expect(page.querySelectorAll('.slot:not([aria-hidden])').length).toBe(1);
      expect(slotAt(0)!.hasAttribute('aria-hidden')).toBeFalse();
      expect(slotAt(0)!.classList).toContain('current');
    };
    check(0);
    for (let swiped = 1; swiped <= startingAids.length + 1; swiped++) {
      swipe(-150);
      check(swiped);
    }
    for (let swiped = startingAids.length; swiped >= -2; swiped--) {
      swipe(150);
      check(swiped);
    }
  });

  it('keeps the card that slides into view, and the one that slides out, rather than drawing them again, either way', () => {
    const cardAt = (position: number) => slotAt(position)!.querySelector('.card');
    const [inView, right] = [cardAt(0), cardAt(1)];
    swipe(-150);
    expect(cardAt(0)).toBe(right);
    expect(cardAt(-1)).toBe(inView);
    swipe(150);
    expect(cardAt(0)).toBe(inView);
    expect(cardAt(1)).toBe(right);
    const left = cardAt(-1);
    swipe(150);
    expect(cardAt(0)).toBe(left);
    expect(cardAt(1)).toBe(inView);
  });

  it('leaves the cards alone while a finger drags them', () => {
    pointer('pointerdown', 200, 300);
    const read = spyOnProperty(StorytellerAid.prototype, 'sentence', 'get').and.callThrough();
    pointer('pointermove', 160, 300);
    pointer('pointermove', 120, 300);
    expect(read).not.toHaveBeenCalled();
  });

  it('cuts a slide short with the next swipe, moving on from where it was going', () => {
    pointer('pointerdown', 200, 300);
    pointer('pointerup', 50, 300);
    pointer('pointerdown', 200, 300);
    pointer('pointerup', 50, 300);
    settle();
    expect(shown()).toBe(sentence(2));
    expect([-1, 1].map(position => sentenceAt(position))).toEqual([sentence(1), sentence(3)]);
  });

  it('changes aids, and pages, straight away with motion reduced', () => {
    spyOn(window, 'matchMedia').and.returnValue({ matches: true } as MediaQueryList);
    pointer('pointerdown', 200, 300);
    pointer('pointerup', 50, 300);
    expect(page.querySelector('.track')!.classList).not.toContain('settling');
    expect(shown()).toBe(sentence(1));
    key('ArrowUp');
    key('ArrowRight');
    expect(page.querySelector('.page-track')!.classList).not.toContain('settling');
    expect(currentDot()).toBe(1);
    expect(aidsAt(0)).toEqual(pageOf(1));
  });

  it('pulls the other aid in from whichever side it is dragged from with only two loaded', () => {
    swipe(0, -300);
    startingAids.filter(aid => aid !== YOU_ARE_GOOD && aid !== YOU_ARE_EVIL).forEach(tap);
    swipe(0, 300);
    expect(shown()).toBe(YOU_ARE_GOOD.sentence);

    // Dragged left, it comes in from the right, and stays there while the
    // card springs back
    pointer('pointerdown', 200, 300);
    pointer('pointermove', 180, 300);
    expect(sentenceAt(1)).toBe(YOU_ARE_EVIL.sentence);
    pointer('pointerup', 180, 300);
    expect(page.querySelector('.track')!.classList).toContain('settling');
    expect(sentenceAt(1)).toBe(YOU_ARE_EVIL.sentence);
    settle();
    expect(shown()).toBe(YOU_ARE_GOOD.sentence);

    // Dragged right, it comes in from the left, and stays there as it slides
    // into view
    pointer('pointerdown', 200, 300);
    pointer('pointermove', 230, 300);
    expect(sentenceAt(-1)).toBe(YOU_ARE_EVIL.sentence);
    pointer('pointerup', 350, 300);
    expect(sentenceAt(-1)).toBe(YOU_ARE_EVIL.sentence);
    settle();
    expect(shown()).toBe(YOU_ARE_EVIL.sentence);

    // And the first one is on either side of it now
    pointer('pointerdown', 200, 300);
    pointer('pointermove', 170, 300);
    expect(sentenceAt(1)).toBe(YOU_ARE_GOOD.sentence);
    pointer('pointermove', 230, 300);
    expect(sentenceAt(-1)).toBe(YOU_ARE_GOOD.sentence);
    pointer('pointerup', 230, 300);
    settle();

    // The arrow keys bring it in from the side they go to
    key('ArrowRight');
    expect(sentenceAt(1)).toBe(YOU_ARE_GOOD.sentence);
    settle();
    expect(shown()).toBe(YOU_ARE_GOOD.sentence);
    key('ArrowLeft');
    expect(sentenceAt(-1)).toBe(YOU_ARE_EVIL.sentence);
    settle();
    expect(shown()).toBe(YOU_ARE_EVIL.sentence);
  });

  it('brings a newly loaded aid round beside the others as soon as the overview closes', () => {
    swipe(0, -300);
    tap(THESE_PLAYERS_ARE_NOT_LEGION);
    swipe(0, 300);
    expect([-1, 0, 1].map(position => sentenceAt(position))).toEqual([THESE_PLAYERS_ARE_NOT_LEGION.sentence, sentence(0), sentence(1)]);
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

  it('swipes up to lay out the first nine aids, the standard ones loaded to begin with and the character ones not', () => {
    expect(overviewOpen()).toBeFalse();
    expect((page.querySelector('.overview') as HTMLElement).inert).toBeTrue();
    swipe(0, -300);
    expect(overviewOpen()).toBeTrue();
    expect((page.querySelector('.overview') as HTMLElement).inert).toBeFalse();
    expect((page.querySelector('.track') as HTMLElement).inert).toBeTrue();
    expect(sentencesOf(choices())).toEqual(STORYTELLER_AIDS.slice(0, 9).map(aid => aid.sentence));
    expect(choices().map(button => button.getAttribute('aria-pressed'))).toEqual(
      STORYTELLER_AIDS.slice(0, 9).map(aid => String(startingAids.includes(aid))),
    );
    expect(choice(THE_LUNATIC_CHOSE_THESE_PLAYERS).classList).toContain('unloaded');
  });

  it('lays out the aids nine to a page, each page headed by the categories of its aids, with a dot for each page', () => {
    swipe(0, -300);
    expect(page.querySelectorAll('.dot').length).toBe(pageCount);
    const pages: StorytellerAid[][] = [];
    for (let turn = 0; turn < pageCount; turn++) {
      const aids = choices().map(button => STORYTELLER_AIDS.find(aid => aid.id === button.dataset['aid'])!);
      pages.push(aids);
      expect(currentDot()).toBe(turn);
      expect(heading()).toBe([...new Set(aids.map(aid => STORYTELLER_AID_CATEGORIES[aid.category].title))].join(' · '));
      swipe(-150);
    }
    expect(pages.slice(0, -1).every(aids => aids.length === 9)).toBeTrue();
    expect(pages[pages.length - 1].length).toBeGreaterThan(0);
    expect(pages.flat()).toEqual([...STORYTELLER_AIDS]);
    expect(pages[0].every(aid => aid.category === 'standard')).toBeTrue();
  });

  it('lays out the standard aids, then the character aids, then the custom aids', () => {
    swipe(0, -300);
    const sentences = Array.from({ length: pageCount }, () => {
      const onPage = sentencesOf(choices());
      swipe(-150);
      return onPage;
    }).flat();
    const characterAids = [
      THE_LUNATIC_CHOSE_THESE_PLAYERS,
      THE_BARBER_DIED_SWAP_TWO_CHARACTERS,
      YOU_ARE_MAD_THAT_YOU_ARE,
      YOU_ARE_THE_GOOD_TWIN,
      THE_GOOD_TWIN_IS,
      YOU_ARE_SOBER_AND_HEALTHY,
      YOU_ACT_TWICE_TODAY,
      YOU_HAVE_THE_ABILITY_OF,
      THIS_PLAYER_IS_THE_KING,
      THE_DAMSEL_IS_IN_PLAY,
      THE_HATTER_HAS_DIED_CHANGE_CHARACTER,
      THE_DEMON_IS_GRANTED_THIS_ABILITY,
      YOU_ARE_MAD_THAT_THIS_PLAYER_IS_EVIL,
      THESE_PLAYERS_ARE_NOT_LEGION,
    ];
    const customAids = [YOUR_SECRET_WORD_IS, YOUR_SECRET_PHRASE_IS, YOUR_TASK_IS, CUSTOM_AID_1];
    const standardAids = STORYTELLER_AIDS.filter(aid => !characterAids.includes(aid) && !customAids.includes(aid));
    expect(sentences).toEqual([...standardAids, ...characterAids, ...customAids].map(aid => aid.sentence));
  });

  it('turns the pages with a swipe left or right, round and round, the page following the finger', () => {
    swipe(0, -300);
    const first = sentencesOf(choices());
    pointer('pointerdown', 200, 300);
    pointer('pointermove', 140, 300);
    expect((page.querySelector('.page-track') as HTMLElement).style.transform).toBe('translateX(-60px)');
    expect((page.querySelector('.track') as HTMLElement).style.transform).toBe('translateX(0px)');
    pointer('pointerup', 50, 300);
    expect(page.querySelector('.page-track')!.classList).toContain('settling');
    settle();
    expect(page.querySelector('.page-track')!.classList).not.toContain('settling');
    expect(currentDot()).toBe(1);
    expect(sentencesOf(choices())).toEqual(STORYTELLER_AIDS.slice(9, 18).map(aid => aid.sentence));

    swipe(150);
    expect(currentDot()).toBe(0);
    expect(sentencesOf(choices())).toEqual(first);
    swipe(150);
    expect(currentDot()).toBe(pageCount - 1);
    swipe(-150);
    expect(currentDot()).toBe(0);
  });

  it('springs back from a drag across the overview too short and slow to turn the page', () => {
    swipe(0, -300);
    pointer('pointerdown', 200, 300);
    pointer('pointermove', 190, 300);
    pointer('pointerup', 190, 300);
    expect((page.querySelector('.page-track') as HTMLElement).style.transform).toBe('translateX(0px)');
    expect(currentDot()).toBe(0);
  });

  it('keeps the pages either side of the one in view as they turn round, both ways, out of reach of the keyboard and screen readers', () => {
    swipe(0, -300);
    const check = (turned: number) => {
      expect([-1, 0, 1].map(position => aidsAt(position))).toEqual([turned - 1, turned, turned + 1].map(pageOf));
      expect(currentDot()).toBe(wrapped(turned, pageCount));
      const pages = Array.from(page.querySelectorAll('.page')) as HTMLElement[];
      expect(pages.filter(each => !each.inert).length).toBe(1);
      expect(pageAt(0)!.inert).toBeFalse();
      expect(pageAt(0)!.classList).toContain('current');
    };
    check(0);
    for (let turned = 1; turned <= pageCount + 1; turned++) {
      swipe(-150);
      check(turned);
    }
    for (let turned = pageCount; turned >= -2; turned--) {
      swipe(150);
      check(turned);
    }
  });

  it('draws every page of the overview once, so turning the pages draws no aids again', () => {
    swipe(0, -300);
    const cards = Array.from(page.querySelectorAll('.choice .card'));
    expect(cards.length).toBe(STORYTELLER_AIDS.length);
    const next = pageAt(1);
    swipe(-150);
    expect(pageAt(0)).toBe(next);
    swipe(150);
    swipe(150);
    const after = Array.from(page.querySelectorAll('.choice .card'));
    expect(after.length).toBe(cards.length);
    expect(after.every((card, index) => card === cards[index])).toBeTrue();
  });

  it('leaves the aids in the overview alone while a finger turns the pages, or loads and unloads them', () => {
    swipe(0, -300);
    const read = spyOnProperty(StorytellerAid.prototype, 'sentence', 'get').and.callThrough();
    pointer('pointerdown', 200, 300);
    pointer('pointermove', 160, 300);
    pointer('pointermove', 120, 300);
    pointer('pointerup', 120, 300);
    settle();
    expect(currentDot()).toBe(1);
    // You are evil is on the second page
    const { x, y } = restingCenter(YOU_ARE_EVIL);
    pointer('pointerdown', x, y);
    pointer('pointerup', x, y);
    expect(fixture.componentInstance.loadedAids.isLoaded(YOU_ARE_EVIL)).toBeFalse();
    expect(read).not.toHaveBeenCalled();
  });

  it('cuts a page turn short with the next swipe, turning on from where it was going', () => {
    swipe(0, -300);
    pointer('pointerdown', 200, 300);
    pointer('pointerup', 50, 300);
    pointer('pointerdown', 200, 300);
    pointer('pointerup', 50, 300);
    settle();
    expect(currentDot()).toBe(2);
    expect([-1, 0, 1].map(position => aidsAt(position))).toEqual([1, 2, 3].map(pageOf));
  });

  it('remembers what was loaded and unloaded as the pages turn round, on the pages either side too', () => {
    swipe(0, -300);
    tap(YOU_ARE_EVIL);
    tap(THESE_PLAYERS_ARE_NOT_LEGION);
    const evil = () => pageAt(-1)!.querySelector(`.choice[data-aid="${YOU_ARE_EVIL.id}"]`)!;
    expect(evil().classList).toContain('unloaded');
    expect(evil().getAttribute('aria-pressed')).toBe('false');
    for (let turn = 0; turn < pageCount; turn++) swipe(-150);
    expect(evil().classList).toContain('unloaded');
    expect(choice(THESE_PLAYERS_ARE_NOT_LEGION).getAttribute('aria-pressed')).toBe('true');
    expect(choice(THESE_PLAYERS_ARE_NOT_LEGION).classList).not.toContain('unloaded');
    expect(choice(YOU_ARE_EVIL).getAttribute('aria-pressed')).toBe('false');
    expect(choice(YOU_ARE_GOOD).getAttribute('aria-pressed')).toBe('true');
  });

  it('turns the pages with the arrow keys', () => {
    key('ArrowUp');
    key('ArrowRight');
    settle();
    expect(currentDot()).toBe(1);
    key('ArrowLeft');
    settle();
    expect(currentDot()).toBe(0);
  });

  it('swipes down from any page, and opens again on the page it was left on', () => {
    swipe(0, -300);
    swipe(-150);
    swipe(-150);
    swipe(0, 300);
    expect(overviewOpen()).toBeFalse();
    expect(shown()).toBe(sentence(0));
    swipe(0, -300);
    expect(currentDot()).toBe(2);
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

  it('taps a character aid to load it, and it comes round after the standard aids', () => {
    swipe(0, -300);
    tap(THESE_PLAYERS_ARE_NOT_LEGION);
    expect(choice(THESE_PLAYERS_ARE_NOT_LEGION).getAttribute('aria-pressed')).toBe('true');
    swipe(0, 300);
    swipe(150);
    expect(shown()).toBe(THESE_PLAYERS_ARE_NOT_LEGION.sentence);
    swipe(-150);
    expect(shown()).toBe(sentence(0));
  });

  it('swipes down to go round the loaded aids alone', () => {
    swipe(0, -300);
    startingAids.filter(aid => aid !== YOU_ARE_GOOD && aid !== YOU_ARE_EVIL).forEach(tap);
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
    startingAids.filter(aid => aid !== YOU_ARE_GOOD).forEach(tap);
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
    tap(startingAids[1]);
    swipe(0, 300);
    expect(shown()).toBe(sentence(2));
  });

  it('says so when no aids are loaded, and still swipes up to load some', () => {
    swipe(0, -300);
    startingAids.forEach(tap);
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

  it('loads or unloads the aid coming to rest under a tap while the overview is still sliding up, though the browser clicks nothing', () => {
    swipe(0, -300);
    // Held partway up its slide, with a different aid, or none, under the
    // finger for now
    const overview = page.querySelector('.overview') as HTMLElement;
    overview.style.transition = 'none';
    overview.style.transform = 'translateY(200px)';
    const { x, y } = restingCenter(YOU_ARE_EVIL);
    pointer('pointerdown', x, y);
    pointer('pointerup', x, y);
    expect(loaded()).toEqual(startingAids.filter(aid => aid !== YOU_ARE_EVIL));
  });

  it('loads or unloads nothing with a tap between the aids', () => {
    swipe(0, -300);
    const heading = page.querySelector('.page.current .page-heading')!.getBoundingClientRect();
    const rise = page.querySelector('.overview')!.getBoundingClientRect().top - page.getBoundingClientRect().top;
    pointer('pointerdown', heading.left + heading.width / 2, heading.top - rise + heading.height / 2);
    pointer('pointerup', heading.left + heading.width / 2, heading.top - rise + heading.height / 2);
    expect(loaded()).toEqual(startingAids);
    expect(overviewOpen()).toBeTrue();
  });

  it("doesn't take a drag over an aid for a tap, though the keyboard can still choose it", () => {
    swipe(0, -300);
    const { x, y } = restingCenter(YOU_ARE_EVIL);
    pointer('pointerdown', x, y);
    pointer('pointermove', x, y - 50);
    pointer('pointerup', x, y - 50);
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

  describe('a custom aid', () => {
    // The secret word aid, loaded and in view: it comes round last, so it's
    // the one before the first aid
    beforeEach(() => {
      swipe(0, -300);
      tap(YOUR_SECRET_WORD_IS);
      swipe(0, 300);
      swipe(150);
      expect(shown()).toBe('Your secret word is haberdashery');
    });

    function editor(): HTMLElement | null {
      return page.querySelector('.editor');
    }

    function input(): HTMLInputElement {
      return page.querySelector('.editor input') as HTMLInputElement;
    }

    function preview(): string | null | undefined {
      return page.querySelector('.editor .preview .card')?.getAttribute('aria-label');
    }

    function center(selector: string): { x: number; y: number } {
      const box = page.querySelector(selector)!.getBoundingClientRect();
      return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
    }

    // A finger taps the Edit button by the aid in view
    function tapEdit(): void {
      const { x, y } = center('.slot.current .edit');
      pointer('pointerdown', x, y);
      pointer('pointerup', x, y);
    }

    function type(text: string): void {
      input().value = text;
      input().dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }

    function press(selector: string): void {
      (page.querySelector(selector) as HTMLButtonElement).click();
      fixture.detectChanges();
    }

    it('has an Edit button, which the other aids do not', () => {
      expect(page.querySelector('.slot.current .edit')).not.toBeNull();
      swipe(-150);
      expect(page.querySelector('.slot.current .edit')).toBeNull();
    });

    it('keeps its Edit button out of reach of the keyboard while it waits off to one side', () => {
      const edit = (position: number) => slotAt(position)!.querySelector('.edit')!;
      expect(edit(0).hasAttribute('tabindex')).toBeFalse();
      swipe(-150);
      expect(edit(-1).getAttribute('tabindex')).toBe('-1');
      swipe(150);
      expect(edit(0).hasAttribute('tabindex')).toBeFalse();
      swipe(150);
      expect(edit(1).getAttribute('tabindex')).toBe('-1');
      expect(page.querySelectorAll('.edit').length).toBe(1);
    });

    it('follows each word as it is typed on the card below', () => {
      tapEdit();
      for (const word of ['p', 'pi', 'pickle', 'pickles']) {
        type(word);
        expect(preview()).toBe(`Your secret word is ${word}`);
      }
    });

    it('keeps the words on the card as it slides away and back again', () => {
      tapEdit();
      type('pickle');
      press('.editor .done');
      swipe(-150);
      expect(sentenceAt(-1)).toBe('Your secret word is pickle');
      swipe(150);
      expect(shown()).toBe('Your secret word is pickle');
      expect(sentenceAt(1)).toBe(sentence(0));
    });

    it('opens the editor from the Edit button, with its words picked out to type over', () => {
      expect(editor()).toBeNull();
      tapEdit();
      expect(editor()).not.toBeNull();
      expect(page.querySelector('main')!.inert).toBeTrue();
      expect(document.activeElement).toBe(input());
      expect(input().value).toBe('haberdashery');
      expect([input().selectionStart, input().selectionEnd]).toEqual([0, 'haberdashery'.length]);
      expect(preview()).toBe('Your secret word is haberdashery');
    });

    it('opens the editor from the Edit button clicked from the keyboard', () => {
      const button = page.querySelector('.slot.current .edit')!;
      button.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 0 }));
      fixture.detectChanges();
      expect(editor()).not.toBeNull();
    });

    it('leaves a tap on the card itself alone, so a thumb on it while it is held up opens nothing', () => {
      const { x, y } = center('.slot.current .card');
      pointer('pointerdown', x, y);
      pointer('pointerup', x, y);
      expect(editor()).toBeNull();
    });

    it('shows the words on the card as they are typed, and keeps them with Done', () => {
      tapEdit();
      type('pickle');
      expect(preview()).toBe('Your secret word is pickle');
      expect(shown()).toBe('Your secret word is haberdashery');
      press('.editor .done');
      expect(editor()).toBeNull();
      expect(page.querySelector('main')!.inert).toBeFalse();
      expect(shown()).toBe('Your secret word is pickle');
    });

    it("keeps the words with the keyboard's own Done key", () => {
      tapEdit();
      type('pickle');
      page.querySelector('.editor form')!.dispatchEvent(new Event('submit', { cancelable: true }));
      fixture.detectChanges();
      expect(editor()).toBeNull();
      expect(shown()).toBe('Your secret word is pickle');
    });

    it('shows the storyteller\'s words in the overview too, and remembers them after a refresh', () => {
      tapEdit();
      type('pickle');
      press('.editor .done');
      swipe(0, -300);
      expect(choice(YOUR_SECRET_WORD_IS).querySelector('.card')?.getAttribute('aria-label')).toBe('Your secret word is pickle');

      const refreshed = TestBed.createComponent(StorytellerAidsPageComponent);
      refreshed.detectChanges();
      const card = (refreshed.nativeElement as HTMLElement).querySelector(`.choice[data-aid="${YOUR_SECRET_WORD_IS.id}"] .card`);
      expect(card?.getAttribute('aria-label')).toBe('Your secret word is pickle');
    });

    it('leaves the words as they were with Cancel, or Escape', () => {
      tapEdit();
      type('pickle');
      press('.editor .bar-button:not(.done)');
      expect(editor()).toBeNull();
      expect(shown()).toBe('Your secret word is haberdashery');

      tapEdit();
      type('pickle');
      input().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();
      expect(editor()).toBeNull();
      expect(shown()).toBe('Your secret word is haberdashery');
    });

    it('opens again with the words last kept', () => {
      tapEdit();
      type('pickle');
      press('.editor .done');
      tapEdit();
      expect(input().value).toBe('pickle');
    });

    it('resets to the words the aid comes with, which there is no resetting from', () => {
      tapEdit();
      expect((page.querySelector('.editor .reset') as HTMLButtonElement).disabled).toBeTrue();
      type('pickle');
      expect((page.querySelector('.editor .reset') as HTMLButtonElement).disabled).toBeFalse();
      press('.editor .reset');
      expect(input().value).toBe('haberdashery');
      expect(preview()).toBe('Your secret word is haberdashery');
      expect((page.querySelector('.editor .reset') as HTMLButtonElement).disabled).toBeTrue();
    });

    it('shows the words the aid comes with while there are none typed, and keeps those with Done', () => {
      tapEdit();
      type('pickle');
      press('.editor .done');
      tapEdit();
      type('   ');
      expect(preview()).toBe('Your secret word is haberdashery');
      press('.editor .done');
      expect(shown()).toBe('Your secret word is haberdashery');
    });

    it("doesn't step through the aids with the arrow keys while editing", () => {
      tapEdit();
      key('ArrowRight');
      key('ArrowUp');
      settle();
      expect(overviewOpen()).toBeFalse();
      press('.editor .bar-button:not(.done)');
      expect(shown()).toBe('Your secret word is haberdashery');
    });
  });

  it("writes a whole card of the storyteller's own words on a custom aid that's all words", () => {
    swipe(0, -300);
    tap(CUSTOM_AID_1);
    swipe(0, 300);
    swipe(150);
    expect(shown()).toBe('Custom Aid 1');

    const edit = page.querySelector('.slot.current .edit')!.getBoundingClientRect();
    pointer('pointerdown', edit.left + edit.width / 2, edit.top + edit.height / 2);
    pointer('pointerup', edit.left + edit.width / 2, edit.top + edit.height / 2);
    const input = page.querySelector('.editor input') as HTMLInputElement;
    expect(input.value).toBe('Custom Aid 1');
    expect(input.maxLength).toBe(60);

    input.value = 'Choose a player to protect tonight';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(page.querySelector('.editor .preview .card')?.getAttribute('aria-label')).toBe('Choose a player to protect tonight');
    (page.querySelector('.editor .done') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(shown()).toBe('Choose a player to protect tonight');
  });
});
