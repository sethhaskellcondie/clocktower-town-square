import { Character } from '../character-sheets/character';

// A script is the set of characters a game is played with. Base scripts are
// the official ones; any other script is a custom one. Picking a script on
// the character sheet shows only its characters, and the travelers offered
// on the board follow it too. A script only references its characters, so
// the same character can sit in several scripts.
export class Script {
  readonly id: string;
  readonly name: string;
  readonly base: boolean;
  readonly characters: readonly Character[];

  constructor(config: { id: string; name: string; base: boolean; characters?: Character[] }) {
    this.id = config.id;
    this.name = config.name;
    this.base = config.base;
    this.characters = config.characters ?? [];
  }
}
