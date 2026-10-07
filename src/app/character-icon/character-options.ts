import { PlayerAid } from '../player-aids/player-aid';
import {
  ANGEL_PROTECTION,
  BEGGAR_VOTING,
  BUDDHIST_SILENCE,
  BUREAUCRAT_VOTES,
  DOOMSAYER_SACRIFICE,
  FIDDLER_CONTEST,
  GUNSLINGER_SHOT,
  HELLS_LIBRARIAN_SILENCE,
  REVOLUTIONARY_NEIGHBORS,
  SCAPEGOAT_EXECUTION,
  THIEF_VOTES,
} from '../player-aids/player-aid-library';

// A character that can be pinned beside a token on the board: its icon is
// shown there, and clicking it opens the character's player aid
export interface CharacterOption {
  id: string;
  name: string;
  icon: string;
  aid: PlayerAid;
}

// The five travelers, offered on traveler circles, in the same order as the
// shelf's Traveler section
export const TRAVELER_CHARACTERS: readonly CharacterOption[] = [
  { id: 'scapegoat', name: 'Scapegoat', icon: 'assets/player_aids/icon_scapegoat.png', aid: SCAPEGOAT_EXECUTION },
  { id: 'gunslinger', name: 'Gunslinger', icon: 'assets/player_aids/icon_gunslinger.png', aid: GUNSLINGER_SHOT },
  { id: 'beggar', name: 'Beggar', icon: 'assets/player_aids/icon_beggar.png', aid: BEGGAR_VOTING },
  { id: 'bureaucrat', name: 'Bureaucrat', icon: 'assets/player_aids/icon_bureaucrat.png', aid: BUREAUCRAT_VOTES },
  { id: 'thief', name: 'Thief', icon: 'assets/player_aids/icon_thief.png', aid: THIEF_VOTES },
];

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
