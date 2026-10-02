import { PlayerAid } from './player-aid';
import { PlayerAidSection } from './player-aid-section';
import {
  ANGEL_PROTECTION,
  BEGGAR_VOTING,
  BUDDHIST_SILENCE,
  BUREAUCRAT_VOTES,
  BUTLER_VOTING,
  CHARACTER_SHEET,
  CHEF_PAIRS,
  CLOCKTOWER_WIKI,
  DEMON_FIRST_NIGHT,
  DOOMSAYER_SACRIFICE,
  FIDDLER_CONTEST,
  GOOD_VS_EVIL,
  GUNSLINGER_SHOT,
  HELLS_LIBRARIAN_SILENCE,
  HOW_TO_PLAY_VIDEO,
  MAYOR_ABILITY,
  MINIONS_FIRST_NIGHT,
  PLAYER_STATES,
  PLAYER_TRAITS,
  REVOLUTIONARY_NEIGHBORS,
  SCAPEGOAT_EXECUTION,
  SPY_GRIMOIRE,
  THIEF_VOTES,
  TOWN_SQUARE,
  UNDERTAKER_EXECUTIONS,
} from './player-aid-library';

// Which aids appear in which section of the shelf. An aid from the library
// can be listed in as many sections as it's useful in.
const SHELF_SECTIONS: PlayerAidSection[] = [
  new PlayerAidSection({
    id: 'tutorial',
    title: 'Tutorial',
    aids: [
      HOW_TO_PLAY_VIDEO,
      GOOD_VS_EVIL,
      PLAYER_TRAITS,
      PLAYER_STATES,
      DEMON_FIRST_NIGHT,
      MINIONS_FIRST_NIGHT,
    ],
  }),
  new PlayerAidSection({
    id: 'character-faq',
    title: 'Character FAQ',
    aids: [UNDERTAKER_EXECUTIONS, CHEF_PAIRS, MAYOR_ABILITY, BUTLER_VOTING, SPY_GRIMOIRE],
  }),
  new PlayerAidSection({
    id: 'tips',
    title: 'Tips',
    aids: [CLOCKTOWER_WIKI, CHARACTER_SHEET, TOWN_SQUARE],
  }),
  new PlayerAidSection({
    id: 'traveler',
    title: 'Traveler',
    aids: [SCAPEGOAT_EXECUTION, GUNSLINGER_SHOT, BEGGAR_VOTING, BUREAUCRAT_VOTES, THIEF_VOTES],
  }),
  new PlayerAidSection({
    id: 'fabled',
    title: 'Fabled',
    aids: [
      ANGEL_PROTECTION,
      BUDDHIST_SILENCE,
      DOOMSAYER_SACRIFICE,
      FIDDLER_CONTEST,
      HELLS_LIBRARIAN_SILENCE,
      REVOLUTIONARY_NEIGHBORS,
    ],
  }),
];

// Holds the shelf's sections and everything about its state: whether it's
// open, which sections are expanded, and which aid is being viewed
export class PlayerAidShelf {
  open = false;
  activeAid: PlayerAid | null = null;
  // The section the active aid was opened from, since an aid can be in several
  activeSection: PlayerAidSection | null = null;
  // Sections start collapsed; ids of the ones the user has opened
  private expandedSections = new Set<string>();

  constructor(readonly sections: readonly PlayerAidSection[] = SHELF_SECTIONS) {}

  toggle(): void {
    this.open = !this.open;
  }

  isExpanded(section: PlayerAidSection): boolean {
    return this.expandedSections.has(section.id);
  }

  toggleSection(section: PlayerAidSection): void {
    if (!this.expandedSections.delete(section.id)) {
      this.expandedSections.add(section.id);
    }
  }

  showAll(): void {
    this.expandedSections = new Set(this.sections.flatMap(section => section.withDescendants()).map(section => section.id));
  }

  hideAll(): void {
    this.expandedSections.clear();
  }

  openAid(aid: PlayerAid, section: PlayerAidSection): void {
    this.activeAid = aid;
    this.activeSection = section;
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

  // Peel back one layer at a time: the open aid first, then the shelf
  back(): void {
    if (this.activeAid) {
      this.closeAid();
    } else if (this.open) {
      this.open = false;
    }
  }
}
