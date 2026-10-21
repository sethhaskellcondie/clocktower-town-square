// A character as it's listed on a character sheet: its icon, its type, the
// ability printed beside it, and a link to read more about it
export class Character {
  readonly id: string;
  readonly name: string;
  readonly icon: string;
  readonly type: string; // e.g. Townsfolk, Outsider, Minion, Demon, Traveler, Fabled
  readonly ability: string;
  readonly additionalText?: string; // extra notes shown beneath the ability
  readonly link: string; // where to read more, e.g. the character's wiki page

  constructor(config: { id: string; name: string; icon: string; type: string; ability: string; additionalText?: string; link: string }) {
    this.id = config.id;
    this.name = config.name;
    this.icon = config.icon;
    this.type = config.type;
    this.ability = config.ability;
    this.additionalText = config.additionalText;
    this.link = config.link;
  }
}
