import { Script } from './script';
import { Character } from '../character-sheets/character';
import { NightOrderStep } from '../player-aids/player-aid';
import {
  AMNESIAC,
  APPRENTICE,
  ARTIST,
  ASSASSIN,
  BAD_MOON_RISING_CHARACTERS,
  BALLOONIST,
  BARBER,
  BARISTA,
  BARON,
  BEGGAR,
  BISHOP,
  CANNIBAL,
  CERENOVUS,
  CHAMBERMAID,
  CLOCKMAKER,
  COURTIER,
  DAMSEL,
  DEVILS_ADVOCATE,
  DJINN_A_GRIMM_CHORUS,
  DJINN_LUNAR_ECLIPSE,
  DJINN_ONE_IN_ONE_OUT,
  DOOMSAYER,
  DREAMER,
  DRUNK,
  EMPATH,
  EXORCIST,
  EXPERIMENTAL_CHARACTERS,
  FABLED_AND_LORIC_CHARACTERS,
  FANG_GU,
  FARMER,
  FISHERMAN,
  FOOL,
  FORTUNE_TELLER,
  GAMBLER,
  GENERAL,
  GOBLIN,
  GODFATHER,
  GOLEM,
  GOON,
  GRANDMOTHER,
  HARLOT,
  HARPY,
  HIGH_PRIESTESS,
  HUNTSMAN,
  IMP,
  INNKEEPER,
  INVESTIGATOR,
  JUDGE,
  KAZALI,
  KLUTZ,
  KNIGHT,
  LEVIATHAN,
  LIBRARIAN,
  LUNATIC,
  LYCANTHROPE,
  MAGICIAN,
  MARIONETTE,
  MATHEMATICIAN,
  MAYOR,
  MEZEPHELES,
  MINSTREL,
  MONK,
  MOONCHILD,
  MUTANT,
  NIGHTWATCHMAN,
  NOBLE,
  NO_DASHII,
  OGRE,
  OJO,
  ORACLE,
  PIXIE,
  PO,
  POISONER,
  POLITICIAN,
  PREACHER,
  PROFESSOR,
  PUKKA,
  PUZZLEMASTER,
  RAVENKEEPER,
  RECLUSE,
  SAGE,
  SAILOR,
  SAINT,
  SAVANT,
  SCAPEGOAT,
  SCARLET_WOMAN,
  SEAMSTRESS,
  SECTS_AND_VIOLETS_CHARACTERS,
  SENTINEL,
  SLAYER,
  SNAKE_CHARMER,
  SOLDIER,
  SPIRIT_OF_IVORY,
  SPY,
  STEWARD,
  SUMMONER,
  TEA_LADY,
  THIEF,
  TOWN_CRIER,
  TROUBLE_BREWING_CHARACTERS,
  UNDERTAKER,
  VIGORMORTIS,
  VILLAGE_IDIOT,
  VIRGIN,
  VORTOX,
  VOUDON,
  WIDOW,
  YAGGABABBLE,
  ZOMBUUL,
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

// Every character, so a game on any script can find what it needs. A
// script's own Djinn is left to that script, the Djinn standing in for it.
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
const LIBRARIAN_FIRST_NIGHT: NightOrderStep = {
  character: LIBRARIAN,
  reminder: ['Show the Outsider character token. Point to both the ', { text: 'OUTSIDER', style: 'bold' }, ' and ', { text: 'WRONG', style: 'bold' }, ' players.'],
};
const GAMBLER_OTHER_NIGHTS: NightOrderStep = { character: GAMBLER, reminder: 'The Gambler chooses a player & a character.' };
const MONK_OTHER_NIGHTS: NightOrderStep = { character: MONK, reminder: 'The Monk chooses a player.' };
const ASSASSIN_OTHER_NIGHTS: NightOrderStep = { character: ASSASSIN, reminder: 'The Assassin might choose a player.' };
const RAVENKEEPER_OTHER_NIGHTS: NightOrderStep = {
  character: RAVENKEEPER,
  reminder: "If the Ravenkeeper died tonight, the Ravenkeeper chooses a player. Show that player's character token.",
};
const UNDERTAKER_OTHER_NIGHTS: NightOrderStep = { character: UNDERTAKER, reminder: 'If a player was executed today, show their character token.' };
const INNKEEPER_OTHER_NIGHTS: NightOrderStep = { character: INNKEEPER, reminder: 'The Innkeeper chooses 2 players.' };
const GODFATHER_FIRST_NIGHT: NightOrderStep = { character: GODFATHER, reminder: 'Show the character tokens of all in-play Outsiders.' };
const GODFATHER_OTHER_NIGHTS: NightOrderStep = { character: GODFATHER, reminder: 'If an Outsider died today, the Godfather chooses a player.' };
const CHAMBERMAID_STEP: NightOrderStep = { character: CHAMBERMAID, reminder: 'The Chambermaid chooses 2 living players. Give a finger signal.' };
const DAMSEL_FIRST_NIGHT: NightOrderStep = {
  character: DAMSEL,
  reminder: [
    "During Minion Info, show the Minions the Damsel token. If you haven't done this yet, do so now. If the Damsel was chosen by the Huntsman, show the ",
    { text: 'YOU ARE', style: 'bold' },
    ' info token & their new character token.',
  ],
};
const DAMSEL_OTHER_NIGHTS: NightOrderStep = {
  character: DAMSEL,
  reminder: ['If the Damsel was chosen by the Huntsman, show the ', { text: 'YOU ARE', style: 'bold' }, ' info token & their new character token.'],
};
const PUKKA_FIRST_NIGHT: NightOrderStep = { character: PUKKA, reminder: 'The Pukka chooses a player.' };
const PUKKA_OTHER_NIGHTS: NightOrderStep = {
  character: PUKKA,
  reminder: 'The Pukka chooses a player. • The previously poisoned player dies then becomes healthy.',
};
const OJO_OTHER_NIGHTS: NightOrderStep = { character: OJO, reminder: 'The Ojo chooses a character.' };
const VIGORMORTIS_OTHER_NIGHTS: NightOrderStep = {
  character: VIGORMORTIS,
  reminder: 'The Vigormortis chooses a player. • If that player is a Minion, poison a neighboring Townsfolk.',
};
const VILLAGE_IDIOT_FIRST_NIGHT: NightOrderStep = {
  character: VILLAGE_IDIOT,
  reminder: [
    'If there are multiple Village Idiots, mark one as ',
    { text: 'DRUNK', style: 'bold' },
    '. • Wake the Village Idiots one at a time to choose a player. Give a thumb signal.',
  ],
};
const VILLAGE_IDIOT_OTHER_NIGHTS: NightOrderStep = {
  character: VILLAGE_IDIOT,
  reminder: 'Wake the Village Idiots one at a time to choose a player. Give a thumb signal.',
};
const MEZEPHELES_FIRST_NIGHT: NightOrderStep = { character: MEZEPHELES, reminder: 'Show the secret word.' };
const MEZEPHELES_OTHER_NIGHTS: NightOrderStep = {
  character: MEZEPHELES,
  reminder: ['If a good player said the secret word, wake the player. Show the ', { text: 'YOU ARE', style: 'bold' }, ' info token & give a thumbs-down.'],
};
const PIXIE_FIRST_NIGHT: NightOrderStep = {
  character: PIXIE,
  reminder: ['Show the Townsfolk character token marked ', { text: 'MAD', style: 'bold' }, '.'],
};
const SEAMSTRESS_STEP: NightOrderStep = { character: SEAMSTRESS, reminder: 'The Seamstress might choose 2 players. Nod or shake your head.' };
const NIGHTWATCHMAN_STEP: NightOrderStep = {
  character: NIGHTWATCHMAN,
  reminder: [
    'The Nightwatchman might choose a player. Put the Nightwatchman to sleep. Wake the target. Show the ',
    { text: 'THIS PLAYER IS', style: 'bold' },
    ' & Nightwatchman tokens, then point to the Nightwatchman.',
  ],
};
const PREACHER_STEP: NightOrderStep = {
  character: PREACHER,
  reminder: [
    'The Preacher chooses a player. • If they chose a Minion: Put the Preacher to sleep. Wake the target. Show the ',
    { text: 'THIS CHARACTER SELECTED YOU', style: 'bold' },
    ' & Preacher tokens.',
  ],
};
const CERENOVUS_STEP: NightOrderStep = {
  character: CERENOVUS,
  reminder: [
    'The Cerenovus chooses a player & a character. • Put the Cerenovus to sleep. Wake the target. Show the ',
    { text: 'THIS CHARACTER SELECTED YOU', style: 'bold' },
    ' token, the Cerenovus token, then the madness-character token.',
  ],
};
const HUNTSMAN_STEP: NightOrderStep = {
  character: HUNTSMAN,
  reminder: [
    'The Huntsman might choose a player. • If they chose the Damsel: Put the Huntsman to sleep. Wake the target. Show the ',
    { text: 'YOU ARE', style: 'bold' },
    ' info token & their new character token.',
  ],
};
const SAILOR_STEP: NightOrderStep = { character: SAILOR, reminder: 'The Sailor chooses a living player.' };
const HARPY_STEP: NightOrderStep = {
  character: HARPY,
  reminder: [
    'The Harpy chooses 2 players. • Put the Harpy to sleep. Wake the 1st target. Show the ',
    { text: 'THIS CHARACTER SELECTED YOU', style: 'bold' },
    ' token, the Harpy token, then point to the 2nd target.',
  ],
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
      LIBRARIAN_FIRST_NIGHT,
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
      GAMBLER_OTHER_NIGHTS,
      MONK_OTHER_NIGHTS,
      DEVILS_ADVOCATE_STEP,
      SCARLET_WOMAN_OTHER_NIGHTS,
      IMP_OTHER_NIGHTS,
      ASSASSIN_OTHER_NIGHTS,
      { character: MOONCHILD, reminder: 'If the Moonchild is due to kill a good player, they die.' },
      GRANDMOTHER_OTHER_NIGHTS,
      RAVENKEEPER_OTHER_NIGHTS,
      { character: EMPATH, reminder: 'Give a finger signal.' },
      FORTUNE_TELLER_STEP,
      UNDERTAKER_OTHER_NIGHTS,
      SPY_STEP,
      DAWN,
    ],
  },
});

