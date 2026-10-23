import { Script } from './script';
import { Character } from '../character-sheets/character';
import { NightOrderStep } from '../player-aids/player-aid';
import {
  AMNESIAC,
  ARTIST,
  ASSASSIN,
  BAD_MOON_RISING_CHARACTERS,
  BALLOONIST,
  BARISTA,
  BARON,
  BEGGAR,
  BISHOP,
  CANNIBAL,
  CHAMBERMAID,
  CLOCKMAKER,
  COURTIER,
  DEVILS_ADVOCATE,
  DOOMSAYER,
  DREAMER,
  DRUNK,
  EMPATH,
  EXPERIMENTAL_CHARACTERS,
  FABLED_AND_LORIC_CHARACTERS,
  FISHERMAN,
  FOOL,
  FORTUNE_TELLER,
  GAMBLER,
  GOBLIN,
  GODFATHER,
  GRANDMOTHER,
  HARLOT,
  IMP,
  INNKEEPER,
  INVESTIGATOR,
  KLUTZ,
  LEVIATHAN,
  LIBRARIAN,
  LUNATIC,
  MAYOR,
  MONK,
  MOONCHILD,
  MUTANT,
  POISONER,
  PROFESSOR,
  RAVENKEEPER,
  RECLUSE,
  SAGE,
  SAINT,
  SAVANT,
  SCAPEGOAT,
  SCARLET_WOMAN,
  SECTS_AND_VIOLETS_CHARACTERS,
  SENTINEL,
  SLAYER,
  SNAKE_CHARMER,
  SPY,
  TROUBLE_BREWING_CHARACTERS,
  UNDERTAKER,
  VORTOX,
  WIDOW,
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

// Every character, so a game on any script can find what it needs
export const ALL_SCRIPT = new Script({
  id: 'all',
  name: 'All',
  kind: 'Reference',
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
  kind: 'Base',
  characters: asOnPdf(TROUBLE_BREWING_CHARACTERS),
});

export const BAD_MOON_RISING = new Script({
  id: 'bad-moon-rising',
  name: 'Bad Moon Rising',
  kind: 'Base',
  characters: asOnPdf(BAD_MOON_RISING_CHARACTERS),
});

export const SECTS_AND_VIOLETS = new Script({
  id: 'sects-and-violets',
  name: 'Sects & Violets',
  kind: 'Base',
  characters: asOnPdf(SECTS_AND_VIOLETS_CHARACTERS),
});

// The experimental characters, which aren't in any of the base scripts
export const EXPERIMENTAL = new Script({
  id: 'experimental',
  name: 'Experimental',
  kind: 'Reference',
  characters: [...EXPERIMENTAL_CHARACTERS],
});

// The Fabled and Loric, which the Storyteller can add to a game on any
// script. It holds no other types of character.
export const FABLED_AND_LORIC = new Script({
  id: 'fabled-and-loric',
  name: 'Fabled and Loric',
  kind: 'Reference',
  characters: [...FABLED_AND_LORIC_CHARACTERS],
});

// Every night starts and ends the same way, whatever the script
const DUSK: NightOrderStep = { name: 'Dusk', icon: 'assets/player_aids/icons/dusk.svg', reminder: 'Start the Night Phase.' };
const DAWN: NightOrderStep = { name: 'Dawn', icon: 'assets/player_aids/icons/dawn.svg', reminder: 'Wait for a few seconds. End the Night Phase.' };

// On the first night of a game of 7 or more players, the Minions and the
// Demon learn each other
const MINION_INFO: NightOrderStep = {
  name: 'Minion info',
  icon: 'assets/player_aids/icons/minion_info.svg',
  reminder: [
    'If there are 7 or more players, wake all Minions: Show the ',
    { text: 'THIS IS THE DEMON', style: 'bold' },
    ' token. Point to the Demon. Show the ',
    { text: 'THESE ARE YOUR MINIONS', style: 'bold' },
    ' token. Point to the other Minions.',
  ],
};
const DEMON_INFO: NightOrderStep = {
  name: 'Demon info',
  icon: 'assets/player_aids/icons/demon_info.svg',
  reminder: [
    'If there are 7 or more players, wake the Demon: Show the ',
    { text: 'THESE ARE YOUR MINIONS', style: 'bold' },
    ' token. Point to all Minions. Show the ',
    { text: 'THESE CHARACTERS ARE NOT IN PLAY', style: 'bold' },
    ' token. Show 3 not-in-play good character tokens.',
  ],
};

// The steps used more than once, by more than one script or on both nights
// of one, which read the same each time
const LUNATIC_FIRST_NIGHT: NightOrderStep = {
  character: LUNATIC,
  reminder: [
    'If there are 7 or more players, wake the Lunatic: Show the ',
    { text: 'THESE ARE YOUR MINIONS', style: 'bold' },
    ' token. Point to any players. Show the ',
    { text: 'THESE CHARACTERS ARE NOT IN PLAY', style: 'bold' },
    ' token. Show 3 good character tokens. Put the Lunatic to sleep. Wake the Demon. Show the ',
    { text: 'YOU ARE', style: 'bold' },
    ' info token and the Demon token. Show the ',
    { text: 'THIS PLAYER IS', style: 'bold' },
    ' info token and the Lunatic token, then point to the Lunatic.',
  ],
};
const LUNATIC_OTHER_NIGHTS: NightOrderStep = {
  character: LUNATIC,
  reminder: 'Do whatever needs to be done to simulate the Demon acting. Put the Lunatic to sleep. Wake the Demon. Show the Lunatic token & point to them, then their target(s).',
};
const SPY_STEP: NightOrderStep = { character: SPY, reminder: 'Show the Grimoire for as long as the Spy needs.' };
const SCARLET_WOMAN_OTHER_NIGHTS: NightOrderStep = {
  character: SCARLET_WOMAN,
  reminder: ['If the Scarlet Woman became the Demon today, show them the ', { text: 'YOU ARE', style: 'bold' }, ' token, then the Demon token.'],
};
const IMP_OTHER_NIGHTS: NightOrderStep = {
  character: IMP,
  reminder: [
    'The Imp chooses a player. • If the Imp chose themselves: Replace 1 alive Minion token with a spare Imp token. Put the old Imp to sleep. Wake the new Imp. Show the ',
    { text: 'YOU ARE', style: 'bold' },
    ' token, then show the Imp token.',
  ],
};
const BARISTA_STEP: NightOrderStep = {
  character: BARISTA,
  reminder: ['Choose a player. Wake them, show the ', { text: 'THIS CHARACTER SELECTED YOU', style: 'bold' }, ' & Barista tokens, then give a finger signal.'],
};
const COURTIER_STEP: NightOrderStep = { character: COURTIER, reminder: 'The Courtier might choose a character.' };
const DREAMER_STEP: NightOrderStep = {
  character: DREAMER,
  reminder: 'The Dreamer points to a player. Show 1 good & 1 evil character token, 1 of which is their character.',
};
const SNAKE_CHARMER_STEP: NightOrderStep = {
  character: SNAKE_CHARMER,
  reminder: [
    'The Snake Charmer chooses a player. If they chose the Demon: Show the ',
    { text: 'YOU ARE', style: 'bold' },
    ' & Demon tokens. Give a thumbs down. Swap the Snake Charmer & Demon tokens. Put the old Snake Charmer to sleep. Wake the old Demon. Show the ',
    { text: 'YOU ARE', style: 'bold' },
    ' and Snake Charmer tokens & give a thumbs up.',
  ],
};
const AMNESIAC_STEP: NightOrderStep = { character: AMNESIAC, reminder: "Do whatever needs to be done to satisfy the Amnesiac's ability." };
const GRANDMOTHER_FIRST_NIGHT: NightOrderStep = { character: GRANDMOTHER, reminder: 'Point to the grandchild player & show their character token.' };
const GRANDMOTHER_OTHER_NIGHTS: NightOrderStep = { character: GRANDMOTHER, reminder: 'If the grandchild was killed by the Demon, the Grandmother dies too.' };
const POISONER_STEP: NightOrderStep = { character: POISONER, reminder: 'The Poisoner chooses a player.' };
const DEVILS_ADVOCATE_STEP: NightOrderStep = { character: DEVILS_ADVOCATE, reminder: "The Devil's Advocate chooses a living player." };
const FORTUNE_TELLER_STEP: NightOrderStep = {
  character: FORTUNE_TELLER,
  reminder: ['The Fortune Teller chooses 2 players. Nod if either is the Demon (or the ', { text: 'RED HERRING', style: 'bold' }, ').'],
};

// A custom script, in the order its PDF is read. Its PDF balances the
// Townsfolk columns by height, 6 on the left and 7 on the right, but the
// sheet's left column takes the odd one out, so the Mayor moves from the foot
// of the right column to the foot of the left, keeping every other Townsfolk
// on its PDF row.
export const EVERYONE_CAN_PLAY = new Script({
  id: 'everyone-can-play',
  name: 'Everyone Can Play',
  author: 'Ben Burns',
  kind: 'Custom',
  characters: asOnPdf([
    LIBRARIAN,
    CLOCKMAKER,
    GRANDMOTHER,
    FORTUNE_TELLER,
    EMPATH,
    MONK,
    MAYOR,
    UNDERTAKER,
    GAMBLER,
    ARTIST,
    SLAYER,
    FOOL,
    RAVENKEEPER,
    DRUNK,
    RECLUSE,
    SAINT,
    MOONCHILD,
    BARON,
    POISONER,
    ASSASSIN,
    DEVILS_ADVOCATE,
    SPY,
    SCARLET_WOMAN,
    IMP,
  ]),
  nightOrder: {
    firstNight: [
      DUSK,
      MINION_INFO,
      DEMON_INFO,
      POISONER_STEP,
      DEVILS_ADVOCATE_STEP,
      {
        character: LIBRARIAN,
        reminder: ['Show the Outsider character token. Point to both the ', { text: 'OUTSIDER', style: 'bold' }, ' and ', { text: 'WRONG', style: 'bold' }, ' players.'],
      },
      { character: EMPATH, reminder: 'Give a finger signal.' },
      FORTUNE_TELLER_STEP,
      GRANDMOTHER_FIRST_NIGHT,
      { character: CLOCKMAKER, reminder: 'Give a finger signal.' },
      SPY_STEP,
      DAWN,
    ],
    otherNights: [
      DUSK,
      POISONER_STEP,
      { character: GAMBLER, reminder: 'The Gambler chooses a player & a character.' },
      { character: MONK, reminder: 'The Monk chooses a player.' },
      DEVILS_ADVOCATE_STEP,
      SCARLET_WOMAN_OTHER_NIGHTS,
      IMP_OTHER_NIGHTS,
      { character: ASSASSIN, reminder: 'The Assassin might choose a player.' },
      { character: MOONCHILD, reminder: 'If the Moonchild is due to kill a good player, they die.' },
      GRANDMOTHER_OTHER_NIGHTS,
      { character: RAVENKEEPER, reminder: "If the Ravenkeeper died tonight, the Ravenkeeper chooses a player. Show that player's character token." },
      { character: EMPATH, reminder: 'Give a finger signal.' },
      FORTUNE_TELLER_STEP,
      { character: UNDERTAKER, reminder: 'If a player was executed today, show their character token.' },
      SPY_STEP,
      DAWN,
    ],
  },
});

// A custom Teensyville script, in the order its PDF is read
export const NO_GREATER_JOY = new Script({
  id: 'no-greater-joy',
  name: 'No Greater Joy',
  author: 'Steven Medway',
  kind: 'Teensyville',
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
      SCARLET_WOMAN_OTHER_NIGHTS,
      IMP_OTHER_NIGHTS,
      { character: SAGE, reminder: 'If the Demon killed the Sage, wake the Sage and point to 2 players, 1 of which is the Demon.' },
      { character: EMPATH, reminder: 'Give a finger signal.' },
      { character: CHAMBERMAID, reminder: 'The Chambermaid chooses 2 living players. Give a finger signal.' },
      DAWN,
    ],
  },
});

