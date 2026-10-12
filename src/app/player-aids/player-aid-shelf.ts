import { PlayerAid } from './player-aid';
import { PlayerAidScript } from './player-aid-script';
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
const INTRODUCTION = new PlayerAidSection({
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
});

const FIRST_NIGHT = new PlayerAidSection({
  id: 'first-night',
  title: 'The First Night',
  aids: [MINIONS_FIRST_NIGHT, DEMON_FIRST_NIGHT, GOOD_TEAM_FIRST_NIGHT],
});

const FIRST_DAY = new PlayerAidSection({
  id: 'first-day',
  title: 'The First Day',
  aids: [GETTING_STARTED, NOMINATIONS, DEATH_IS_NOT_THE_END, TOWN_SQUARE],
});

const CHARACTER_FAQ = new PlayerAidSection({
  id: 'character-faq',
  title: 'Character FAQ',
  aids: [UNDERTAKER_EXECUTIONS, CHEF_PAIRS, BUTLER_VOTING, SPY_GRIMOIRE],
});

const TIPS = new PlayerAidSection({
  id: 'tips',
  title: 'Tips',
  aids: [HOW_TO_PLAY_VIDEO, CLOCKTOWER_WIKI, CHARACTER_SHEET],
});

const TRAVELER = new PlayerAidSection({
  id: 'traveler',
  title: 'Traveler',
  aids: [SCAPEGOAT_EXECUTION, GUNSLINGER_SHOT, BEGGAR_VOTING, BUREAUCRAT_VOTES, THIEF_VOTES],
});

const FABLED = new PlayerAidSection({
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
});

const STORYTELLER_TIPS = new PlayerAidSection({
  id: 'storyteller-tips',
  title: 'Storyteller Tips',
  aids: [ATTRACT_MODE_HOTKEYS, DAY_TIMER_HOTKEYS, PLAYER_AID_HOTKEYS],
});

// Which sections appear in which script. A section can be listed in as many
// scripts as it's useful in. The first script is the one the shelf opens on.
const SHELF_SCRIPTS: PlayerAidScript[] = [
  new PlayerAidScript({
    id: 'all',
    title: 'All',
    sections: [
      INTRODUCTION,
      FIRST_NIGHT,
      FIRST_DAY,
      CHARACTER_FAQ,
      TIPS,
      TRAVELER,
      FABLED,
      // Last, since it's for the storyteller rather than the players
      STORYTELLER_TIPS,
    ],
  }),
  new PlayerAidScript({
    id: 'trouble-brewing',
    title: 'Trouble Brewing',
  }),
];

// Holds the shelf's scripts and everything about its state: whether it's
// open, which script is picked, which sections are expanded, and which aid
// is being viewed
export class PlayerAidShelf {
  open = false;
  // The script whose sections the shelf is showing
  activeScript: PlayerAidScript;
  activeAid: PlayerAid | null = null;
  // The section the active aid was opened from, since an aid can be in several
  activeSection: PlayerAidSection | null = null;
  // Sections start collapsed. Only one is open at a time, so this holds the
  // ids of the open section and the sections it's nested in.
  private expandedSections = new Set<string>();

  constructor(readonly scripts: readonly PlayerAidScript[] = SHELF_SCRIPTS) {
    this.activeScript = scripts[0];
  }

  get sections(): readonly PlayerAidSection[] {
    return this.activeScript.sections;
  }

  toggle(): void {
    this.open = !this.open;
  }

  isActiveScript(script: PlayerAidScript): boolean {
    return this.activeScript === script;
  }

  // Switching scripts starts its sections collapsed
  selectScript(script: PlayerAidScript): void {
    if (!this.isActiveScript(script)) {
      this.activeScript = script;
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
  // browsing within the first section that lists it. The picked script is
  // searched first, then the others, so the aid opens even when the picked
  // script leaves it out.
  show(aid: PlayerAid): void {
    const section = [this.activeScript, ...this.scripts]
      .flatMap(script => script.allSections())
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
