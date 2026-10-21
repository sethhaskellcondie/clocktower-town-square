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
export const INTRODUCTION = new PlayerAidSection({
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

export const FIRST_NIGHT = new PlayerAidSection({
  id: 'first-night',
  title: 'The First Night',
  aids: [MINIONS_FIRST_NIGHT, DEMON_FIRST_NIGHT, GOOD_TEAM_FIRST_NIGHT],
});

export const FIRST_DAY = new PlayerAidSection({
  id: 'first-day',
  title: 'The First Day',
  aids: [GETTING_STARTED, NOMINATIONS, DEATH_IS_NOT_THE_END, TOWN_SQUARE],
});

export const CHARACTER_FAQ = new PlayerAidSection({
  id: 'character-faq',
  title: 'Character FAQ (TB)',
  aids: [UNDERTAKER_EXECUTIONS, CHEF_PAIRS, BUTLER_VOTING, SPY_GRIMOIRE],
});

export const TIPS = new PlayerAidSection({
  id: 'tips',
  title: 'Tips',
  aids: [HOW_TO_PLAY_VIDEO, CLOCKTOWER_WIKI, CHARACTER_SHEET],
});

export const TRAVELER = new PlayerAidSection({
  id: 'traveler',
  title: 'Travelers (TB)',
  aids: [SCAPEGOAT_EXECUTION, GUNSLINGER_SHOT, BEGGAR_VOTING, BUREAUCRAT_VOTES, THIEF_VOTES],
});

export const CHARACTER_FAQ_BMR = new PlayerAidSection({
  id: 'character-faq-bmr',
  title: 'Character FAQ (BMR)',
  aids: [MOONCHILD_DEATH],
});

export const TRAVELER_BMR = new PlayerAidSection({
  id: 'traveler-bmr',
  title: 'Travelers (BMR)',
  aids: [APPRENTICE_ABILITY, MATRON_SEATING, VOUDON_VOTING, JUDGE_RULING, BISHOP_NOMINATIONS],
});

export const CHARACTER_FAQ_SNV = new PlayerAidSection({
  id: 'character-faq-snv',
  title: 'Character FAQ (S&V)',
});

export const TRAVELER_SNV = new PlayerAidSection({
  id: 'traveler-snv',
  title: 'Travelers (S&V)',
  aids: [BARISTA_SERVICE, HARLOT_VISIT, BUTCHER_NOMINATION, BONE_COLLECTOR_REVIVAL, DEVIANT_EXILE],
});

export const TRAVELER_EXPERIMENTAL = new PlayerAidSection({
  id: 'traveler-experimental',
  title: 'Travelers (Experimental)',
  aids: [GANGSTER_KILL, GNOME_PROTECTION, CACKLEJACK_CHANGE],
});

export const FABLED = new PlayerAidSection({
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

export const LORIC = new PlayerAidSection({
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

export const STORYTELLER_TIPS = new PlayerAidSection({
  id: 'storyteller-tips',
  title: 'Storyteller Tips',
  aids: [ATTRACT_MODE_HOTKEYS, DAY_TIMER_HOTKEYS, PLAYER_AID_HOTKEYS],
});
