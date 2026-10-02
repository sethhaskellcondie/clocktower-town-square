import { PlayerAid } from './player-aid';

// Sections group aids on the shelf, and can nest subsections of their own.
// A section only references its aids, so the same aid can sit in several.
export class PlayerAidSection {
  readonly id: string;
  readonly title: string;
  readonly aids: readonly PlayerAid[];
  readonly subsections: readonly PlayerAidSection[];

  constructor(config: { id: string; title: string; aids?: PlayerAid[]; subsections?: PlayerAidSection[] }) {
    this.id = config.id;
    this.title = config.title;
    this.aids = config.aids ?? [];
    this.subsections = config.subsections ?? [];
  }

  // A section counts as empty only when neither it nor any of its
  // subsections hold an aid
  isEmpty(): boolean {
    return this.aids.length === 0 && this.subsections.every(sub => sub.isEmpty());
  }

  // This section followed by every section nested under it
  withDescendants(): PlayerAidSection[] {
    return [this, ...this.subsections.flatMap(sub => sub.withDescendants())];
  }
}
