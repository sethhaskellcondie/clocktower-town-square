import { PlayerAidSection } from './player-aid-section';
import {
  ATTRACT_MODE_HOTKEYS,
  CHARACTER_SHEET,
  CLOCKTOWER_WIKI,
  DAY_AND_NIGHT,
  DAY_TIMER_HOTKEYS,
  DEATH_IS_NOT_THE_END,
  DEMON_FIRST_NIGHT,
  DRUNK_AND_POISONED,
  FIVE_TO_SIX_PLAYERS,
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
  TEENSYVILLE_CHANGES,
  TEENSYVILLE_SCRIPTS,
  THE_FOUR_RULES,
  THE_SETTING,
  TOWN_SQUARE,
} from './player-aid-library';

// Which aids appear in which section of the shelf. An aid from the library
// can be listed in as many sections as it's useful in.
export const RULES = new PlayerAidSection({
  id: 'rules',
  title: 'Rules',
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
  aids: [GETTING_STARTED, NOMINATIONS, DEATH_IS_NOT_THE_END],
});

export const TIPS = new PlayerAidSection({
  id: 'tips',
  title: 'Tips',
  aids: [TOWN_SQUARE, HOW_TO_PLAY_VIDEO, CLOCKTOWER_WIKI, CHARACTER_SHEET],
});

export const TEENSYVILLE = new PlayerAidSection({
  id: 'teensyville',
  title: 'Teensyville',
  aids: [FIVE_TO_SIX_PLAYERS, TEENSYVILLE_CHANGES, TEENSYVILLE_SCRIPTS],
});

export const HOW_TO_USE_THIS_SITE = new PlayerAidSection({
  id: 'how-to-use-this-site',
  title: 'How to Use This Site',
  aids: [ATTRACT_MODE_HOTKEYS, DAY_TIMER_HOTKEYS, PLAYER_AID_HOTKEYS],
});
