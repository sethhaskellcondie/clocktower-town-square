import { PlayerAid } from './player-aid';
import { PlayerAidSection } from './player-aid-section';
import {
  ANGEL_PROTECTION,
  ATTRACT_MODE_HOTKEYS,
  BEGGAR_VOTING,
  BUDDHIST_SILENCE,
  BUREAUCRAT_VOTES,
  BUTLER_VOTING,
  CHARACTER_SHEET,
  CHEF_PAIRS,
  CLOCKTOWER_WIKI,
  DAY_AND_NIGHT,
  DAY_TIMER_HOTKEYS,
  DEATH_IS_NOT_THE_END,
  DEMON_FIRST_NIGHT,
  DOOMSAYER_SACRIFICE,
  DRUNK_AND_POISONED,
  FIDDLER_CONTEST,
  GETTING_STARTED,
  GOOD_TEAM_FIRST_NIGHT,
  GOOD_VS_EVIL,
  GUNSLINGER_SHOT,
  HAND_SIGNALS,
  HELLS_LIBRARIAN_SILENCE,
  HOW_TO_PLAY_VIDEO,
  MINIONS_FIRST_NIGHT,
  NOMINATIONS,
  PLAYER_AID_HOTKEYS,
  PLAYER_TRAITS,
  REVOLUTIONARY_NEIGHBORS,
  SCAPEGOAT_EXECUTION,
  SOCIAL_DEDUCTION,
  SPY_GRIMOIRE,
  THE_FOUR_RULES,
  THE_SETTING,
  THIEF_VOTES,
  TOWN_SQUARE,
  UNDERTAKER_EXECUTIONS,
} from './player-aid-library';

// Which aids appear in which section of the shelf. An aid from the library
// can be listed in as many sections as it's useful in.
const SHELF_SECTIONS: PlayerAidSection[] = [
  new PlayerAidSection({
    id: 'introduction',
    title: 'Introduction',
    aids: [
      SOCIAL_DEDUCTION,
      THE_SETTING,
      PLAYER_TRAITS,
      GOOD_VS_EVIL,
      DAY_AND_NIGHT,
      HAND_SIGNALS,
      DRUNK_AND_POISONED,
      THE_FOUR_RULES,
    ],
  }),
  new PlayerAidSection({
    id: 'first-night',
    title: 'The First Night',
    aids: [MINIONS_FIRST_NIGHT, DEMON_FIRST_NIGHT, GOOD_TEAM_FIRST_NIGHT],
  }),
  new PlayerAidSection({
    id: 'first-day',
    title: 'The First Day',
    aids: [GETTING_STARTED, NOMINATIONS, DEATH_IS_NOT_THE_END, TOWN_SQUARE],
  }),
  new PlayerAidSection({
    id: 'character-faq',
    title: 'Character FAQ',
    aids: [UNDERTAKER_EXECUTIONS, CHEF_PAIRS, BUTLER_VOTING, SPY_GRIMOIRE],
  }),
  new PlayerAidSection({
    id: 'tips',
    title: 'Tips',
    aids: [HOW_TO_PLAY_VIDEO, CLOCKTOWER_WIKI, CHARACTER_SHEET],
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
  // Last, since it's for the storyteller rather than the players
  new PlayerAidSection({
    id: 'storyteller-tips',
    title: 'Storyteller Tips',
    aids: [ATTRACT_MODE_HOTKEYS, DAY_TIMER_HOTKEYS, PLAYER_AID_HOTKEYS],
  }),
];

// Holds the shelf's sections and everything about its state: whether it's
// open, which sections are expanded, and which aid is being viewed
export class PlayerAidShelf {
  open = false;
  activeAid: PlayerAid | null = null;
  // The section the active aid was opened from, since an aid can be in several
  activeSection: PlayerAidSection | null = null;
  // Sections start collapsed. Only one is open at a time, so this holds the
  // ids of the open section and the sections it's nested in.
  private expandedSections = new Set<string>();

  constructor(readonly sections: readonly PlayerAidSection[] = SHELF_SECTIONS) {}

  toggle(): void {
    this.open = !this.open;
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
  // browsing within the first section that lists it
  show(aid: PlayerAid): void {
    const section = this.sections
      .flatMap(s => s.withDescendants())
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

  // Peel back one layer at a time: the open aid first, then the shelf
  back(): void {
    if (this.activeAid) {
      this.closeAid();
    } else if (this.open) {
      this.open = false;
    }
  }
}
