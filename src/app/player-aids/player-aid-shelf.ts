import { PlayerAid } from './player-aid';
import { PlayerAidScript } from './player-aid-script';
import { PlayerAidSection } from './player-aid-section';
import {
  ANGEL_PROTECTION,
  APPRENTICE_ABILITY,
  ATTRACT_MODE_HOTKEYS,
  BARISTA_SERVICE,
  BEGGAR_VOTING,
  BIG_WIG_NOMINEES,
  BOOTLEGGER_HOMEBREW,
  BISHOP_NOMINATIONS,
  BONE_COLLECTOR_REVIVAL,
  BUDDHIST_SILENCE,
  BUREAUCRAT_VOTES,
  BUTCHER_NOMINATION,
  BUTLER_VOTING,
  CACKLEJACK_CHANGE,
  CHARACTER_SHEET,
  CHEF_PAIRS,
  CLOCKTOWER_WIKI,
  DAY_AND_NIGHT,
  DAY_TIMER_HOTKEYS,
  DEATH_IS_NOT_THE_END,
  DEMON_FIRST_NIGHT,
  DEUS_EX_FIASCO_MISTAKE,
  DEVIANT_EXILE,
  DOOMSAYER_SACRIFICE,
  DRUNK_AND_POISONED,
  FERRYMAN_VOTES,
  FIDDLER_CONTEST,
  GANGSTER_KILL,
  GARDENER_SEATING,
  GETTING_STARTED,
  GNOME_PROTECTION,
  GOOD_TEAM_FIRST_NIGHT,
  GOD_OF_UG_HAT,
  GOOD_VS_EVIL,
  GUNSLINGER_SHOT,
  HAND_SIGNALS,
  HARLOT_VISIT,
  HELLS_LIBRARIAN_SILENCE,
  HINDU_REINCARNATION,
  HOW_TO_PLAY_VIDEO,
  JUDGE_RULING,
  KNAVES_STORYTELLERS,
  MATRON_SEATING,
  MINIONS_FIRST_NIGHT,
  MOONCHILD_DEATH,
  NOMINATIONS,
  PLAYER_AID_HOTKEYS,
  PLAYER_TRAITS,
  POPE_DUPLICATES,
  REVOLUTIONARY_NEIGHBORS,
  SCAPEGOAT_EXECUTION,
  SOCIAL_DEDUCTION,
  SPY_GRIMOIRE,
  STORM_CATCHER_PROTECTION,
  THE_FOUR_RULES,
  THE_SETTING,
  THIEF_VOTES,
  TOR_HIDDEN_CHARACTERS,
  TOWN_SQUARE,
  UNDERTAKER_EXECUTIONS,
  VENTRILOQUIST_NOMINATIONS,
  VOUDON_VOTING,
  ZENOMANCER_GOALS,
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
  title: 'Character FAQ (TB)',
  aids: [UNDERTAKER_EXECUTIONS, CHEF_PAIRS, BUTLER_VOTING, SPY_GRIMOIRE],
});

const TIPS = new PlayerAidSection({
  id: 'tips',
  title: 'Tips',
  aids: [HOW_TO_PLAY_VIDEO, CLOCKTOWER_WIKI, CHARACTER_SHEET],
});

const TRAVELER = new PlayerAidSection({
  id: 'traveler',
  title: 'Travelers (TB)',
  aids: [SCAPEGOAT_EXECUTION, GUNSLINGER_SHOT, BEGGAR_VOTING, BUREAUCRAT_VOTES, THIEF_VOTES],
});

const CHARACTER_FAQ_BMR = new PlayerAidSection({
  id: 'character-faq-bmr',
  title: 'Character FAQ (BMR)',
  aids: [MOONCHILD_DEATH],
});

const TRAVELER_BMR = new PlayerAidSection({
  id: 'traveler-bmr',
  title: 'Travelers (BMR)',
  aids: [APPRENTICE_ABILITY, MATRON_SEATING, VOUDON_VOTING, JUDGE_RULING, BISHOP_NOMINATIONS],
});

const CHARACTER_FAQ_SNV = new PlayerAidSection({
  id: 'character-faq-snv',
  title: 'Character FAQ (S&V)',
});

const TRAVELER_SNV = new PlayerAidSection({
  id: 'traveler-snv',
  title: 'Travelers (S&V)',
  aids: [BARISTA_SERVICE, HARLOT_VISIT, BUTCHER_NOMINATION, BONE_COLLECTOR_REVIVAL, DEVIANT_EXILE],
});

const TRAVELER_EXPERIMENTAL = new PlayerAidSection({
  id: 'traveler-experimental',
  title: 'Travelers (Experimental)',
  aids: [GANGSTER_KILL, GNOME_PROTECTION, CACKLEJACK_CHANGE],
});

