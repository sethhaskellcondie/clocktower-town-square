// A storyteller aid is a card the Storyteller holds up at night to tell a
// player something without a word, like "You are evil". Every card is laid
// out the same way, so making one only takes three things:
//
// - a color the whole card is washed in,
// - a few lines of text across the top, any of them emphasized, in whole or
//   in part,
// - a picture below them, or several layered together.
//
// The words are what the player reads, so they're set as large as they'll
// fit, and the picture is smaller, backing them up.
//
// For each there are standard options below, matching the official cards,
// and anything else can be made to order:
//
//   new StorytellerAid({
//     id: 'you-are-evil',
//     category: 'standard',
//     color: STORYTELLER_AID_COLORS.red,     // or any CSS color, like '#2b5f3a'
//     picture: STORYTELLER_AID_PICTURES.evilMask, // or a picture of your own
//     text: ['You', 'are', { emphasis: 'evil' }],
//   });
//
// Pictures share one canvas, so a list of them is drawn as one picture, each
// on top of the last: picture: [STORYTELLER_AID_PICTURES.spiral,
// STORYTELLER_AID_PICTURES.handprint].
//
// The text is shown in capitals however it's written, so write it the way
// it reads aloud.
//
// The category says where the aid is listed when the storyteller chooses
// which aids to load, from STORYTELLER_AID_CATEGORIES below.

// The kinds of aid, in the order they're listed: the standard aids, which
// suit any game, then the ones for a particular character. Each has the
// heading it's listed under, and whether its aids start out loaded, before
// the storyteller loads or unloads any. The character aids start out
// unloaded, since most games have no use for them. A new category only
// needs a line here.
export const STORYTELLER_AID_CATEGORIES = {
  standard: { title: 'Standard', startsLoaded: true },
  character: { title: 'Character', startsLoaded: false },
} as const;

export type StorytellerAidCategory = keyof typeof STORYTELLER_AID_CATEGORIES;

// Colors that suit the cards: the official cards' colors, and more in the
// same dark, muted range, so the white words and gold emphasis read on any
// of them. Yellows and ochres are left out, since the gold would sink into
// them. Any other CSS color works as well, and the picture and frame are
// tinted from whichever color the card is.
export const STORYTELLER_AID_COLORS = {
  blue: '#3a3bae',
  navy: '#264572',
  azure: '#1f68bc',
  violet: '#5b3d87',
  red: '#682a2a',
  crimson: '#84253d',
  plum: '#602a44',
  green: '#40704d',
  pine: '#195949',
  olive: '#576031',
  purple: '#8c4a7a',
  sage: '#6e806c',
  teal: '#2e7883',
  slate: '#29616f',
  rust: '#83422f',
  brown: '#6e4327',
  mauve: '#7f6c80',
  grey: '#5f5f63',
} as const;

// A picture is drawn on a 100 x 100 canvas as a list of SVG paths, painted
// in order, so later shapes sit on top of earlier ones. Pictures carry no
// colors of their own: each shape is painted light, a pale tint of the
// card's color, or dark, the card's own color, which carves details like
// eyes and mouths back out of a light shape. That way any picture suits any
// card. The standard pictures are SVG files in assets/storyteller_aids, read
// in by storyteller-aid-pictures.ts, which describes how to draw one.
export interface StorytellerAidPicture {
  readonly shapes: readonly StorytellerAidShape[];
}

export interface StorytellerAidShape {
  readonly d: string; // SVG path data
  readonly paint: 'light' | 'dark';
  readonly line?: boolean; // traced as a line rather than filled in
  readonly width?: number; // a line's thickness, 1.5 when left out
}

// Some of the card's words. Emphasized words are the ones the card is about,
// set larger and in gold, like "evil" in "You are evil".
export type StorytellerAidWords = string | { readonly emphasis: string };

// One line of the card's text: its words, or a list of them when only some
// of the line is emphasized, like ['are', { emphasis: 'not' }]
export type StorytellerAidLine = StorytellerAidWords | readonly StorytellerAidWords[];

export class StorytellerAid {
  readonly id: string;
  readonly category: StorytellerAidCategory;
  readonly color: string;
  readonly picture: StorytellerAidPicture;
  // Each line as its words, in order, emphasized or not
  readonly lines: readonly (readonly { readonly text: string; readonly emphasis: boolean }[])[];

  constructor(config: {
    id: string;
    category: StorytellerAidCategory;
    color: string;
    picture: StorytellerAidPicture | readonly StorytellerAidPicture[];
    text: readonly StorytellerAidLine[];
  }) {
    this.id = config.id;
    this.category = config.category;
    this.color = config.color;
    this.picture = 'shapes' in config.picture
      ? config.picture
      : { shapes: config.picture.flatMap(picture => picture.shapes) };
    this.lines = config.text.map(line =>
      (typeof line === 'string' || 'emphasis' in line ? [line] : line).map(words =>
        typeof words === 'string' ? { text: words, emphasis: false } : { text: words.emphasis, emphasis: true },
      ),
    );
  }

  // The card's words as one sentence, e.g. "You are evil"
  get sentence(): string {
    return this.lines.flat().map(words => words.text).join(' ');
  }
}