// A custom script, in the order its PDF is read, with the travelers and
// Fabled it recommends. Its PDF lists those down a single column, so they
// keep that order after the rest. Its Djinn holds the script's jinxes.
export const A_GRIMM_CHORUS = new Script({
  id: 'a-grimm-chorus',
  name: 'A Grimm Chorus',
  author: 'Zets',
  kind: 'Custom',
  characters: [
    ...asOnPdf([
      GENERAL,
      VILLAGE_IDIOT,
      TOWN_CRIER,
      INNKEEPER,
      GAMBLER,
      EXORCIST,
      AMNESIAC,
      NIGHTWATCHMAN,
      SLAYER,
      FISHERMAN,
      SOLDIER,
      MINSTREL,
      CANNIBAL,
      DAMSEL,
      DRUNK,
      GOLEM,
      POLITICIAN,
      GODFATHER,
      SUMMONER,
      ASSASSIN,
      SCARLET_WOMAN,
      YAGGABABBLE,
      PUKKA,
      OJO,
      PO,
    ]),
    THIEF,
    HARLOT,
    JUDGE,
    BEGGAR,
    SCAPEGOAT,
    DJINN_A_GRIMM_CHORUS,
  ],
  nightOrder: {
    firstNight: [
      DUSK,
      { character: YAGGABABBLE, reminder: 'Show the Yaggababble their secret phrase.' },
      MINION_INFO,
      {
        character: SUMMONER,
        reminder: ['Show the ', { text: 'THESE CHARACTERS ARE NOT IN PLAY', style: 'bold' }, ' token. Show 3 not-in-play good character tokens.'],
      },
      DEMON_INFO,
      GODFATHER_FIRST_NIGHT,
      PUKKA_FIRST_NIGHT,
      DAMSEL_FIRST_NIGHT,
      AMNESIAC_STEP,
      VILLAGE_IDIOT_FIRST_NIGHT,
      NIGHTWATCHMAN_STEP,
      { character: GENERAL, reminder: 'Give a thumb signal.' },
      DAWN,
    ],
    otherNights: [
      DUSK,
      INNKEEPER_OTHER_NIGHTS,
      GAMBLER_OTHER_NIGHTS,
      SCARLET_WOMAN_OTHER_NIGHTS,
      {
        character: SUMMONER,
        reminder: [
          'Change the Summoner reminder token to the relevant night. • If it is night 3, the Summoner chooses a player & a Demon character. Put the Summoner to sleep. Wake the target. Show the ',
          { text: 'YOU ARE', style: 'bold' },
          ' and Demon tokens & give a thumbs-down.',
        ],
      },
      {
        character: EXORCIST,
        reminder: [
          'The Exorcist chooses a player. • Put the Exorcist to sleep. If the Exorcist chose the Demon: Wake the Demon. Show the ',
          { text: 'THIS CHARACTER SELECTED YOU', style: 'bold' },
          ' & Exorcist tokens. Point to the Exorcist.',
        ],
      },
      PUKKA_OTHER_NIGHTS,
      { character: PO, reminder: 'The Po may choose a player OR chooses 3 players if they chose no-one last night.' },
      OJO_OTHER_NIGHTS,
      { character: YAGGABABBLE, reminder: 'For each time the Yaggababble said their phrase today, a player might die.' },
      ASSASSIN_OTHER_NIGHTS,
      GODFATHER_OTHER_NIGHTS,
      DAMSEL_OTHER_NIGHTS,
      AMNESIAC_STEP,
      { character: TOWN_CRIER, reminder: 'Either nod or shake your head.' },
      VILLAGE_IDIOT_OTHER_NIGHTS,
      NIGHTWATCHMAN_STEP,
      { character: GENERAL, reminder: 'Give a thumb signal.' },
      DAWN,
    ],
  },
});

