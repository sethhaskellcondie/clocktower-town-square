import { PlayerAid } from './player-aid';
import { PlayerAidSection } from './player-aid-section';
import { PlayerAidGroup } from './player-aid-group';
import { ALL_GROUP, INTRODUCTION_GROUP, LEARNING_GROUP, VETERAN_GROUP } from './player-aid-groups';

// The first group is the one the shelf opens on
const SHELF_GROUPS: PlayerAidGroup[] = [ALL_GROUP, INTRODUCTION_GROUP, LEARNING_GROUP, VETERAN_GROUP];

// Holds the shelf's groups and everything about its state: whether it's
// open, which group is picked, which sections are expanded, and which aid
// is being viewed
export class PlayerAidShelf {
  open = false;
  // The group whose sections the shelf is showing
  activeGroup: PlayerAidGroup;
  // Whether the dropdown for picking a group is showing
  groupMenuOpen = false;
  activeAid: PlayerAid | null = null;
  // The section the active aid was opened from, since an aid can be in several
  activeSection: PlayerAidSection | null = null;
  // Sections start collapsed. Only one is open at a time, so this holds the
  // ids of the open section and the sections it's nested in.
  private expandedSections = new Set<string>();

  constructor(readonly groups: readonly PlayerAidGroup[] = SHELF_GROUPS) {
    this.activeGroup = groups[0];
  }

  get sections(): readonly PlayerAidSection[] {
    return this.activeGroup.sections;
  }

  toggle(): void {
    if (this.open) {
      this.close();
    } else {
      this.open = true;
    }
  }

  // Closing the shelf closes the group dropdown with it, so the shelf
  // reopens with only the group header showing
  close(): void {
    this.open = false;
    this.groupMenuOpen = false;
  }

  toggleGroupMenu(): void {
    this.groupMenuOpen = !this.groupMenuOpen;
  }

  isActiveGroup(group: PlayerAidGroup): boolean {
    return this.activeGroup === group;
  }

  // Picking a group closes the dropdown. Switching groups starts its
  // sections collapsed.
  selectGroup(group: PlayerAidGroup): void {
    this.groupMenuOpen = false;
    if (!this.isActiveGroup(group)) {
      this.activeGroup = group;
      this.expandedSections.clear();
    }
  }

  isExpanded(section: PlayerAidSection): boolean {
    return this.expandedSections.has(section.id);
  }

  // Opening a section closes every other one, apart from the sections it's
  // nested in; closing a section closes the sections nested in it too
  toggleSection(section: PlayerAidSection): void {
    if (this.isExpanded(section)) {
      section.withDescendants().forEach(s => this.expandedSections.delete(s.id));
    } else {
      this.expandedSections = new Set(this.pathTo(section, this.sections).map(s => s.id));
    }
  }

  // The chain of sections from the top of the shelf down to the given one
  private pathTo(target: PlayerAidSection, sections: readonly PlayerAidSection[]): PlayerAidSection[] {
    for (const section of sections) {
      if (section === target) {
        return [section];
      }
      const path = this.pathTo(target, section.subsections);
      if (path.length) {
        return [section, ...path];
      }
    }
    return [];
  }

  openAid(aid: PlayerAid, section: PlayerAidSection): void {
    this.activeAid = aid;
    this.activeSection = section;
  }

  // Open an aid from outside the shelf (e.g. a traveler icon on the board),
  // browsing within the first section that lists it. The picked group is
  // searched first, then the others, so the aid opens even when the picked
  // group leaves it out.
  show(aid: PlayerAid): void {
    const section = [this.activeGroup, ...this.groups]
      .flatMap(group => group.allSections())
      .find(s => s.aids.includes(aid));
    this.activeAid = aid;
    this.activeSection = section ?? null;
  }

  // Position of the active aid within the section it was opened from
  private get activeIndex(): number {
    return this.activeAid && this.activeSection ? this.activeSection.aids.indexOf(this.activeAid) : -1;
  }

  // The arrows only show when the section has other aids to step to
  get canBrowse(): boolean {
    return (this.activeSection?.aids.length ?? 0) > 1;
  }

  get hasPrevious(): boolean {
    return this.activeIndex > 0;
  }

  get hasNext(): boolean {
    const index = this.activeIndex;
    return index >= 0 && index < this.activeSection!.aids.length - 1;
  }

  showPrevious(): void {
    if (this.hasPrevious) {
      this.activeAid = this.activeSection!.aids[this.activeIndex - 1];
    }
  }

  showNext(): void {
    if (this.hasNext) {
      this.activeAid = this.activeSection!.aids[this.activeIndex + 1];
    }
  }

  closeAid(): void {
    this.activeAid = null;
    this.activeSection = null;
  }

  // Peel back one layer at a time: the open aid first, then the group
  // dropdown, then the shelf
  back(): void {
    if (this.activeAid) {
      this.closeAid();
    } else if (this.groupMenuOpen) {
      this.groupMenuOpen = false;
    } else if (this.open) {
      this.close();
    }
  }
}
