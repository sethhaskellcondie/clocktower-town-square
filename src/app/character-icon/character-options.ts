import { PlayerAid } from '../player-aids/player-aid';
import { Character } from '../character-sheets/character';
import {
  APPRENTICE,
  BARISTA,
  BEGGAR,
  BISHOP,
  BONE_COLLECTOR,
  BUREAUCRAT,
  BUTCHER,
  CACKLEJACK,
  DEVIANT,
  GANGSTER,
  GNOME,
  GUNSLINGER,
  HARLOT,
  JUDGE,
  MATRON,
  SCAPEGOAT,
  THIEF,
  VOUDON,
} from '../character-sheets/character-library';
import { Script } from '../scripts/script';
import { ALL_SCRIPT, BAD_MOON_RISING, EXPERIMENTAL, SECTS_AND_VIOLETS, TROUBLE_BREWING } from '../scripts/script-library';
import {
  ANGEL_PROTECTION,
  BIG_WIG_NOMINEES,
  BOOTLEGGER_HOMEBREW,
  BUDDHIST_SILENCE,
  DEUS_EX_FIASCO_MISTAKE,
  DOOMSAYER_SACRIFICE,
  FERRYMAN_VOTES,
  FIDDLER_CONTEST,
  GARDENER_SEATING,
  GOD_OF_UG_HAT,
  HELLS_LIBRARIAN_SILENCE,
  HINDU_REINCARNATION,
  KNAVES_STORYTELLERS,
  POPE_DUPLICATES,
  REVOLUTIONARY_NEIGHBORS,
  STORM_CATCHER_PROTECTION,
  TOR_HIDDEN_CHARACTERS,
  VENTRILOQUIST_NOMINATIONS,
  ZENOMANCER_GOALS,
} from '../player-aids/player-aid-library';

// A character that can be pinned beside a token on the board: its icon is
// shown there, and clicking it opens the character's player aid
export interface CharacterOption {
  id: string;
  name: string;
  icon: string;
  aid: PlayerAid;
  // The scripts a traveler belongs to, which decide when it's offered
  scripts?: readonly Script[];
}

// A traveler is offered with its character's name and icon, and opens its
// character's player aid
function travelerOption(character: Character, scripts: readonly Script[]): CharacterOption {
  return { id: character.id, name: character.name, icon: character.icon, aid: new PlayerAid({ character }), scripts };
}

// The travelers offered on traveler circles
export const TRAVELER_CHARACTERS: readonly CharacterOption[] = [
  travelerOption(SCAPEGOAT, [TROUBLE_BREWING]),
  travelerOption(GUNSLINGER, [TROUBLE_BREWING]),
  travelerOption(BEGGAR, [TROUBLE_BREWING]),
  travelerOption(BUREAUCRAT, [TROUBLE_BREWING]),
  travelerOption(THIEF, [TROUBLE_BREWING]),
  travelerOption(APPRENTICE, [BAD_MOON_RISING]),
  travelerOption(MATRON, [BAD_MOON_RISING]),
  travelerOption(VOUDON, [BAD_MOON_RISING]),
  travelerOption(JUDGE, [BAD_MOON_RISING]),
  travelerOption(BISHOP, [BAD_MOON_RISING]),
  travelerOption(BARISTA, [SECTS_AND_VIOLETS]),
  travelerOption(HARLOT, [SECTS_AND_VIOLETS]),
  travelerOption(BUTCHER, [SECTS_AND_VIOLETS]),
  travelerOption(BONE_COLLECTOR, [SECTS_AND_VIOLETS]),
  travelerOption(DEVIANT, [SECTS_AND_VIOLETS]),
  travelerOption(GANGSTER, [EXPERIMENTAL]),
  travelerOption(GNOME, [EXPERIMENTAL]),
  travelerOption(CACKLEJACK, [EXPERIMENTAL]),
];

