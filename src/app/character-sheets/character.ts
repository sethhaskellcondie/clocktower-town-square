// A character as it's listed on a character sheet: its icon, the ability
// printed beside it, and a link to read more about it
export class Character {
  readonly icon: string;
  readonly ability: string;
  readonly additionalText?: string; // extra notes shown beneath the ability
  readonly link: string; // where to read more, e.g. the character's wiki page

  constructor(config: { icon: string; ability: string; additionalText?: string; link: string }) {
    this.icon = config.icon;
    this.ability = config.ability;
    this.additionalText = config.additionalText;
    this.link = config.link;
  }
}
