import { Script } from '../scripts/script';
import { PlayerAidSection } from './player-aid-section';

// A script picks which sections the shelf shows, so the shelf only holds
// what's useful for the game being played. A script only references its
// sections, so the same section can sit in several scripts. Each is titled
// after the script it's for, apart from "All", which isn't one script and so
// gives a title of its own.
export class PlayerAidScript {
  readonly id: string;
  readonly script: Script | null;
  readonly title: string;
  readonly sections: readonly PlayerAidSection[];

  constructor(config: { id: string; sections?: PlayerAidSection[] } & ({ script: Script } | { title: string })) {
    this.id = config.id;
    this.script = 'script' in config ? config.script : null;
    this.title = 'script' in config ? config.script.name : config.title;
    this.sections = config.sections ?? [];
  }

  // Every section in the script, including the ones nested in others
  allSections(): PlayerAidSection[] {
    return this.sections.flatMap(section => section.withDescendants());
  }
}
