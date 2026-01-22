import { Component, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player/player.component';
import { LandmarkComponent } from './landmark/landmark.component';

interface PlayerData {
  number: number;
  initialX: number;
  initialY: number;
}

interface LandmarkData {
  number: number;
  initialX: number;
  initialY: number;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, PlayerComponent, LandmarkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'clocktower-town-square';
  players: PlayerData[] = [{ number: 1, initialX: 100, initialY: 100 }];
  landmarks: LandmarkData[] = [{ number: 1, initialX: 300, initialY: 100 }];
  @ViewChildren(PlayerComponent) playerComponents!: QueryList<PlayerComponent>;
  @ViewChildren(LandmarkComponent) landmarkComponents!: QueryList<LandmarkComponent>;

  get alive(): number {
    if (!this.playerComponents) return this.players.length;
    return this.playerComponents.filter(p => p.state === 'alive').length;
  }

  get ghostVotes(): number {
    if (!this.playerComponents) return 0;
    return this.playerComponents.filter(p => p.state === 'dead with vote').length;
  }

  // Player spread based on player count
  private readonly playerSpread: { [key: number]: { townsfolk: number; outsiders: number; minions: number; demons: number } } = {
    5:  { townsfolk: 3, outsiders: 0, minions: 1, demons: 1 },
    6:  { townsfolk: 3, outsiders: 1, minions: 1, demons: 1 },
    7:  { townsfolk: 5, outsiders: 0, minions: 1, demons: 1 },
    8:  { townsfolk: 5, outsiders: 1, minions: 1, demons: 1 },
    9:  { townsfolk: 5, outsiders: 2, minions: 1, demons: 1 },
    10: { townsfolk: 7, outsiders: 0, minions: 2, demons: 1 },
    11: { townsfolk: 7, outsiders: 1, minions: 2, demons: 1 },
    12: { townsfolk: 7, outsiders: 2, minions: 2, demons: 1 },
    13: { townsfolk: 9, outsiders: 0, minions: 3, demons: 1 },
    14: { townsfolk: 9, outsiders: 1, minions: 3, demons: 1 },
    15: { townsfolk: 9, outsiders: 2, minions: 3, demons: 1 },
  };

  private getSpread(): { townsfolk: number; outsiders: number; minions: number; demons: number } {
    const count = this.playerCount;
    if (count < 5) {
      return { townsfolk: count - 1, outsiders: 0, minions: 0, demons: 1 };
    }
    if (count >= 15) {
      return this.playerSpread[15];
    }
    return this.playerSpread[count];
  }

  get townsfolk(): number {
    return this.getSpread().townsfolk;
  }

  get outsiders(): number {
    return this.getSpread().outsiders;
  }

  get minions(): number {
    return this.getSpread().minions;
  }

  get demons(): number {
    return this.getSpread().demons;
  }
  showSettings = true;
  tableSize: 'small' | 'medium' | 'large' = 'small';
  playerSize: 'small' | 'medium' | 'large' = 'small';

  get playerCount(): number {
    return this.players.length;
  }

  get landmarkCount(): number {
    return this.landmarks.length;
  }

  hideSettings(): void {
    this.showSettings = false;
  }

  displaySettings(): void {
    this.showSettings = true;
  }

  tableSizeUp(): void {
    if (this.tableSize === 'small') {
      this.tableSize = 'medium';
    } else if (this.tableSize === 'medium') {
      this.tableSize = 'large';
    }
  }

  tableSizeDown(): void {
    if (this.tableSize === 'large') {
      this.tableSize = 'medium';
    } else if (this.tableSize === 'medium') {
      this.tableSize = 'small';
    }
  }

  playerSizeUp(): void {
    if (this.playerSize === 'small') {
      this.playerSize = 'medium';
    } else if (this.playerSize === 'medium') {
      this.playerSize = 'large';
    }
  }

  playerSizeDown(): void {
    if (this.playerSize === 'large') {
      this.playerSize = 'medium';
    } else if (this.playerSize === 'medium') {
      this.playerSize = 'small';
    }
  }

  addPlayer(): void {
    const highestNumber = Math.max(...this.players.map(p => p.number));

    // Get the last player component's current position
    const playerArray = this.playerComponents.toArray();
    const lastPlayer = playerArray[playerArray.length - 1];

    const newX = lastPlayer ? lastPlayer.positionX + 50 : 100;
    const newY = lastPlayer ? lastPlayer.positionY + 50 : 100;

    this.players.push({ number: highestNumber + 1, initialX: newX, initialY: newY });
  }

  removePlayer(): void {
    if (this.players.length > 1) {
      const highestNumber = Math.max(...this.players.map(p => p.number));
      const index = this.players.findIndex(p => p.number === highestNumber);
      this.players.splice(index, 1);
    }
  }

  onPlayerStateChange(): void {
    // This triggers change detection to update alive and ghostVotes counts
  }

  addLandmark(): void {
    const highestNumber = Math.max(...this.landmarks.map(l => l.number));

    // Get the last landmark component's current position
    const landmarkArray = this.landmarkComponents.toArray();
    const lastLandmark = landmarkArray[landmarkArray.length - 1];

    const newX = lastLandmark ? lastLandmark.positionX + 50 : 300;
    const newY = lastLandmark ? lastLandmark.positionY + 50 : 100;

    this.landmarks.push({ number: highestNumber + 1, initialX: newX, initialY: newY });
  }

  removeLandmark(): void {
    if (this.landmarks.length > 1) {
      const highestNumber = Math.max(...this.landmarks.map(l => l.number));
      const index = this.landmarks.findIndex(l => l.number === highestNumber);
      this.landmarks.splice(index, 1);
    }
  }
}
