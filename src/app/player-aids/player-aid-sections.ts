import { PlayerAidSection } from './player-aid-section';
import {
  ATTRACT_MODE_HOTKEYS,
  BUTLER_VOTING,
  CHARACTER_SHEET,
  CHEF_PAIRS,
  CLOCKTOWER_WIKI,
  DAY_AND_NIGHT,
  DAY_TIMER_HOTKEYS,
  DEATH_IS_NOT_THE_END,
  DEMON_FIRST_NIGHT,
  DRUNK_AND_POISONED,
  GETTING_STARTED,
  GOOD_TEAM_FIRST_NIGHT,
  GOOD_VS_EVIL,
  HAND_SIGNALS,
  HOW_TO_PLAY_VIDEO,
  MINIONS_FIRST_NIGHT,
  NOMINATIONS,
  PLAYER_AID_HOTKEYS,
  PLAYER_TRAITS,
  SOCIAL_DEDUCTION,
  SPY_GRIMOIRE,
  THE_FOUR_RULES,
  THE_SETTING,
  TOWN_SQUARE,
  UNDERTAKER_EXECUTIONS,
} from './player-aid-library';

// Which aids appear in which section of the shelf. An aid from the library
// can be listed in as many sections as it's useful in.
export const TUTORIAL = new PlayerAidSection({
  id: 'tutorial',
  title: 'Tutorial',
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

export const STORYTELLER_TIPS = new PlayerAidSection({
  id: 'storyteller-tips',
  title: 'Storyteller Tips',
  aids: [ATTRACT_MODE_HOTKEYS, DAY_TIMER_HOTKEYS, PLAYER_AID_HOTKEYS],
});
