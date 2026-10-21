import { Script } from './script';
import { BAD_MOON_RISING_CHARACTERS, SECTS_AND_VIOLETS_CHARACTERS, TROUBLE_BREWING_CHARACTERS } from '../character-sheets/character-library';
import {
  CHARACTER_FAQ,
  CHARACTER_FAQ_BMR,
  CHARACTER_FAQ_SNV,
  FABLED,
  FIRST_DAY,
  FIRST_NIGHT,
  INTRODUCTION,
  LORIC,
  STORYTELLER_TIPS,
  TIPS,
  TRAVELER,
  TRAVELER_BMR,
  TRAVELER_EXPERIMENTAL,
  TRAVELER_SNV,
} from '../player-aids/player-aid-sections';

// Every script, each created once, along with the player aid sections the
// shelf shows while it's picked. Their characters are filled in as the
// character sheets are digitized.

// Every character and section, so a game on any script can find what it
// needs. It isn't one of the official scripts, so it counts as a custom one.
export const ALL_SCRIPT = new Script({
  id: 'all',
  name: 'All',
  base: false,
  characters: [...TROUBLE_BREWING_CHARACTERS, ...BAD_MOON_RISING_CHARACTERS, ...SECTS_AND_VIOLETS_CHARACTERS],
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

export const TROUBLE_BREWING = new Script({
  id: 'trouble-brewing',
  name: 'Trouble Brewing',
  base: true,
  characters: [...TROUBLE_BREWING_CHARACTERS],
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

export const BAD_MOON_RISING = new Script({
  id: 'bad-moon-rising',
  name: 'Bad Moon Rising',
  base: true,
  characters: [...BAD_MOON_RISING_CHARACTERS],
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

export const SECTS_AND_VIOLETS = new Script({
  id: 'sects-and-violets',
  name: 'Sects & Violets',
  base: true,
  characters: [...SECTS_AND_VIOLETS_CHARACTERS],
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
