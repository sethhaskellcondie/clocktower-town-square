import { PlayerAid } from '../player-aids/player-aid';
import { PlayerAidScript } from '../player-aids/player-aid-script';
import { ALL_SCRIPT, BAD_MOON_RISING, TROUBLE_BREWING } from '../player-aids/player-aid-shelf';
import {
  ANGEL_PROTECTION,
  APPRENTICE_ABILITY,
  BEGGAR_VOTING,
  BIG_WIG_NOMINEES,
  BISHOP_NOMINATIONS,
  BOOTLEGGER_HOMEBREW,
  BUDDHIST_SILENCE,
  BUREAUCRAT_VOTES,
  DOOMSAYER_SACRIFICE,
  FIDDLER_CONTEST,
  GARDENER_SEATING,
  GOD_OF_UG_HAT,
  GUNSLINGER_SHOT,
  HELLS_LIBRARIAN_SILENCE,
  HINDU_REINCARNATION,
  JUDGE_RULING,
  KNAVES_STORYTELLERS,
  MATRON_SEATING,
  POPE_DUPLICATES,
  REVOLUTIONARY_NEIGHBORS,
  SCAPEGOAT_EXECUTION,
  STORM_CATCHER_PROTECTION,
  THIEF_VOTES,
  TOR_HIDDEN_CHARACTERS,
  VENTRILOQUIST_NOMINATIONS,
  VOUDON_VOTING,
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
  scripts?: readonly PlayerAidScript[];
}

// The travelers offered on traveler circles, in the same order as the
// shelf's Traveler sections
export const TRAVELER_CHARACTERS: readonly CharacterOption[] = [
  { id: 'scapegoat', name: 'Scapegoat', icon: 'assets/player_aids/icon_scapegoat.png', aid: SCAPEGOAT_EXECUTION, scripts: [TROUBLE_BREWING] },
  { id: 'gunslinger', name: 'Gunslinger', icon: 'assets/player_aids/icon_gunslinger.png', aid: GUNSLINGER_SHOT, scripts: [TROUBLE_BREWING] },
  { id: 'beggar', name: 'Beggar', icon: 'assets/player_aids/icon_beggar.png', aid: BEGGAR_VOTING, scripts: [TROUBLE_BREWING] },
  { id: 'bureaucrat', name: 'Bureaucrat', icon: 'assets/player_aids/icon_bureaucrat.png', aid: BUREAUCRAT_VOTES, scripts: [TROUBLE_BREWING] },
  { id: 'thief', name: 'Thief', icon: 'assets/player_aids/icon_thief.png', aid: THIEF_VOTES, scripts: [TROUBLE_BREWING] },
  { id: 'apprentice', name: 'Apprentice', icon: 'assets/player_aids/icon_apprentice.png', aid: APPRENTICE_ABILITY, scripts: [BAD_MOON_RISING] },
  { id: 'matron', name: 'Matron', icon: 'assets/player_aids/icon_matron.png', aid: MATRON_SEATING, scripts: [BAD_MOON_RISING] },
  { id: 'voudon', name: 'Voudon', icon: 'assets/player_aids/icon_voudon.png', aid: VOUDON_VOTING, scripts: [BAD_MOON_RISING] },
  { id: 'judge', name: 'Judge', icon: 'assets/player_aids/icon_judge.png', aid: JUDGE_RULING, scripts: [BAD_MOON_RISING] },
  { id: 'bishop', name: 'Bishop', icon: 'assets/player_aids/icon_bishop.png', aid: BISHOP_NOMINATIONS, scripts: [BAD_MOON_RISING] },
];

// The rows of travelers to offer while a script is picked on the shelf: one
// row of that script's travelers, or with "All" picked, a row for each script
// holding the travelers in it, so a traveler in two scripts shows in both
export function travelerRows(script: PlayerAidScript): CharacterOption[][] {
  const scripts = script === ALL_SCRIPT
    ? [...new Set(TRAVELER_CHARACTERS.flatMap(traveler => traveler.scripts ?? []))]
    : [script];
  return scripts
    .map(s => TRAVELER_CHARACTERS.filter(traveler => traveler.scripts?.includes(s)))
    .filter(row => row.length > 0);
}

// Fabled that are about a particular player, offered on player circles
export const PLAYER_FABLED: readonly CharacterOption[] = [
  { id: 'angel', name: 'Angel', icon: 'assets/player_aids/icon_angel.png', aid: ANGEL_PROTECTION },
  { id: 'buddhist', name: 'Buddhist', icon: 'assets/player_aids/icon_buddhist.png', aid: BUDDHIST_SILENCE },
  { id: 'doomsayer', name: 'Doomsayer', icon: 'assets/player_aids/icon_doomsayer.png', aid: DOOMSAYER_SACRIFICE },
  { id: 'revolutionary', name: 'Revolutionary', icon: 'assets/player_aids/icon_revolutionary.png', aid: REVOLUTIONARY_NEIGHBORS },
];

// Fabled that are about the game as a whole, offered on landmarks
export const LANDMARK_FABLED: readonly CharacterOption[] = [
  { id: 'fiddler', name: 'Fiddler', icon: 'assets/player_aids/icon_fiddler.png', aid: FIDDLER_CONTEST },
  { id: 'hells-librarian', name: "Hell's Librarian", icon: 'assets/player_aids/icon_hells_librarian.png', aid: HELLS_LIBRARIAN_SILENCE },
];

// Loric are about the game as a whole, so they're all offered on landmarks,
// in the same order as the shelf's Loric section
export const LANDMARK_LORIC: readonly CharacterOption[] = [
  { id: 'big-wig', name: 'Big Wig', icon: 'assets/player_aids/icon_big_wig.png', aid: BIG_WIG_NOMINEES },
  { id: 'bootlegger', name: 'Bootlegger', icon: 'assets/player_aids/icon_bootlegger.png', aid: BOOTLEGGER_HOMEBREW },
  { id: 'gardener', name: 'Gardener', icon: 'assets/player_aids/icon_gardener.png', aid: GARDENER_SEATING },
  { id: 'god-of-ug', name: 'God of Ug', icon: 'assets/player_aids/icon_god_of_ug.png', aid: GOD_OF_UG_HAT },
  { id: 'hindu', name: 'Hindu', icon: 'assets/player_aids/icon_hindu.png', aid: HINDU_REINCARNATION },
  { id: 'knaves', name: 'Knaves', icon: 'assets/player_aids/icon_knaves.png', aid: KNAVES_STORYTELLERS },
  { id: 'pope', name: 'Pope', icon: 'assets/player_aids/icon_pope.png', aid: POPE_DUPLICATES },
  { id: 'storm-catcher', name: 'Storm Catcher', icon: 'assets/player_aids/icon_storm_catcher.png', aid: STORM_CATCHER_PROTECTION },
  { id: 'tor', name: 'Tor', icon: 'assets/player_aids/icon_tor.png', aid: TOR_HIDDEN_CHARACTERS },
  { id: 'ventriloquist', name: 'Ventriloquist', icon: 'assets/player_aids/icon_ventriloquist.png', aid: VENTRILOQUIST_NOMINATIONS },
  { id: 'zenomancer', name: 'Zenomancer', icon: 'assets/player_aids/icon_zenomancer.png', aid: ZENOMANCER_GOALS },
];
