import { Character } from '../character-sheets/character';

// A player aid is an ordered list of content blocks, so text and pictures
// can be interleaved however the aid needs to read.
export type PlayerAidBlock =
  | { type: 'heading'; text: string }
  | { type: 'text'; text: string | PlayerAidTextPart[] }
  | { type: 'list'; items: (string | PlayerAidTextPart[])[]; ordered?: boolean }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'night-order'; steps: readonly NightOrderStep[] };

// A paragraph can mix plain text with small inline icons, e.g. a character
// icon right after the character's name, and with bold or struck-through
// runs of text. A character part shows that character's icon, and clicking
// it opens the character's aid.
export type PlayerAidTextPart =
  | string
  | { icon: string; alt: string }
  | { character: Character }
  | { text: string; style: 'bold' | 'strike' };

// A step of a night in a script's night order, with the Storyteller's
// reminder of what to do: either a character they wake, whose icon opens
// the character's aid, or one of the steps that isn't a character, like
// Dusk and Dawn, with an icon of its own
export type NightOrderStep =
  | { character: Character; reminder: string | PlayerAidTextPart[] }
  | { name: string; icon: string; reminder: string | PlayerAidTextPart[] };

// An example Grimoire, for the characters that get to look inside it
const GRIMOIRE_EXAMPLE: PlayerAidBlock = {
  type: 'image',
  src: 'assets/player_aids/spy_grimoire.jpg',
  alt: 'An open Grimoire with character tokens, reminder tokens, and the first night sheet laid out',
};

// The few characters whose aid shows a picture beneath its notes, by the
// character's id: the Chef's notes walk through an example town square, and
// the Spy and the Widow both look inside the Grimoire
const CHARACTER_PICTURES: Record<string, PlayerAidBlock> = {
  chef: {
    type: 'image',
    src: 'assets/player_aids/pairs_example.png',
    alt: 'A 13 player town square with evil, good, and dead tokens seated around the circle',
  },
  spy: GRIMOIRE_EXAMPLE,
  widow: GRIMOIRE_EXAMPLE,
};

// Each aid is created once in the library and can then be placed in as
// many shelf sections as it's useful in. An aid is either made of blocks, or
// is about a character, which is laid out the same way every time: titled by
// the character's name, with its icon, ability, and notes as the content
// (and, for a few characters, a picture beneath the notes).
export class PlayerAid {
  readonly id: string;
  readonly title: string;
  readonly summary?: string; // one-liner shown under the title on the shelf
  readonly blocks: readonly PlayerAidBlock[];
  readonly character?: Character;

  constructor(
    config:
      | { id: string; title: string; summary?: string; blocks: PlayerAidBlock[] }
      | { character: Character; summary?: string },
  ) {
    if ('character' in config) {
      this.id = config.character.id;
      this.title = config.character.name;
      const picture = CHARACTER_PICTURES[config.character.id];
      this.blocks = picture ? [picture] : [];
      this.character = config.character;
    } else {
      this.id = config.id;
      this.title = config.title;
      this.blocks = config.blocks;
    }
    this.summary = config.summary;
  }
}