const FABLED = new PlayerAidSection({
  id: 'fabled',
  title: 'Fabled',
  aids: [
    ANGEL_PROTECTION,
    BUDDHIST_SILENCE,
    DEUS_EX_FIASCO_MISTAKE,
    DOOMSAYER_SACRIFICE,
    FERRYMAN_VOTES,
    FIDDLER_CONTEST,
    HELLS_LIBRARIAN_SILENCE,
    REVOLUTIONARY_NEIGHBORS,
  ],
});

const LORIC = new PlayerAidSection({
  id: 'loric',
  title: 'Loric',
  aids: [
    BIG_WIG_NOMINEES,
    BOOTLEGGER_HOMEBREW,
    GARDENER_SEATING,
    GOD_OF_UG_HAT,
    HINDU_REINCARNATION,
    KNAVES_STORYTELLERS,
    POPE_DUPLICATES,
    STORM_CATCHER_PROTECTION,
    TOR_HIDDEN_CHARACTERS,
    VENTRILOQUIST_NOMINATIONS,
    ZENOMANCER_GOALS,
  ],
});

const STORYTELLER_TIPS = new PlayerAidSection({
  id: 'storyteller-tips',
  title: 'Storyteller Tips',
  aids: [ATTRACT_MODE_HOTKEYS, DAY_TIMER_HOTKEYS, PLAYER_AID_HOTKEYS],
});

// Which sections appear in which script. A section can be listed in as many
// scripts as it's useful in. Scripts are exported so travelers can say which
// scripts they're in.
export const ALL_SCRIPT = new PlayerAidScript({
  id: 'all',
  title: 'All',
  sections: [
    INTRODUCTION,
    FIRST_NIGHT,
    FIRST_DAY,
    TIPS,
    CHARACTER_FAQ,
    CHARACTER_FAQ_BMR,
    CHARACTER_FAQ_SNV,
    TRAVELER,
    TRAVELER_BMR,
    TRAVELER_SNV,
    TRAVELER_EXPERIMENTAL,
    FABLED,
    LORIC,
    // Last, since it's for the storyteller rather than the players
    STORYTELLER_TIPS,
  ],
});

export const TROUBLE_BREWING = new PlayerAidScript({
  id: 'trouble-brewing',
  title: 'Trouble Brewing',
  sections: [
    INTRODUCTION,
    FIRST_NIGHT,
    FIRST_DAY,
    TIPS,
    CHARACTER_FAQ,
    TRAVELER,
    FABLED,
    LORIC,
    // Last, since it's for the storyteller rather than the players
    STORYTELLER_TIPS,
  ],
});

export const BAD_MOON_RISING = new PlayerAidScript({
  id: 'bad-moon-rising',
  title: 'Bad Moon Rising',
  sections: [
    TIPS,
    CHARACTER_FAQ_BMR,
    TRAVELER_BMR,
    FABLED,
    LORIC,
    // Last, since it's for the storyteller rather than the players
    STORYTELLER_TIPS,
  ],
});

export const SECTS_AND_VIOLETS = new PlayerAidScript({
  id: 'sects-and-violets',
  title: 'Sects & Violets',
  sections: [
    TIPS,
    CHARACTER_FAQ_SNV,
    TRAVELER_SNV,
    FABLED,
    LORIC,
    // Last, since it's for the storyteller rather than the players
    STORYTELLER_TIPS,
  ],
});

// The first script is the one the shelf opens on
const SHELF_SCRIPTS: PlayerAidScript[] = [ALL_SCRIPT, TROUBLE_BREWING, BAD_MOON_RISING, SECTS_AND_VIOLETS];

// Holds the shelf's scripts and everything about its state: whether it's
// open, which script is picked, which sections are expanded, and which aid
// is being viewed
export class PlayerAidShelf {
  open = false;
  // The script whose sections the shelf is showing
  activeScript: PlayerAidScript;
  // Whether the dropdown for picking a script is showing
  scriptMenuOpen = false;
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
    if (this.open) {
      this.close();
    } else {
      this.open = true;
    }
  }

  // Closing the shelf closes the script dropdown with it, so the shelf
  // reopens with only the script header showing
  close(): void {
    this.open = false;
    this.scriptMenuOpen = false;
  }

  toggleScriptMenu(): void {
    this.scriptMenuOpen = !this.scriptMenuOpen;
  }

  isActiveScript(script: PlayerAidScript): boolean {
    return this.activeScript === script;
  }

  // Picking a script closes the dropdown. Switching scripts starts its
  // sections collapsed.
  selectScript(script: PlayerAidScript): void {
    this.scriptMenuOpen = false;
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

  // Peel back one layer at a time: the open aid first, then the script
  // dropdown, then the shelf
  back(): void {
    if (this.activeAid) {
      this.closeAid();
    } else if (this.scriptMenuOpen) {
      this.scriptMenuOpen = false;
    } else if (this.open) {
      this.close();
    }
  }
}
