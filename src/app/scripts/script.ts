import { Character } from '../character-sheets/character';
import { PlayerAidSection } from '../player-aids/player-aid-section';

// A script is the set of characters a game is played with. Base scripts are
// the official ones; any other script is a custom one. Picking a script on
// the shelf shows only its player aid sections, so the shelf only holds
// what's useful for the game being played. A script only references its
// sections, so the same section can sit in several scripts.
export class Script {
  readonly id: string;
  readonly name: string;
  readonly base: boolean;
  readonly characters: readonly Character[];
  readonly sections: readonly PlayerAidSection[];

  constructor(config: { id: string; name: string; base: boolean; characters?: Character[]; sections?: PlayerAidSection[] }) {
    this.id = config.id;
    this.name = config.name;
    this.base = config.base;
    this.characters = config.characters ?? [];
    this.sections = config.sections ?? [];
  }

  // Every section in the script, including the ones nested in others
  allSections(): PlayerAidSection[] {
    return this.sections.flatMap(section => section.withDescendants());
  }
}
