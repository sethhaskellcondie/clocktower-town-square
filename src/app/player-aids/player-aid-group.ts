import { PlayerAidSection } from './player-aid-section';

// A group is the set of sections the shelf shows while it's picked, so the
// shelf only holds what's useful for the players reading it. A group only
// references its sections, so the same section can sit in several groups.
export class PlayerAidGroup {
  readonly id: string;
  readonly name: string;
  readonly sections: readonly PlayerAidSection[];

  constructor(config: { id: string; name: string; sections?: PlayerAidSection[] }) {
    this.id = config.id;
    this.name = config.name;
    this.sections = config.sections ?? [];
  }

  // Every section in the group, including the ones nested in others
  allSections(): PlayerAidSection[] {
    return this.sections.flatMap(section => section.withDescendants());
  }
}
