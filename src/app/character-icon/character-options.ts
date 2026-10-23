import { PlayerAid } from '../player-aids/player-aid';
import { Character } from '../character-sheets/character';
import {
  ANGEL,
  APPRENTICE,
  BARISTA,
  BEGGAR,
  BISHOP,
  BONE_COLLECTOR,
  BUDDHIST,
  BUREAUCRAT,
  BUTCHER,
  CACKLEJACK,
  DEVIANT,
  DJINN,
  DOOMSAYER,
  FABLED_AND_LORIC_CHARACTERS,
  GANGSTER,
  GNOME,
  GUNSLINGER,
  HARLOT,
  JUDGE,
  MATRON,
  REVOLUTIONARY,
  SCAPEGOAT,
  THIEF,
  VOUDON,
} from '../character-sheets/character-library';
import { Script } from '../scripts/script';
import {
  A_GRIMM_CHORUS,
  ALL_SCRIPT,
  BAD_MOON_RISING,
  EXPERIMENTAL,
  LUNAR_ECLIPSE,
  RACE_TO_THE_BOTTOM,
  SECTS_AND_VIOLETS,
  TROUBLE_BREWING,
} from '../scripts/script-library';

// A character that can be pinned beside a token on the board: its icon is
// shown there, and clicking it opens the character's player aid
export interface CharacterOption {
  id: string;
  name: string;
  icon: string;
  aid: PlayerAid;
  // The scripts a traveler belongs to, which decide when it's offered: first
  // the script it comes from, then any custom scripts that recommend it
  scripts?: readonly Script[];
}

// A character is offered with its name and icon, and opens its player aid
function characterOption(character: Character): CharacterOption {
  return { id: character.id, name: character.name, icon: character.icon, aid: new PlayerAid({ character }) };
}

function travelerOption(character: Character, scripts: readonly Script[]): CharacterOption {
  return { ...characterOption(character), scripts };
}

// The travelers offered on traveler circles
export const TRAVELER_CHARACTERS: readonly CharacterOption[] = [
  travelerOption(SCAPEGOAT, [TROUBLE_BREWING, RACE_TO_THE_BOTTOM, A_GRIMM_CHORUS]),
  travelerOption(GUNSLINGER, [TROUBLE_BREWING]),
  travelerOption(BEGGAR, [TROUBLE_BREWING, RACE_TO_THE_BOTTOM, A_GRIMM_CHORUS, LUNAR_ECLIPSE]),
  travelerOption(BUREAUCRAT, [TROUBLE_BREWING]),
  travelerOption(THIEF, [TROUBLE_BREWING, A_GRIMM_CHORUS]),
  travelerOption(APPRENTICE, [BAD_MOON_RISING, LUNAR_ECLIPSE]),
  travelerOption(MATRON, [BAD_MOON_RISING]),
  travelerOption(VOUDON, [BAD_MOON_RISING, LUNAR_ECLIPSE]),
  travelerOption(JUDGE, [BAD_MOON_RISING, A_GRIMM_CHORUS]),
  travelerOption(BISHOP, [BAD_MOON_RISING, RACE_TO_THE_BOTTOM]),
  travelerOption(BARISTA, [SECTS_AND_VIOLETS, RACE_TO_THE_BOTTOM, LUNAR_ECLIPSE]),
  travelerOption(HARLOT, [SECTS_AND_VIOLETS, RACE_TO_THE_BOTTOM, A_GRIMM_CHORUS, LUNAR_ECLIPSE]),
  travelerOption(BUTCHER, [SECTS_AND_VIOLETS]),
  travelerOption(BONE_COLLECTOR, [SECTS_AND_VIOLETS]),
  travelerOption(DEVIANT, [SECTS_AND_VIOLETS]),
  travelerOption(GANGSTER, [EXPERIMENTAL]),
  travelerOption(GNOME, [EXPERIMENTAL]),
  travelerOption(CACKLEJACK, [EXPERIMENTAL]),
];

// The rows of travelers to offer while a script is picked on the character
// sheet: one row of that script's travelers, or with "All" picked, a row for
// each script the travelers come from, so each traveler shows once
export function travelerRows(script: Script): CharacterOption[][] {
  if (script === ALL_SCRIPT) {
    const homes = [...new Set(TRAVELER_CHARACTERS.map(traveler => traveler.scripts?.[0]))];
    return homes.map(home => TRAVELER_CHARACTERS.filter(traveler => traveler.scripts?.[0] === home));
  }
  const row = TRAVELER_CHARACTERS.filter(traveler => traveler.scripts?.includes(script));
  return row.length > 0 ? [row] : [];
}

// Fabled that are about a particular player, offered on player circles
const PLAYER_FABLED_CHARACTERS: readonly Character[] = [ANGEL, BUDDHIST, DOOMSAYER, REVOLUTIONARY];
export const PLAYER_FABLED: readonly CharacterOption[] = PLAYER_FABLED_CHARACTERS.map(characterOption);

// The other Fabled are about the game as a whole, as are all the Loric, so
// they're offered on landmarks, in the order of the Fabled and Loric
// character sheet
export const LANDMARK_FABLED: readonly CharacterOption[] = FABLED_AND_LORIC_CHARACTERS
  .filter(character => character.type === 'Fabled' && !PLAYER_FABLED_CHARACTERS.includes(character))
  .map(characterOption);

export const LANDMARK_LORIC: readonly CharacterOption[] = FABLED_AND_LORIC_CHARACTERS
  .filter(character => character.type === 'Loric')
  .map(characterOption);

// The rows of Fabled and Loric to offer on landmarks while a script is picked
// on the character sheet. A script with jinxes has a Djinn of its own, which
// takes the Djinn's place while that script is picked, so its jinxes are a
// click away on the board.
export function landmarkRows(script: Script): (readonly CharacterOption[])[] {
  const djinn = script.characters.find(character => character.jinxes);
  const fabled = djinn ? LANDMARK_FABLED.map(option => option.id === DJINN.id ? characterOption(djinn) : option) : LANDMARK_FABLED;
  return [fabled, LANDMARK_LORIC];
}
