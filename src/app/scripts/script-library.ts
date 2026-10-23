import { Script } from './script';
import { Character } from '../character-sheets/character';
import { NightOrderStep } from '../player-aids/player-aid';
import {
  ARTIST,
  BAD_MOON_RISING_CHARACTERS,
  BARON,
  CHAMBERMAID,
  CLOCKMAKER,
  DRUNK,
  EMPATH,
  EXPERIMENTAL_CHARACTERS,
  FABLED_AND_LORIC_CHARACTERS,
  IMP,
  INVESTIGATOR,
  KLUTZ,
  SAGE,
  SCARLET_WOMAN,
  SECTS_AND_VIOLETS_CHARACTERS,
  TROUBLE_BREWING_CHARACTERS,
} from '../character-sheets/character-library';

// Every script, each created once, along with the characters the character
// sheet shows while it's picked.

// A script's PDF fills each type's characters down its left column, then
// down its right, with the left column taking the odd one out, while the
// character sheet fills its two columns a row at a time. Given the characters
// in the order they're read on the PDF, this interleaves each type's two
// columns so every character lands where it sits on the PDF.
function asOnPdf(characters: readonly Character[]): Character[] {
  const types = [...new Set(characters.map(character => character.type))];
  return types.flatMap(type => {
    const ofType = characters.filter(character => character.type === type);
    const left = ofType.slice(0, Math.ceil(ofType.length / 2));
    const right = ofType.slice(left.length);
    return left.flatMap((character, i) => i < right.length ? [character, right[i]] : [character]);
  });
}

// Every character, so a game on any script can find what it needs. It isn't
// one of the official scripts, so it counts as a custom one.
export const ALL_SCRIPT = new Script({
  id: 'all',
  name: 'All',
  base: false,
  teensyville: false,
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
  teensyville: false,
  characters: asOnPdf(TROUBLE_BREWING_CHARACTERS),
});

export const BAD_MOON_RISING = new Script({
  id: 'bad-moon-rising',
  name: 'Bad Moon Rising',
  base: true,
  teensyville: false,
  characters: asOnPdf(BAD_MOON_RISING_CHARACTERS),
});

export const SECTS_AND_VIOLETS = new Script({
  id: 'sects-and-violets',
  name: 'Sects & Violets',
  base: true,
  teensyville: false,
  characters: asOnPdf(SECTS_AND_VIOLETS_CHARACTERS),
});

// The experimental characters, which aren't in any of the base scripts. They
// aren't an official script of their own either, so it counts as a custom one.
export const EXPERIMENTAL = new Script({
  id: 'experimental',
  name: 'Experimental',
  base: false,
  teensyville: false,
  characters: [...EXPERIMENTAL_CHARACTERS],
});

// The Fabled and Loric, which the Storyteller can add to a game on any
// script. It holds no other types of character, and isn't an official
// script, so it counts as a custom one.
export const FABLED_AND_LORIC = new Script({
  id: 'fabled-and-loric',
  name: 'Fabled and Loric',
  base: false,
  teensyville: false,
  characters: [...FABLED_AND_LORIC_CHARACTERS],
});

// Every night starts and ends the same way, whatever the script
const DUSK: NightOrderStep = { name: 'Dusk', icon: 'assets/player_aids/icons/dusk.svg', reminder: 'Start the Night Phase.' };
const DAWN: NightOrderStep = { name: 'Dawn', icon: 'assets/player_aids/icons/dawn.svg', reminder: 'Wait for a few seconds. End the Night Phase.' };

// A custom Teensyville script, in the order its PDF is read
export const NO_GREATER_JOY = new Script({
  id: 'no-greater-joy',
  name: 'No Greater Joy',
  author: 'Steven Medway',
  base: false,
  teensyville: true,
  characters: asOnPdf([
    CLOCKMAKER,
    INVESTIGATOR,
    EMPATH,
    CHAMBERMAID,
    ARTIST,
    SAGE,
    DRUNK,
    KLUTZ,
    SCARLET_WOMAN,
    BARON,
    IMP,
  ]),
  nightOrder: {
    firstNight: [
      DUSK,
      {
        character: INVESTIGATOR,
        reminder: ['Show the Minion character token. Point to both the ', { text: 'MINION', style: 'bold' }, ' and ', { text: 'WRONG', style: 'bold' }, ' players.'],
      },
      { character: EMPATH, reminder: 'Give a finger signal.' },
      { character: CLOCKMAKER, reminder: 'Give a finger signal.' },
      { character: CHAMBERMAID, reminder: 'The Chambermaid chooses 2 living players. Give a finger signal.' },
      DAWN,
    ],
    otherNights: [
      DUSK,
      {
        character: SCARLET_WOMAN,
        reminder: ['If the Scarlet Woman became the Demon today, show them the ', { text: 'YOU ARE', style: 'bold' }, ' token, then the Demon token.'],
      },
      {
        character: IMP,
        reminder: [
          'The Imp chooses a player. • If the Imp chose themselves: Replace 1 alive Minion token with a spare Imp token. Put the old Imp to sleep. Wake the new Imp. Show the ',
          { text: 'YOU ARE', style: 'bold' },
          ' token, then show the Imp token.',
        ],
      },
      { character: SAGE, reminder: 'If the Demon killed the Sage, wake the Sage and point to 2 players, 1 of which is the Demon.' },
      { character: EMPATH, reminder: 'Give a finger signal.' },
      { character: CHAMBERMAID, reminder: 'The Chambermaid chooses 2 living players. Give a finger signal.' },
      DAWN,
    ],
  },
});