// A custom Teensyville script, with the travelers and Fabled it recommends.
// Its PDF lists each type down a single column, so its characters keep that
// order, and the sheet reads them a row at a time. It has no reminders of
// its own for the night order, so they're worded as on the official night
// sheet.
export const RACE_TO_THE_BOTTOM = new Script({
  id: 'race-to-the-bottom',
  name: 'Race to the Bottom',
  author: 'Evin Donahoe',
  kind: 'Teensyville',
  characters: [
    CLOCKMAKER,
    EMPATH,
    DREAMER,
    COURTIER,
    SLAYER,
    MAYOR,
    LUNATIC,
    KLUTZ,
    SPY,
    SCARLET_WOMAN,
    VORTOX,
    BARISTA,
    HARLOT,
    BEGGAR,
    SCAPEGOAT,
    BISHOP,
    DOOMSAYER,
    SENTINEL,
  ],
  nightOrder: {
    firstNight: [
      DUSK,
      BARISTA_STEP,
      MINION_INFO,
      LUNATIC_FIRST_NIGHT,
      DEMON_INFO,
      COURTIER_STEP,
      { character: EMPATH, reminder: 'Give a finger signal.' },
      { character: CLOCKMAKER, reminder: 'Give a finger signal.' },
      DREAMER_STEP,
      SPY_STEP,
      DAWN,
    ],
    otherNights: [
      DUSK,
      BARISTA_STEP,
      {
        character: HARLOT,
        reminder: [
          'The Harlot chooses a living player. Put the Harlot to sleep. Wake the chosen player, show them the ',
          { text: 'THIS CHARACTER SELECTED YOU', style: 'bold' },
          " token, then the Harlot token. If that player nods their head, wake the Harlot and show them the chosen player's character token. Both players might die.",
        ],
      },
      COURTIER_STEP,
      SCARLET_WOMAN_OTHER_NIGHTS,
      LUNATIC_OTHER_NIGHTS,
      { character: VORTOX, reminder: 'The Vortox chooses a player.' },
      { character: EMPATH, reminder: 'Give a finger signal.' },
      DREAMER_STEP,
      SPY_STEP,
      DAWN,
    ],
  },
});

