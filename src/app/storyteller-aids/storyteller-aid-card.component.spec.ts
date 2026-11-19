import { TestBed } from '@angular/core/testing';
import { StorytellerAidCardComponent } from './storyteller-aid-card.component';
import { STORYTELLER_AID_COLORS, StorytellerAid } from './storyteller-aid';
import { STORYTELLER_AID_PICTURES } from './storyteller-aid-pictures';
import { LUNATIC } from '../character-sheets/character-library';
import {
  CUSTOM_AID_1,
  STORYTELLER_AIDS,
  THE_LUNATIC_CHOSE_THESE_PLAYERS,
  THESE_CHARACTERS_ARE_NOT_IN_PLAY,
  THESE_PLAYERS_ARE_NOT_LEGION,
  YOU_ARE_EVIL,
  YOU_ARE_GOOD,
  YOU_ARE_MAD_THAT_THIS_PLAYER_IS_EVIL,
  YOU_ARE_THE_GOOD_TWIN,
  YOUR_SECRET_PHRASE_IS,
  YOUR_SECRET_WORD_IS,
  YOUR_TASK_IS,
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

  // Except for words the storyteller can change, which wrap onto as many
  // lines as they take
  it('fits every line of every aid with a picture across the card, each on one line', () => {
    for (const aid of STORYTELLER_AIDS.filter(aid => !aid.textOnly)) {
      const card = render(aid);
      const width = card.querySelector('.card')!.getBoundingClientRect().width;
      const editable = [...aid.lines, ...aid.linesBelow].map(line => line.some(words => words.editable));
      Array.from(card.querySelectorAll('.text .line')).forEach((line, index) => {
        const box = line.getBoundingClientRect();
        expect(box.width).withContext(`${aid.id}: ${line.textContent}`).toBeLessThanOrEqual(width * 0.88);
        if (!editable[index]) expect(box.height).withContext(`${aid.id}: ${line.textContent}`).toBeLessThan(fontSize(line) * 1.5);
      });
    }
  });

  // A word can't wrap onto another line, so the words shrink until the
  // longest one fits, like a long secret word written into a custom aid
  it('fits a long word across the card, however long the storyteller writes it', () => {
    for (const word of ['haberdashery', 'antidisestablishmentarian', 'WWWWWWWWWWWWWWWWWWWW']) {
      const card = render(YOUR_SECRET_WORD_IS.withEditableText(word));
      const width = card.querySelector('.card')!.getBoundingClientRect().width;
      const emphasis = card.querySelector('.emphasis')!;
      expect(emphasis.textContent).toBe(word);
      expect(emphasis.getBoundingClientRect().width).withContext(word).toBeLessThanOrEqual(width * 0.88);
    }
  });

  it('wraps a phrase the storyteller writes onto as many lines as it takes, inside the card and above the picture', () => {
    for (const phrase of ["I'm not going to vote", 'The quick brown fox jumps over the lazy dog, twice over']) {
      const card = render(YOUR_SECRET_PHRASE_IS.withEditableText(phrase));
      const width = card.querySelector('.card')!.getBoundingClientRect().width;
      const words = card.querySelector('.emphasis') as HTMLElement;
      const text = card.querySelector('.text') as HTMLElement;
      const icon = card.querySelector('.picture') as HTMLElement;
      expect(words.textContent).toBe(phrase);
      expect(words.getBoundingClientRect().width).withContext(phrase).toBeLessThanOrEqual(width * 0.88);
      expect(words.getBoundingClientRect().height).withContext(phrase).toBeGreaterThan(fontSize(words) * 1.5);
      expect(icon.offsetHeight).withContext(phrase).toBeGreaterThan(0);
      expect(text.offsetTop + text.offsetHeight).withContext(phrase).toBeLessThanOrEqual(icon.offsetTop);
    }
  });

  it('keeps the words as large as the lines allow when the storyteller writes a short one', () => {
    const long = fontSize(render(YOUR_SECRET_WORD_IS).querySelector('.text')!);
    const short = fontSize(render(YOUR_SECRET_WORD_IS.withEditableText('hat')).querySelector('.text')!);
    expect(short).toBeGreaterThan(long);
  });

  describe('without a picture', () => {
    const sentence = 'Choose a player to protect from the Demon tonight, or pass';

    it('shows no picture, and sets the words down the middle of the card', () => {
      const card = render(CUSTOM_AID_1);
      expect(card.querySelector('.picture')).toBeNull();
      const box = card.querySelector('.card')!.getBoundingClientRect();
      const text = card.querySelector('.text')!.getBoundingClientRect();
      expect(Math.abs(text.top - box.top - (box.bottom - text.bottom))).toBeLessThan(2);
    });

    // The corner ornaments are a sixth of the card's width tall
    it('fits the words inside the frame, across and down, however much the storyteller writes', () => {
      for (const text of ['Custom Aid 1', 'Yes', sentence, 'Antidisestablishmentarianism', 'WWWW WWWW WWWW WWWW WWWW WWWW WWWW WWWW WWWW WWWW WWWW']) {
        const card = render(CUSTOM_AID_1.withEditableText(text));
        const box = card.querySelector('.card')!.getBoundingClientRect();
        const words = card.querySelector('.text')!.getBoundingClientRect();
        expect(words.width).withContext(text).toBeLessThanOrEqual(box.width * 0.88);
        expect(words.top - box.top).withContext(text).toBeGreaterThan(box.width / 6);
        expect(box.bottom - words.bottom).withContext(text).toBeGreaterThan(box.width / 6);
      }
    });

    it('sets the words larger than it could beside a picture, the fewer of them the larger', () => {
      const short = fontSize(render(CUSTOM_AID_1).querySelector('.text')!);
      const long = fontSize(render(CUSTOM_AID_1.withEditableText(sentence)).querySelector('.text')!);
      expect(short).toBeGreaterThan(18 * 3);
      expect(short).toBeGreaterThan(long);
    });

    // A long sentence fills the card down as well as across
    it('wraps a long sentence onto as many lines as fill the card', () => {
      const card = render(CUSTOM_AID_1.withEditableText(sentence));
      const box = card.querySelector('.card')!.getBoundingClientRect();
      expect(card.querySelector('.text')!.getBoundingClientRect().height).toBeGreaterThan(box.height / 2);
    });
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

  it('keeps the picture smaller when the aid says to, still filling the room the words leave down the card', () => {
    const aid = (pictureSize?: number) =>
      new StorytellerAid({ id: 'small', category: 'standard', color: 'teal', picture: STORYTELLER_AID_PICTURES.goodMask, pictureSize, text: ['Small'] });
    const usual = render(aid()).querySelector('.picture')!.getBoundingClientRect();
    const card = render(aid(30));
    const width = card.querySelector('.card')!.getBoundingClientRect().width;
    const small = card.querySelector('.picture')!.getBoundingClientRect();
    expect(small.width).toBeCloseTo(width * 0.3, 0);
    expect(small.height).toBeCloseTo(usual.height, 0);
    expect(small.left + small.width / 2).toBeCloseTo(usual.left + usual.width / 2, 0);
  });

  // An icon is drawn as large as the smaller of its room's width and height
  it("keeps the secret phrase's and the task's icons the size of the Harpy's on its aid", () => {
    const drawn = (card: HTMLElement) => {
      const icon = card.querySelector('img.picture') as HTMLElement;
      return Math.min(icon.offsetWidth, icon.offsetHeight);
    };
    const harpy = drawn(render(YOU_ARE_MAD_THAT_THIS_PLAYER_IS_EVIL));
    for (const aid of [YOUR_SECRET_PHRASE_IS, YOUR_TASK_IS]) {
      expect(Math.abs(drawn(render(aid)) - harpy)).withContext(aid.id).toBeLessThan(2);
    }
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
