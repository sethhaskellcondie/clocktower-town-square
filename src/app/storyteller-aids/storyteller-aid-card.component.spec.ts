import { TestBed } from '@angular/core/testing';
import { StorytellerAidCardComponent } from './storyteller-aid-card.component';
import { StorytellerAid } from './storyteller-aid';
import {
  STORYTELLER_AIDS,
  THE_LUNATIC_CHOSE_THESE_PLAYERS,
  THESE_CHARACTERS_ARE_NOT_IN_PLAY,
  YOU_ARE_EVIL,
  YOU_ARE_GOOD,
} from './storyteller-aid-library';

describe('StorytellerAidCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorytellerAidCardComponent],
    }).compileComponents();
  });

  function render(aid: StorytellerAid, width = 300): HTMLElement {
    const fixture = TestBed.createComponent(StorytellerAidCardComponent);
    fixture.componentInstance.aid = aid;
    const host = fixture.nativeElement as HTMLElement;
    host.style.width = `${width}px`;
    fixture.detectChanges();
    return host;
  }

  function fontSize(element: Element): number {
    return parseFloat(getComputedStyle(element).fontSize);
  }

  it('shows each line of text, setting the emphasized one apart', () => {
    const card = render(YOU_ARE_EVIL);
    const lines = Array.from(card.querySelectorAll('.text .line'));
    expect(lines.map(line => line.textContent)).toEqual(['You', 'are', 'evil']);
    expect(lines.map(line => line.querySelector('.words')!.classList.contains('emphasis'))).toEqual([false, false, true]);
  });

  it('can set apart only some of a line, keeping it on one line', () => {
    const card = render(THESE_CHARACTERS_ARE_NOT_IN_PLAY);
    const line = card.querySelectorAll('.text .line')[2];
    const words = Array.from(line.querySelectorAll('.words'));
    expect(words.map(word => word.textContent)).toEqual(['are', 'not']);
    expect(words.map(word => word.classList.contains('emphasis'))).toEqual([false, true]);
    const [plain, emphasized] = words.map(word => word.getBoundingClientRect());
    expect(emphasized.left).toBeGreaterThan(plain.right);
    expect(emphasized.top).toBeLessThan(plain.bottom);
  });

  it('puts the words above the picture', () => {
    const card = render(YOU_ARE_EVIL);
    const text = card.querySelector('.text')!.getBoundingClientRect();
    const picture = card.querySelector('.picture')!.getBoundingClientRect();
    expect(text.bottom).toBeLessThanOrEqual(picture.top);
  });

  it('sets short words larger than long ones', () => {
    const short = fontSize(render(YOU_ARE_GOOD).querySelector('.text')!);
    const long = fontSize(render(THE_LUNATIC_CHOSE_THESE_PLAYERS).querySelector('.text')!);
    expect(short).toBeGreaterThan(long);
  });

  it('fits every line of every aid across the card, each on one line', () => {
    for (const aid of STORYTELLER_AIDS) {
      const card = render(aid);
      const width = card.querySelector('.card')!.getBoundingClientRect().width;
      for (const line of Array.from(card.querySelectorAll('.text .line'))) {
        const box = line.getBoundingClientRect();
        expect(box.width).withContext(`${aid.id}: ${line.textContent}`).toBeLessThanOrEqual(width * 0.88);
        expect(box.height).withContext(`${aid.id}: ${line.textContent}`).toBeLessThan(fontSize(line) * 1.5);
      }
    }
  });

  it('reads as one sentence to screen readers', () => {
    const card = render(YOU_ARE_EVIL);
    expect(card.querySelector('.card')?.getAttribute('aria-label')).toBe('You are evil');
  });

  it("is washed in the aid's color", () => {
    const card = render(YOU_ARE_EVIL);
    const style = (card.querySelector('.card') as HTMLElement).style;
    expect(style.getPropertyValue('--aid-color')).toBe(YOU_ARE_EVIL.color);
  });

  it('draws a custom picture shape by shape, light or dark, filled or as a line', () => {
    const card = render(
      new StorytellerAid({
        id: 'custom',
        category: 'standard',
        color: '#123456',
        picture: {
          shapes: [
            { paint: 'light', d: 'M10 10H90V90H10Z' },
            { paint: 'dark', d: 'M30 30H70V70H30Z' },
            { paint: 'dark', line: true, width: 3, d: 'M10 50H90' },
          ],
        },
        text: ['A', { emphasis: 'custom' }, 'aid'],
      }),
    );
    const paths = Array.from(card.querySelectorAll('.picture path')) as SVGPathElement[];
    expect(paths.map(path => path.getAttribute('d'))).toEqual(['M10 10H90V90H10Z', 'M30 30H70V70H30Z', 'M10 50H90']);
    expect(paths.map(path => path.classList.contains('dark'))).toEqual([false, true, true]);
    expect(paths.map(path => path.classList.contains('line'))).toEqual([false, false, true]);
    expect(paths[2].style.strokeWidth).toBe('3');
  });
});