// A custom Teensyville script, in the order its PDF is read
export const OVER_THE_RIVER = new Script({
  id: 'over-the-river',
  name: 'Over the River',
  author: 'Andrew Nathenson',
  kind: 'Teensyville',
  characters: asOnPdf([
    GRANDMOTHER,
    CLOCKMAKER,
    INNKEEPER,
    SNAKE_CHARMER,
    PROFESSOR,
    SLAYER,
    LUNATIC,
    RECLUSE,
    GODFATHER,
    SPY,
    IMP,
  ]),
  nightOrder: {
    firstNight: [
      DUSK,
      LUNATIC_FIRST_NIGHT,
      SNAKE_CHARMER_STEP,
      { character: GODFATHER, reminder: 'Show the character tokens of all in-play Outsiders.' },
      GRANDMOTHER_FIRST_NIGHT,
      { character: CLOCKMAKER, reminder: 'Give a finger signal.' },
      SPY_STEP,
      DAWN,
    ],
    otherNights: [
      DUSK,
      { character: INNKEEPER, reminder: 'The Innkeeper chooses 2 players.' },
      SNAKE_CHARMER_STEP,
      LUNATIC_OTHER_NIGHTS,
      IMP_OTHER_NIGHTS,
      { character: GODFATHER, reminder: 'If an Outsider died today, the Godfather chooses a player.' },
      { character: PROFESSOR, reminder: 'The Professor might choose a dead player.' },
      GRANDMOTHER_OTHER_NIGHTS,
      SPY_STEP,
      DAWN,
    ],
  },
});

