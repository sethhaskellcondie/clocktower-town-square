// A special rule for when two characters are on the same script, which the
// Djinn lets everyone know
export interface Jinx {
  characters: readonly [Character, Character];
  rule: string;
}

// A character as it's listed on a character sheet: its icon, its type, the
// ability printed beside it, and a link to read more about it
export class Character {
  readonly id: string;
  readonly name: string;
  readonly icon: string;
  readonly type: string; // e.g. Townsfolk, Outsider, Minion, Demon, Traveler, Fabled, Loric
  readonly ability: string;
  readonly additionalText?: string; // extra notes shown beneath the ability
  readonly link: string; // where to read more, e.g. the character's wiki page
  readonly experimental: boolean; // released as experimental rather than in a base script
  readonly jinxes?: readonly Jinx[]; // the jinxes of a script, held by that script's Djinn

  constructor(config: {
    id: string;
    name: string;
    icon: string;
    type: string;
    ability: string;
    additionalText?: string;
    link: string;
    experimental?: boolean;
    jinxes?: Jinx[];
  }) {
    this.id = config.id;
    this.name = config.name;
    this.icon = config.icon;
    this.type = config.type;
    this.ability = config.ability;
    this.additionalText = config.additionalText;
    this.link = config.link;
    this.experimental = config.experimental ?? false;
    this.jinxes = config.jinxes;
  }
}
