import { Character } from '../character-sheets/character';
import { NightOrderStep } from '../player-aids/player-aid';

// The order the Storyteller works through each night, written out once for
// the first night and once for every night after it
export interface NightOrder {
  firstNight: readonly NightOrderStep[];
  otherNights: readonly NightOrderStep[];
}

// A script is the set of characters a game is played with. Base scripts are
// the official ones; any other script is a custom one. Picking a script on
// the character sheet shows only its characters, and the travelers offered
// on the board follow it too. A script only references its characters, so
// the same character can sit in several scripts.
export class Script {
  readonly id: string;
  readonly name: string;
  readonly author?: string; // who wrote the script, if known
  readonly base: boolean;
  readonly teensyville: boolean; // made for a small game of 5 or 6 players
  readonly reference: boolean; // a collection to look characters up in, rather than one a game is played on
  readonly characters: readonly Character[];
  readonly nightOrder?: NightOrder; // linked beneath the characters on the sheet, if the script has one

  constructor(config: { id: string; name: string; author?: string; base: boolean; teensyville: boolean; reference: boolean; characters?: Character[]; nightOrder?: NightOrder }) {
    this.id = config.id;
    this.name = config.name;
    this.author = config.author;
    this.base = config.base;
    this.teensyville = config.teensyville;
    this.reference = config.reference;
    this.characters = config.characters ?? [];
    this.nightOrder = config.nightOrder;
  }
}
