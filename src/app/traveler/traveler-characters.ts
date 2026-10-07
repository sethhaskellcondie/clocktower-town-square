import { PlayerAid } from '../player-aids/player-aid';
import {
  BEGGAR_VOTING,
  BUREAUCRAT_VOTES,
  GUNSLINGER_SHOT,
  SCAPEGOAT_EXECUTION,
  THIEF_VOTES,
} from '../player-aids/player-aid-library';

// A traveler character that can be pinned beside a traveler circle: its icon
// is shown on the board, and clicking it opens the character's player aid
export interface TravelerCharacter {
  id: string;
  name: string;
  icon: string;
  aid: PlayerAid;
}

// The five travelers, in the same order as the shelf's Traveler section
export const TRAVELER_CHARACTERS: readonly TravelerCharacter[] = [
  { id: 'scapegoat', name: 'Scapegoat', icon: 'assets/player_aids/icon_scapegoat.png', aid: SCAPEGOAT_EXECUTION },
  { id: 'gunslinger', name: 'Gunslinger', icon: 'assets/player_aids/icon_gunslinger.png', aid: GUNSLINGER_SHOT },
  { id: 'beggar', name: 'Beggar', icon: 'assets/player_aids/icon_beggar.png', aid: BEGGAR_VOTING },
  { id: 'bureaucrat', name: 'Bureaucrat', icon: 'assets/player_aids/icon_bureaucrat.png', aid: BUREAUCRAT_VOTES },
  { id: 'thief', name: 'Thief', icon: 'assets/player_aids/icon_thief.png', aid: THIEF_VOTES },
];
