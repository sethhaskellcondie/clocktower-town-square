import { Component, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player/player.component';

interface PlayerData {
  number: number;
  initialX: number;
  initialY: number;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, PlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'clocktower-town-square';
  players: PlayerData[] = [{ number: 1, initialX: 100, initialY: 100 }];
  @ViewChildren(PlayerComponent) playerComponents!: QueryList<PlayerComponent>;
  alive = 1;
  ghostVotes = 1;
  townsfolk = 1;
  outsiders = 1;
  minions = 1;
  demons = 1;
  showSettings = true;
  tableSize: 'small' | 'medium' | 'large' = 'small';
  playerSize: 'small' | 'medium' | 'large' = 'small';

  get playerCount(): number {
    return this.players.length;
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
}
