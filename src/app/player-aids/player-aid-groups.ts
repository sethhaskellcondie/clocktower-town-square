import { PlayerAidGroup } from './player-aid-group';
import {
  CHARACTER_FAQ,
  FIRST_DAY,
  FIRST_NIGHT,
  STORYTELLER_TIPS,
  TIPS,
  TUTORIAL,
} from './player-aid-sections';

// Every group, each created once, along with the sections the shelf shows
// while it's picked. The groups other than All are filled in as the
// sections are sorted into them.

// Every section, so any aid can be found from the shelf
export const ALL_GROUP = new PlayerAidGroup({
  id: 'all',
  name: 'All',
  sections: [
    TUTORIAL,
    FIRST_NIGHT,
    FIRST_DAY,
    TIPS,
    CHARACTER_FAQ,
    // Last, since it's for the storyteller rather than the players
    STORYTELLER_TIPS,
  ],
});

export const INTRODUCTION_GROUP = new PlayerAidGroup({
  id: 'introduction',
  name: 'Introduction',
});

export const LEARNING_GROUP = new PlayerAidGroup({
  id: 'learning',
  name: 'Learning',
});

export const VETERAN_GROUP = new PlayerAidGroup({
  id: 'veteran',
  name: 'Veteran',
});