// The rows of travelers to offer while a script is picked on the character
// sheet: one row of that script's travelers, or with "All" picked, a row for
// each script holding the travelers in it, so a traveler in two scripts
// shows in both
export function travelerRows(script: Script): CharacterOption[][] {
  const scripts = script === ALL_SCRIPT
    ? [...new Set(TRAVELER_CHARACTERS.flatMap(traveler => traveler.scripts ?? []))]
    : [script];
  return scripts
    .map(s => TRAVELER_CHARACTERS.filter(traveler => traveler.scripts?.includes(s)))
    .filter(row => row.length > 0);
}

// Fabled that are about a particular player, offered on player circles
export const PLAYER_FABLED: readonly CharacterOption[] = [
  { id: 'angel', name: 'Angel', icon: 'assets/player_aids/icons/fabled/angel.png', aid: ANGEL_PROTECTION },
  { id: 'buddhist', name: 'Buddhist', icon: 'assets/player_aids/icons/fabled/buddhist.png', aid: BUDDHIST_SILENCE },
  { id: 'doomsayer', name: 'Doomsayer', icon: 'assets/player_aids/icons/fabled/doomsayer.png', aid: DOOMSAYER_SACRIFICE },
  { id: 'revolutionary', name: 'Revolutionary', icon: 'assets/player_aids/icons/fabled/revolutionary.png', aid: REVOLUTIONARY_NEIGHBORS },
];

// Fabled that are about the game as a whole, offered on landmarks
export const LANDMARK_FABLED: readonly CharacterOption[] = [
  { id: 'deus-ex-fiasco', name: 'Deus ex Fiasco', icon: 'assets/player_aids/icons/fabled/deus_ex_fiasco.png', aid: DEUS_EX_FIASCO_MISTAKE },
  { id: 'ferryman', name: 'Ferryman', icon: 'assets/player_aids/icons/fabled/ferryman.png', aid: FERRYMAN_VOTES },
  { id: 'fiddler', name: 'Fiddler', icon: 'assets/player_aids/icons/fabled/fiddler.png', aid: FIDDLER_CONTEST },
  { id: 'hells-librarian', name: "Hell's Librarian", icon: 'assets/player_aids/icons/fabled/hells_librarian.png', aid: HELLS_LIBRARIAN_SILENCE },
];

// Loric are about the game as a whole, so they're all offered on landmarks,
// in the same order as the shelf's Loric section
export const LANDMARK_LORIC: readonly CharacterOption[] = [
  { id: 'big-wig', name: 'Big Wig', icon: 'assets/player_aids/icons/loric/big_wig.png', aid: BIG_WIG_NOMINEES },
  { id: 'bootlegger', name: 'Bootlegger', icon: 'assets/player_aids/icons/loric/bootlegger.png', aid: BOOTLEGGER_HOMEBREW },
  { id: 'gardener', name: 'Gardener', icon: 'assets/player_aids/icons/loric/gardener.png', aid: GARDENER_SEATING },
  { id: 'god-of-ug', name: 'God of Ug', icon: 'assets/player_aids/icons/loric/god_of_ug.png', aid: GOD_OF_UG_HAT },
  { id: 'hindu', name: 'Hindu', icon: 'assets/player_aids/icons/loric/hindu.png', aid: HINDU_REINCARNATION },
  { id: 'knaves', name: 'Knaves', icon: 'assets/player_aids/icons/loric/knaves.png', aid: KNAVES_STORYTELLERS },
  { id: 'pope', name: 'Pope', icon: 'assets/player_aids/icons/loric/pope.png', aid: POPE_DUPLICATES },
  { id: 'storm-catcher', name: 'Storm Catcher', icon: 'assets/player_aids/icons/loric/storm_catcher.png', aid: STORM_CATCHER_PROTECTION },
  { id: 'tor', name: 'Tor', icon: 'assets/player_aids/icons/loric/tor.png', aid: TOR_HIDDEN_CHARACTERS },
  { id: 'ventriloquist', name: 'Ventriloquist', icon: 'assets/player_aids/icons/loric/ventriloquist.png', aid: VENTRILOQUIST_NOMINATIONS },
  { id: 'zenomancer', name: 'Zenomancer', icon: 'assets/player_aids/icons/loric/zenomancer.png', aid: ZENOMANCER_GOALS },
];
