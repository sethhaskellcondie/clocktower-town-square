import { PlayerAidGroup } from './player-aid-group';
import {
  FIRST_DAY,
  FIRST_NIGHT,
  HOW_TO_USE_THIS_SITE,
  TEENSYVILLE,
  TIPS,
  RULES,
} from './player-aid-sections';

// Every group, each created once, along with the sections the shelf shows
// while it's picked. The groups other than All are filled in as the
// sections are sorted into them.

// Every section, so any aid can be found from the shelf
export const ALL_GROUP = new PlayerAidGroup({
  id: 'all',
  name: 'All',
  sections: [
    RULES,
    FIRST_NIGHT,
    FIRST_DAY,
    TIPS,
    TEENSYVILLE,
    // Last, since it's about the site rather than the game
    HOW_TO_USE_THIS_SITE,
  ],
});

export const INTRODUCTION_GROUP = new PlayerAidGroup({
  id: 'introduction',
  name: 'Introduction',
  sections: [RULES, FIRST_NIGHT, FIRST_DAY, TIPS, TEENSYVILLE],
});

export const ADVANCED_GROUP = new PlayerAidGroup({
  id: 'advanced',
  name: 'Advanced',
});
