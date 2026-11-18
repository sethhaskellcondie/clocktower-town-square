import { TestBed } from '@angular/core/testing';
import { StorytellerAidCardComponent } from './storyteller-aid-card.component';
import { STORYTELLER_AID_COLORS, StorytellerAid } from './storyteller-aid';
import { STORYTELLER_AID_PICTURES } from './storyteller-aid-pictures';
import { LUNATIC } from '../character-sheets/character-library';
import {
  STORYTELLER_AIDS,
  THE_LUNATIC_CHOSE_THESE_PLAYERS,
  THESE_CHARACTERS_ARE_NOT_IN_PLAY,
  THESE_PLAYERS_ARE_NOT_LEGION,
  YOU_ARE_EVIL,
  YOU_ARE_GOOD,
  YOU_ARE_THE_GOOD_TWIN,
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

  it("tints the picture from the card's color when it has no color of its own", () => {
    const card = render(YOU_ARE_EVIL);
    expect(getComputedStyle(card.querySelector('.picture path')!).fill).toBe(getComputedStyle(card.querySelector('.frame .leaf')!).fill);
  });

  it("tints the picture from its own color when it has one, leaving the frame in the card's own tints", () => {
    // Read before rendering another card, which takes this one off the page
    const card = render(
      new StorytellerAid({
        id: 'blue-on-grey',
        category: 'standard',
        color: STORYTELLER_AID_COLORS.grey,
        picture: STORYTELLER_AID_PICTURES.goodMask,
        pictureColor: STORYTELLER_AID_COLORS.blue,
        text: ['Blue on grey'],
      }),
    );
    const mask = getComputedStyle(card.querySelector('.picture path')!).fill;
    const carving = getComputedStyle(card.querySelector('.picture path.dark')!).fill;
    const frame = getComputedStyle(card.querySelector('.frame .leaf')!).fill;
    const background = getComputedStyle(card.querySelector('.card')!).backgroundColor;

    const good = render(YOU_ARE_GOOD);
    expect(mask).toBe(getComputedStyle(good.querySelector('.picture path')!).fill);
    expect(frame).not.toBe(mask);
    expect(carving).toBe(background);
  });

  it("shows the character's icon in place of a picture on an aid about a character", () => {
    const card = render(THE_LUNATIC_CHOSE_THESE_PLAYERS);
    const icon = card.querySelector('img.picture') as HTMLImageElement;
    expect(icon.getAttribute('src')).toBe(LUNATIC.icon);
    expect(icon.alt).toBe('');
    expect(card.querySelector('svg.picture')).toBeNull();
  });

  // The icon is enlarged past its room to make up for its clear margin, so
  // it's the room, before the enlargement, that has to sit below the words
  it('puts the words above an icon too', () => {
    const card = render(THESE_PLAYERS_ARE_NOT_LEGION);
    const text = card.querySelector('.text') as HTMLElement;
    const icon = card.querySelector('.picture') as HTMLElement;
    expect(icon.offsetHeight).toBeGreaterThan(0);
    expect(text.offsetTop + text.offsetHeight).toBeLessThanOrEqual(icon.offsetTop);
  });

  it('puts any more words below the picture, the same size as the words above', () => {
    const card = render(YOU_ARE_THE_GOOD_TWIN);
    const [above, below] = Array.from(card.querySelectorAll('.text')) as HTMLElement[];
    const icon = card.querySelector('.picture') as HTMLElement;
    expect(Array.from(below.querySelectorAll('.line')).map(line => line.textContent)).toEqual(['The', 'evil twin', 'is...']);
    expect(icon.offsetHeight).toBeGreaterThan(0);
    expect(icon.offsetTop + icon.offsetHeight).toBeLessThanOrEqual(below.offsetTop);
    expect(fontSize(below)).toBe(fontSize(above));
  });

  // The corner ornaments are a sixth of the card's width tall, and the
  // words above the picture start below them
  it('keeps the words below the picture clear of the corner ornaments, as the words above are', () => {
    const card = render(YOU_ARE_THE_GOOD_TWIN);
    const box = card.querySelector('.card')!.getBoundingClientRect();
    const [above, below] = Array.from(card.querySelectorAll('.text')).map(text => text.getBoundingClientRect());
    expect(box.bottom - below.bottom).toBeCloseTo(above.top - box.top, 0);
  });

  it('shows nothing below the picture on an aid without more words', () => {
    const card = render(YOU_ARE_EVIL);
    expect(card.querySelectorAll('.text').length).toBe(1);
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
