import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StorytellerAidsPageComponent } from './storyteller-aids-page.component';
import { STORYTELLER_AIDS } from './storyteller-aid-library';

describe('StorytellerAidsPageComponent', () => {
  let fixture: ComponentFixture<StorytellerAidsPageComponent>;
  let page: HTMLElement;
  const sentence = (offset: number) => STORYTELLER_AIDS[(offset + STORYTELLER_AIDS.length) % STORYTELLER_AIDS.length].sentence;

  beforeEach(async () => {
    // Synthetic pointers aren't real ones the browser can capture
    spyOn(Element.prototype, 'setPointerCapture');
    await TestBed.configureTestingModule({
      imports: [StorytellerAidsPageComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(StorytellerAidsPageComponent);
    fixture.detectChanges();
    page = fixture.nativeElement as HTMLElement;
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
});
