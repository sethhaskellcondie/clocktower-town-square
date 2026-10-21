import { Character } from '../character-sheets/character';

// A script is the set of characters a game is played with. Base scripts are
// the official ones; any other script is a custom one.
export class Script {
  readonly name: string;
  readonly base: boolean;
  readonly characters: readonly Character[];

  constructor(config: { name: string; base?: boolean; characters?: Character[] }) {
    this.name = config.name;
    this.base = config.base ?? false;
    this.characters = config.characters ?? [];
  }
}
