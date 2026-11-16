import { STORYTELLER_AID_COLORS, StorytellerAid, StorytellerAidPicture } from './storyteller-aid';
import { STORYTELLER_AID_PICTURES } from './storyteller-aid-pictures';
import { STORYTELLER_AIDS } from './storyteller-aid-library';

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

  it('layers several pictures into one, each drawn over the last', () => {
    const { spiral, handprint } = STORYTELLER_AID_PICTURES;
    const aid = new StorytellerAid({ id: 'layered', category: 'standard', color: 'teal', picture: [spiral, handprint], text: ['Layered'] });
    expect(aid.picture.shapes).toEqual([...spiral.shapes, ...handprint.shapes]);
  });

  it('gives every aid in the library its own id', () => {
    const ids = STORYTELLER_AIDS.map(aid => aid.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  // Two aids can share a card's color as long as their pictures are tinted
  // differently, like the Lunatic's blue spiral and Legion's red handprint,
  // both on grey
  it('gives every aid in the library its own colors', () => {
    const colors = STORYTELLER_AIDS.map(aid => `${aid.color} ${aid.pictureColor ?? aid.color}`);
    expect(new Set(colors).size).toBe(colors.length);
  });
});