// A custom script, in the order its PDF is read
export const HIDE_AND_SEEK = new Script({
  id: 'hide-and-seek',
  name: 'Hide and Seek',
  author: 'Narninian and Zaba',
  kind: 'Custom',
  characters: asOnPdf([
    NOBLE,
    LIBRARIAN,
    PIXIE,
    PREACHER,
    TOWN_CRIER,
    ORACLE,
    UNDERTAKER,
    DREAMER,
    SEAMSTRESS,
    ARTIST,
    HUNTSMAN,
    RAVENKEEPER,
    VIRGIN,
    DAMSEL,
    DRUNK,
    MUTANT,
    GOON,
    GODFATHER,
    MEZEPHELES,
    POISONER,
    CERENOVUS,
    PUKKA,
    VIGORMORTIS,
    IMP,
    OJO,
  ]),
  nightOrder: {
    firstNight: [
      DUSK,
      MINION_INFO,
      DEMON_INFO,
      PREACHER_STEP,
      POISONER_STEP,
      GODFATHER_FIRST_NIGHT,
      CERENOVUS_STEP,
      MEZEPHELES_FIRST_NIGHT,
      PUKKA_FIRST_NIGHT,
      PIXIE_FIRST_NIGHT,
      HUNTSMAN_STEP,
      DAMSEL_FIRST_NIGHT,
      LIBRARIAN_FIRST_NIGHT,
      DREAMER_STEP,
      SEAMSTRESS_STEP,
      { character: NOBLE, reminder: ['Point to the 3 players marked ', { text: 'KNOW', style: 'bold' }, '.'] },
      DAWN,
    ],
    otherNights: [
      DUSK,
      PREACHER_STEP,
      POISONER_STEP,
      CERENOVUS_STEP,
      MEZEPHELES_OTHER_NIGHTS,
      IMP_OTHER_NIGHTS,
      PUKKA_OTHER_NIGHTS,
      VIGORMORTIS_OTHER_NIGHTS,
      OJO_OTHER_NIGHTS,
      GODFATHER_OTHER_NIGHTS,
      HUNTSMAN_STEP,
      DAMSEL_OTHER_NIGHTS,
      RAVENKEEPER_OTHER_NIGHTS,
      UNDERTAKER_OTHER_NIGHTS,
      DREAMER_STEP,
      { character: TOWN_CRIER, reminder: 'Either nod or shake your head.' },
      { character: ORACLE, reminder: 'Give a finger signal.' },
      SEAMSTRESS_STEP,
      DAWN,
    ],
  },
});

