import { STORYTELLER_AID_COLORS, StorytellerAid, StorytellerAidPicture } from './storyteller-aid';
import { STORYTELLER_AID_PICTURES } from './storyteller-aid-pictures';
import { STORYTELLER_AIDS } from './storyteller-aid-library';
import { LUNATIC } from '../character-sheets/character-library';

describe('StorytellerAid', () => {
  it('takes its lines in order, marking the emphasized one', () => {
    const aid = new StorytellerAid({
      id: 'you-are-evil',
      category: 'standard',
      color: STORYTELLER_AID_COLORS.red,
      picture: STORYTELLER_AID_PICTURES.evilMask,
      text: ['You', 'are', { emphasis: 'evil' }],
    });
    expect(aid.lines).toEqual([
      [{ text: 'You', emphasis: false }],
      [{ text: 'are', emphasis: false }],
      [{ text: 'evil', emphasis: true }],
    ]);
    expect(aid.sentence).toBe('You are evil');
  });

  it('can emphasize only some of a line', () => {
    const aid = new StorytellerAid({
      id: 'not-in-play',
      category: 'standard',
      color: STORYTELLER_AID_COLORS.teal,
      picture: STORYTELLER_AID_PICTURES.circles,
      text: ['These', 'characters', ['are', { emphasis: 'not' }], { emphasis: 'in play' }],
    });
    expect(aid.lines).toEqual([
      [{ text: 'These', emphasis: false }],
      [{ text: 'characters', emphasis: false }],
      [{ text: 'are', emphasis: false }, { text: 'not', emphasis: true }],
      [{ text: 'in play', emphasis: true }],
    ]);
    expect(aid.sentence).toBe('These characters are not in play');
  });

  it('can be made with a color and a picture of its own', () => {
    const star: StorytellerAidPicture = { shapes: [{ paint: 'light', d: 'M50 5L61 39H97L68 61L79 95L50 74L21 95L32 61L3 39H39Z' }] };
    const aid = new StorytellerAid({ id: 'star', category: 'standard', color: 'rebeccapurple', picture: star, text: [{ emphasis: 'Star' }] });
    expect(aid.color).toBe('rebeccapurple');
    expect(aid.picture).toBe(star);
  });

  it("takes its picture's color from the card unless given one of its own", () => {
    const { spiral } = STORYTELLER_AID_PICTURES;
    const tinted = new StorytellerAid({ id: 'tinted', category: 'standard', color: 'teal', picture: spiral, text: ['Tinted'] });
    const colored = new StorytellerAid({
      id: 'colored',
      category: 'standard',
      color: 'teal',
      picture: spiral,
      pictureColor: STORYTELLER_AID_COLORS.blue,
      text: ['Colored'],
    });
    expect(tinted.pictureColor).toBeUndefined();
    expect(colored.pictureColor).toBe(STORYTELLER_AID_COLORS.blue);
  });

  it("can show a character's icon in place of a picture", () => {
    const aid = new StorytellerAid({ id: 'lunatic', category: 'character', color: 'grey', icon: LUNATIC.icon, text: ['Lunatic'] });
    expect(aid.icon).toBe(LUNATIC.icon);
    expect(aid.picture).toBeUndefined();
  });

  it('has no lines below its picture unless it is given some', () => {
    const aid = new StorytellerAid({ id: 'lunatic', category: 'character', color: 'grey', icon: LUNATIC.icon, text: ['Lunatic'] });
    expect(aid.linesBelow).toEqual([]);
    expect(aid.sentence).toBe('Lunatic');
  });

  it('can have more lines below its picture, read as a sentence after the ones above', () => {
    const aid = new StorytellerAid({
      id: 'good-twin',
      category: 'character',
      color: 'grey',
      icon: LUNATIC.icon,
      text: ['You are the', { emphasis: 'good twin' }],
      textBelow: ['The', { emphasis: 'evil twin' }, 'is...'],
    });
    expect(aid.lines).toEqual([[{ text: 'You are the', emphasis: false }], [{ text: 'good twin', emphasis: true }]]);
    expect(aid.linesBelow).toEqual([
      [{ text: 'The', emphasis: false }],
      [{ text: 'evil twin', emphasis: true }],
      [{ text: 'is...', emphasis: false }],
    ]);
    expect(aid.sentence).toBe('You are the good twin. The evil twin is...');
  });

  it('starts no new sentence below the picture when the words above end in punctuation', () => {
    const aid = new StorytellerAid({ id: 'asked', category: 'standard', color: 'teal', icon: LUNATIC.icon, text: ['Ready?'], textBelow: ['Go'] });
    expect(aid.sentence).toBe('Ready? Go');
  });

  it('layers several pictures into one, each drawn over the last', () => {
    const { spiral, handprint } = STORYTELLER_AID_PICTURES;
    const aid = new StorytellerAid({ id: 'layered', category: 'standard', color: 'teal', picture: [spiral, handprint], text: ['Layered'] });
    expect(aid.picture?.shapes).toEqual([...spiral.shapes, ...handprint.shapes]);
  });

  it('gives every aid in the library its own id', () => {
    const ids = STORYTELLER_AIDS.map(aid => aid.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  // Two aids can share a card's color as long as their pictures are tinted
  // differently or they show different characters' icons, like the Lunatic
  // and Legion, both on grey. Aids about the same character, like the
  // Barista's two, share its icon, so their words tell them apart.
  it('tells every aid in the library apart by its colors or its icon, or its words for the same character', () => {
    const looks = STORYTELLER_AIDS.map(aid =>
      aid.icon ? `${aid.color} ${aid.icon} ${aid.sentence}` : `${aid.color} ${aid.pictureColor ?? aid.color}`,
    );
    expect(new Set(looks).size).toBe(looks.length);
  });
});
