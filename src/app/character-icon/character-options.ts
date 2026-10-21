import { PlayerAid } from '../player-aids/player-aid';
import { PlayerAidScript } from '../player-aids/player-aid-script';
import { ALL_SCRIPT, BAD_MOON_RISING, SECTS_AND_VIOLETS, TROUBLE_BREWING } from '../player-aids/player-aid-shelf';
import {
  ANGEL_PROTECTION,
  APPRENTICE_ABILITY,
  BARISTA_SERVICE,
  BEGGAR_VOTING,
  BIG_WIG_NOMINEES,
  BISHOP_NOMINATIONS,
  BONE_COLLECTOR_REVIVAL,
  BOOTLEGGER_HOMEBREW,
  BUDDHIST_SILENCE,
  BUREAUCRAT_VOTES,
  BUTCHER_NOMINATION,
  DEUS_EX_FIASCO_MISTAKE,
  DEVIANT_EXILE,
  DOOMSAYER_SACRIFICE,
  FERRYMAN_VOTES,
  FIDDLER_CONTEST,
  GARDENER_SEATING,
  GOD_OF_UG_HAT,
  GUNSLINGER_SHOT,
  HARLOT_VISIT,
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
  { id: 'scapegoat', name: 'Scapegoat', icon: 'assets/player_aids/icons/trouble_brewing/travelers/scapegoat.png', aid: SCAPEGOAT_EXECUTION, scripts: [TROUBLE_BREWING] },
  { id: 'gunslinger', name: 'Gunslinger', icon: 'assets/player_aids/icons/trouble_brewing/travelers/gunslinger.png', aid: GUNSLINGER_SHOT, scripts: [TROUBLE_BREWING] },
  { id: 'beggar', name: 'Beggar', icon: 'assets/player_aids/icons/trouble_brewing/travelers/beggar.png', aid: BEGGAR_VOTING, scripts: [TROUBLE_BREWING] },
  { id: 'bureaucrat', name: 'Bureaucrat', icon: 'assets/player_aids/icons/trouble_brewing/travelers/bureaucrat.png', aid: BUREAUCRAT_VOTES, scripts: [TROUBLE_BREWING] },
  { id: 'thief', name: 'Thief', icon: 'assets/player_aids/icons/trouble_brewing/travelers/thief.png', aid: THIEF_VOTES, scripts: [TROUBLE_BREWING] },
  { id: 'apprentice', name: 'Apprentice', icon: 'assets/player_aids/icons/bad_moon_rising/travelers/apprentice.png', aid: APPRENTICE_ABILITY, scripts: [BAD_MOON_RISING] },
  { id: 'matron', name: 'Matron', icon: 'assets/player_aids/icons/bad_moon_rising/travelers/matron.png', aid: MATRON_SEATING, scripts: [BAD_MOON_RISING] },
  { id: 'voudon', name: 'Voudon', icon: 'assets/player_aids/icons/bad_moon_rising/travelers/voudon.png', aid: VOUDON_VOTING, scripts: [BAD_MOON_RISING] },
  { id: 'judge', name: 'Judge', icon: 'assets/player_aids/icons/bad_moon_rising/travelers/judge.png', aid: JUDGE_RULING, scripts: [BAD_MOON_RISING] },
  { id: 'bishop', name: 'Bishop', icon: 'assets/player_aids/icons/bad_moon_rising/travelers/bishop.png', aid: BISHOP_NOMINATIONS, scripts: [BAD_MOON_RISING] },
  { id: 'barista', name: 'Barista', icon: 'assets/player_aids/icons/sects_and_violets/travelers/barista.png', aid: BARISTA_SERVICE, scripts: [SECTS_AND_VIOLETS] },
  { id: 'harlot', name: 'Harlot', icon: 'assets/player_aids/icons/sects_and_violets/travelers/harlot.png', aid: HARLOT_VISIT, scripts: [SECTS_AND_VIOLETS] },
  { id: 'butcher', name: 'Butcher', icon: 'assets/player_aids/icons/sects_and_violets/travelers/butcher.png', aid: BUTCHER_NOMINATION, scripts: [SECTS_AND_VIOLETS] },
  { id: 'bone-collector', name: 'Bone Collector', icon: 'assets/player_aids/icons/sects_and_violets/travelers/bone_collector.png', aid: BONE_COLLECTOR_REVIVAL, scripts: [SECTS_AND_VIOLETS] },
  { id: 'deviant', name: 'Deviant', icon: 'assets/player_aids/icons/sects_and_violets/travelers/deviant.png', aid: DEVIANT_EXILE, scripts: [SECTS_AND_VIOLETS] },
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