// A custom script, in the order its PDF is read, with the travelers and
// Fabled it recommends. Its PDF lists those down a single column, so they
// keep that order after the rest. Its Djinn holds the script's jinxes.
// Like Everyone Can Play, its PDF balances the Townsfolk columns by height,
// 6 on the left and 7 on the right, so the Cannibal moves from the foot of
// the right column to the foot of the left.
export const LUNAR_ECLIPSE = new Script({
  id: 'lunar-eclipse',
  name: 'Lunar Eclipse',
  author: 'Ekin',
  kind: 'Custom',
  characters: [
    ...asOnPdf([
      GRANDMOTHER,
      PIXIE,
      SAILOR,
      CHAMBERMAID,
      MATHEMATICIAN,
      INNKEEPER,
      CANNIBAL,
      LYCANTHROPE,
      SAVANT,
      ARTIST,
      TEA_LADY,
      MAGICIAN,
      MAYOR,
      GOON,
      BARBER,
      LUNATIC,
      PUZZLEMASTER,
      GODFATHER,
      DEVILS_ADVOCATE,
      SPY,
      ASSASSIN,
      MARIONETTE,
      NO_DASHII,
      ZOMBUUL,
      VIGORMORTIS,
    ]),
    BARISTA,
    HARLOT,
    APPRENTICE,
    BEGGAR,
    VOUDON,
    DJINN_LUNAR_ECLIPSE,
    SPIRIT_OF_IVORY,
  ],
  nightOrder: {
    firstNight: [
      DUSK,
      { character: MAGICIAN, reminder: 'During Minion Info, point to the Magician and the Demon. During Demon Info, point to the Magician and the Minions.' },
      MINION_INFO,
      LUNATIC_FIRST_NIGHT,
      DEMON_INFO,
      SAILOR_STEP,
      {
        character: MARIONETTE,
        reminder: ['Wake the Demon. Show the ', { text: 'THIS PLAYER IS', style: 'bold' }, ' & Marionette tokens. Point to the Marionette.'],
      },
      GODFATHER_FIRST_NIGHT,
      DEVILS_ADVOCATE_STEP,
      PIXIE_FIRST_NIGHT,
      GRANDMOTHER_FIRST_NIGHT,
      SPY_STEP,
      CHAMBERMAID_STEP,
      { character: MATHEMATICIAN, reminder: 'Give a finger signal.' },
      DAWN,
    ],
    otherNights: [
      DUSK,
      SAILOR_STEP,
      INNKEEPER_OTHER_NIGHTS,
      DEVILS_ADVOCATE_STEP,
      LUNATIC_OTHER_NIGHTS,
      { character: LYCANTHROPE, reminder: 'The Lycanthrope chooses a player.' },
      { character: ZOMBUUL, reminder: 'If no one died today, the Zombuul chooses a player.' },
      { character: NO_DASHII, reminder: 'The No Dashii chooses a player.' },
      VIGORMORTIS_OTHER_NIGHTS,
      ASSASSIN_OTHER_NIGHTS,
      GODFATHER_OTHER_NIGHTS,
      {
        character: BARBER,
        reminder: [
          'If the Barber died today or tonight, show the Demon the ',
          { text: 'THIS CHARACTER SELECTED YOU', style: 'bold' },
          ' & Barber tokens. If the Demon chose 2 players, wake one at a time. Show the ',
          { text: 'YOU ARE', style: 'bold' },
          ' token & their new character token.',
        ],
      },
      GRANDMOTHER_OTHER_NIGHTS,
      SPY_STEP,
      CHAMBERMAID_STEP,
      { character: MATHEMATICIAN, reminder: 'Give a finger signal.' },
      DAWN,
    ],
  },
});

