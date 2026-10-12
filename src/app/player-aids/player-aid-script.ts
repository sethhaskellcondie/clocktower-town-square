import { PlayerAidSection } from './player-aid-section';

// A script picks which sections the shelf shows, so the shelf only holds
// what's useful for the game being played. A script only references its
// sections, so the same section can sit in several scripts.
export class PlayerAidScript {
  readonly id: string;
  readonly title: string;
  readonly sections: readonly PlayerAidSection[];

  constructor(config: { id: string; title: string; sections?: PlayerAidSection[] }) {
    this.id = config.id;
    this.title = config.title;
    this.sections = config.sections ?? [];
  }

  // Every section in the script, including the ones nested in others
  allSections(): PlayerAidSection[] {
    return this.sections.flatMap(section => section.withDescendants());
  }
}
