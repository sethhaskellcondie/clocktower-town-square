import { Script } from './script';
import {
  BAD_MOON_RISING_CHARACTERS,
  EXPERIMENTAL_CHARACTERS,
  FABLED_AND_LORIC_CHARACTERS,
  SECTS_AND_VIOLETS_CHARACTERS,
  TROUBLE_BREWING_CHARACTERS,
} from '../character-sheets/character-library';

// Every script, each created once, along with the characters the character
// sheet shows while it's picked.

// Every character, so a game on any script can find what it needs. It isn't
// one of the official scripts, so it counts as a custom one.
export const ALL_SCRIPT = new Script({
  id: 'all',
  name: 'All',
  base: false,
  characters: [
    ...TROUBLE_BREWING_CHARACTERS,
    ...BAD_MOON_RISING_CHARACTERS,
    ...SECTS_AND_VIOLETS_CHARACTERS,
    ...EXPERIMENTAL_CHARACTERS,
    ...FABLED_AND_LORIC_CHARACTERS,
  ],
});

export const TROUBLE_BREWING = new Script({
  id: 'trouble-brewing',
  name: 'Trouble Brewing',
  base: true,
  characters: [...TROUBLE_BREWING_CHARACTERS],
});

export const BAD_MOON_RISING = new Script({
  id: 'bad-moon-rising',
  name: 'Bad Moon Rising',
  base: true,
  characters: [...BAD_MOON_RISING_CHARACTERS],
});

export const SECTS_AND_VIOLETS = new Script({
  id: 'sects-and-violets',
  name: 'Sects & Violets',
  base: true,
  characters: [...SECTS_AND_VIOLETS_CHARACTERS],
});

// The experimental characters, which aren't in any of the base scripts. They
// aren't an official script of their own either, so it counts as a custom one.
export const EXPERIMENTAL = new Script({
  id: 'experimental',
  name: 'Experimental',
  base: false,
  characters: [...EXPERIMENTAL_CHARACTERS],
});

// The Fabled and Loric, which the Storyteller can add to a game on any
// script. It holds no other types of character, and isn't an official
// script, so it counts as a custom one.
export const FABLED_AND_LORIC = new Script({
  id: 'fabled-and-loric',
  name: 'Fabled and Loric',
  base: false,
  characters: [...FABLED_AND_LORIC_CHARACTERS],
});