// A custom script, in the order its PDF is read, with the Fabled it
// recommends after the rest. Its Djinn holds the script's jinxes.
export const ONE_IN_ONE_OUT = new Script({
  id: 'one-in-one-out',
  name: 'One in one out',
  author: 'Baron von Klutz',
  kind: 'Custom',
  characters: [
    ...asOnPdf([
      STEWARD,
      KNIGHT,
      HIGH_PRIESTESS,
      VILLAGE_IDIOT,
      SNAKE_CHARMER,
      FORTUNE_TELLER,
      ORACLE,
      MONK,
      AMNESIAC,
      FISHERMAN,
      SEAMSTRESS,
      FARMER,
      CANNIBAL,
      OGRE,
      GOON,
      RECLUSE,
      DRUNK,
      POISONER,
      HARPY,
      SPY,
      MEZEPHELES,
      KAZALI,
      IMP,
      OJO,
      FANG_GU,
    ]),
    DJINN_ONE_IN_ONE_OUT,
    SPIRIT_OF_IVORY,
  ],
  nightOrder: {
    firstNight: [
      DUSK,
      {
        character: KAZALI,
        reminder: [
          'The Kazali chooses which players are which Minions. Wake each target. Show the ',
          { text: 'YOU ARE', style: 'bold' },
          ' and Minion tokens & give a thumbs-down.',
        ],
      },
      MINION_INFO,
      DEMON_INFO,
      POISONER_STEP,
      SNAKE_CHARMER_STEP,
      HARPY_STEP,
      MEZEPHELES_FIRST_NIGHT,
      AMNESIAC_STEP,
      FORTUNE_TELLER_STEP,
      SEAMSTRESS_STEP,
      { character: STEWARD, reminder: ['Point to the player marked ', { text: 'KNOW', style: 'bold' }, '.'] },
      { character: KNIGHT, reminder: ['Point to the 2 players marked ', { text: 'KNOW', style: 'bold' }, '.'] },
      VILLAGE_IDIOT_FIRST_NIGHT,
      SPY_STEP,
      { character: OGRE, reminder: 'The Ogre chooses a player.' },
      { character: HIGH_PRIESTESS, reminder: 'Point to a player.' },
      DAWN,
    ],
    otherNights: [
      DUSK,
      POISONER_STEP,
      SNAKE_CHARMER_STEP,
      MONK_OTHER_NIGHTS,
      HARPY_STEP,
      MEZEPHELES_OTHER_NIGHTS,
      IMP_OTHER_NIGHTS,
      {
        character: FANG_GU,
        reminder: [
          'The Fang Gu chooses a player. • If they chose an Outsider (once only): Replace the Outsider token with the spare Fang Gu token. Put the Fang Gu to sleep. Wake the target. Show the ',
          { text: 'YOU ARE', style: 'bold' },
          ' and Fang Gu tokens & give a thumbs-down.',
        ],
      },
      OJO_OTHER_NIGHTS,
      { character: KAZALI, reminder: 'The Kazali chooses a player.' },
      AMNESIAC_STEP,
      {
        character: FARMER,
        reminder: ['If the Farmer died tonight, wake a living good player. Show the ', { text: 'YOU ARE', style: 'bold' }, ' info token and a Farmer token.'],
      },
      FORTUNE_TELLER_STEP,
      { character: ORACLE, reminder: 'Give a finger signal.' },
      SEAMSTRESS_STEP,
      VILLAGE_IDIOT_OTHER_NIGHTS,
      SPY_STEP,
      { character: HIGH_PRIESTESS, reminder: 'Point to a player.' },
      DAWN,
    ],
  },
});

