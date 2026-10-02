// A player aid is an ordered list of content blocks, so text and pictures
// can be interleaved however the aid needs to read.
export type PlayerAidBlock =
  | { type: 'heading'; text: string }
  | { type: 'text'; text: string | PlayerAidTextPart[] }
  | { type: 'image'; src: string; alt: string; caption?: string };

// A paragraph can mix plain text with small inline icons, e.g. a character
// icon right after the character's name, and with bold or struck-through
// runs of text
export type PlayerAidTextPart =
  | string
  | { icon: string; alt: string }
  | { text: string; style: 'bold' | 'strike' };

// Each aid is created once in the library and can then be placed in as
// many shelf sections as it's useful in
export class PlayerAid {
  readonly id: string;
  readonly title: string;
  readonly summary?: string; // one-liner shown under the title on the shelf
  readonly blocks: readonly PlayerAidBlock[];

  constructor(config: { id: string; title: string; summary?: string; blocks: PlayerAidBlock[] }) {
    this.id = config.id;
    this.title = config.title;
    this.summary = config.summary;
    this.blocks = config.blocks;
  }
}
