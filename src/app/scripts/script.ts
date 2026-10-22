import { Character } from '../character-sheets/character';

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
  readonly characters: readonly Character[];

  constructor(config: { id: string; name: string; author?: string; base: boolean; teensyville: boolean; characters?: Character[] }) {
    this.id = config.id;
    this.name = config.name;
    this.author = config.author;
    this.base = config.base;
    this.teensyville = config.teensyville;
    this.characters = config.characters ?? [];
  }
}