// A custom Teensyville script, in the order its PDF is read, with the Fabled
// it recommends after the rest
export const TEENSY_TROUBLE_BREWING = new Script({
  id: 'teensy-trouble-brewing',
  name: 'Teensy Trouble Brewing',
  author: 'Seth Condie',
  kind: 'Teensyville',
  characters: [
    ...asOnPdf([
      EMPATH,
      FORTUNE_TELLER,
      UNDERTAKER,
      MONK,
      SLAYER,
      MAYOR,
      DRUNK,
      RECLUSE,
      POISONER,
      SPY,
      IMP,
    ]),
    SENTINEL,
  ],
  nightOrder: {
    firstNight: [
      DUSK,
      POISONER_STEP,
      { character: EMPATH, reminder: 'Give a finger signal.' },
      FORTUNE_TELLER_STEP,
      SPY_STEP,
      DAWN,
    ],
    otherNights: [
      DUSK,
      POISONER_STEP,
      MONK_OTHER_NIGHTS,
      IMP_OTHER_NIGHTS,
      { character: EMPATH, reminder: 'Give a finger signal.' },
      FORTUNE_TELLER_STEP,
      UNDERTAKER_OTHER_NIGHTS,
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
      CHAMBERMAID_STEP,
      DAWN,
    ],
    otherNights: [
      DUSK,
      SCARLET_WOMAN_OTHER_NIGHTS,
      IMP_OTHER_NIGHTS,
      { character: SAGE, reminder: 'If the Demon killed the Sage, wake the Sage and point to 2 players, 1 of which is the Demon.' },
      { character: EMPATH, reminder: 'Give a finger signal.' },
      CHAMBERMAID_STEP,
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
      GODFATHER_FIRST_NIGHT,
      GRANDMOTHER_FIRST_NIGHT,
      { character: CLOCKMAKER, reminder: 'Give a finger signal.' },
      SPY_STEP,
      DAWN,
    ],
    otherNights: [
      DUSK,
      INNKEEPER_OTHER_NIGHTS,
      SNAKE_CHARMER_STEP,
      LUNATIC_OTHER_NIGHTS,
      IMP_OTHER_NIGHTS,
      GODFATHER_OTHER_NIGHTS,
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