// A custom Teensyville script, in the order its PDF is read. Its PDF wakes
// the Leviathan after Dawn, as everyone learns it's in play.
export const LAISSEZ_UN_FAIRE = new Script({
  id: 'laissez-un-faire',
  name: 'Laissez Un Faire',
  author: 'Steven Medway',
  kind: 'Teensyville',
  characters: asOnPdf([
    BALLOONIST,
    SAVANT,
    AMNESIAC,
    FISHERMAN,
    ARTIST,
    CANNIBAL,
    MUTANT,
    LUNATIC,
    WIDOW,
    GOBLIN,
    LEVIATHAN,
  ]),
  nightOrder: {
    firstNight: [
      DUSK,
      LUNATIC_FIRST_NIGHT,
      {
        character: WIDOW,
        reminder: [
          'Show the Grimoire for as long as the Widow needs. The Widow chooses a player. • Put the Widow to sleep. Wake the player marked ',
          { text: 'KNOW', style: 'bold' },
          ' & show the Widow token.',
        ],
      },
      AMNESIAC_STEP,
      { character: BALLOONIST, reminder: 'Point to any player.' },
      DAWN,
      { character: LEVIATHAN, reminder: 'Announce that the Leviathan is in play.' },
    ],
    otherNights: [
      DUSK,
      LUNATIC_OTHER_NIGHTS,
      AMNESIAC_STEP,
      { character: BALLOONIST, reminder: 'Point to a player with a different character type to the previously shown player.' },
      DAWN,
      { character: LEVIATHAN, reminder: 'Change the Leviathan reminder token to the relevant day. • You may announce that the Leviathan is in play.' },
    ],
  },
});
