import { Component, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player/player.component';
import { TravelerComponent } from './traveler/traveler.component';
import { LandmarkComponent } from './landmark/landmark.component';

interface PlayerData {
  number: number;
  initialX: number;
  initialY: number;
  texture: number;
}

interface TravelerData {
  number: number;
  initialX: number;
  initialY: number;
  texture: number;
}

interface LandmarkData {
  number: number;
  initialX: number;
  initialY: number;
  texture: number;
}

interface DeathToken {
  kind: 'player' | 'traveler';
  number: number;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, PlayerComponent, TravelerComponent, LandmarkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  title = 'clocktower-town-square';
  players: PlayerData[] = [{ number: 1, initialX: 100, initialY: 100, texture: 1 }];
  travelers: TravelerData[] = [];
  landmarks: LandmarkData[] = [];
  @ViewChildren(PlayerComponent) playerComponents!: QueryList<PlayerComponent>;
  @ViewChildren(TravelerComponent) travelerComponents!: QueryList<TravelerComponent>;
  @ViewChildren(LandmarkComponent) landmarkComponents!: QueryList<LandmarkComponent>;

  get alive(): number {
    if (!this.playerComponents) return this.players.length;
    return this.playerComponents.filter(p => p.state === 'alive' || p.state === 'marked for death' || p.state === 'killed during the night').length;
  }

  get ghostVotes(): number {
    let votes = 0;
    if (this.playerComponents) {
      votes += this.playerComponents.filter(p => p.state === 'dead with vote').length;
    }
    if (this.travelerComponents) {
      votes += this.travelerComponents.filter(t => t.state === 'dead with vote').length;
    }
    return votes;
  }

  get activeTravelers(): number {
    return this.travelerCount;
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
  isDay = false;
  pendingDeaths: DeathToken[] = [];
  revealAvailable = false;
  isSpinning = false;
  private spinTimer: ReturnType<typeof setTimeout> | null = null;
  private suspenseSound = new Audio('assets/sound_effects/reveal_suspense.mp3');
  private boomSound = new Audio('assets/sound_effects/reveal_boom.mp3');

  ngOnDestroy(): void {
    if (this.spinTimer) {
      clearTimeout(this.spinTimer);
    }
  }

  toggleDayNight(): void {
    if (this.isSpinning) return;
    this.isDay = !this.isDay;
    document.body.classList.toggle('day', this.isDay);
    if (this.isDay) {
      // Night -> day: hide who died and arm the reveal (even with zero kills)
      this.pendingDeaths = [];
      for (const p of this.playerComponents) {
        if (p.state === 'killed during the night') {
          this.pendingDeaths.push({ kind: 'player', number: p.number });
          p.state = 'alive';
        }
      }
      for (const t of this.travelerComponents) {
        if (t.state === 'killed during the night') {
          this.pendingDeaths.push({ kind: 'traveler', number: t.number });
          t.state = 'alive';
        }
      }
      this.revealAvailable = true;
    } else {
      // Day -> night without revealing: restore the night-kill marks
      for (const token of this.pendingDeaths) {
        const c = this.findComponent(token);
        if (c && c.state === 'alive') {
          c.state = 'killed during the night';
        }
      }
      this.pendingDeaths = [];
      this.revealAvailable = false;
    }
  }

  private findComponent(token: DeathToken): PlayerComponent | TravelerComponent | undefined {
    return token.kind === 'player'
      ? this.playerComponents?.find(p => p.number === token.number)
      : this.travelerComponents?.find(t => t.number === token.number);
  }

  private getParticipants(): (PlayerComponent | TravelerComponent)[] {
    const all: (PlayerComponent | TravelerComponent)[] = [
      ...this.playerComponents.toArray(),
      ...this.travelerComponents.toArray(),
    ].filter(c => c.state === 'alive' || c.state === 'marked for death');
    if (all.length === 0) return all;

    // Order by angle around the centroid so the highlight sweeps around the table
    const cx = all.reduce((sum, c) => sum + c.positionX, 0) / all.length;
    const cy = all.reduce((sum, c) => sum + c.positionY, 0) / all.length;
    return all
      .map(c => ({ c, angle: Math.atan2(c.positionY - cy, c.positionX - cx) }))
      .sort((a, b) => a.angle - b.angle)
      .map(x => x.c);
  }

  startReveal(): void {
    if (this.isSpinning || !this.revealAvailable) return;
    this.revealAvailable = false;

    const participants = this.getParticipants();
    if (participants.length === 0) {
      this.applyDeaths();
      return;
    }

    const victims = this.pendingDeaths
      .map(token => this.findComponent(token))
      .filter((c): c is PlayerComponent | TravelerComponent => !!c);
    const target = victims.length > 0
      ? victims[Math.floor(Math.random() * victims.length)]
      : participants[Math.floor(Math.random() * participants.length)];
    let targetIndex = participants.indexOf(target);
    if (targetIndex < 0) {
      targetIndex = Math.floor(Math.random() * participants.length);
    }

    const n = participants.length;
    const total = 5000 + Math.random() * 3000;
    let steps = 3 * n + targetIndex;
    while (steps < 25) {
      steps += n;
    }
    const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

    this.isSpinning = true;
    this.suspenseSound.currentTime = 0;
    this.suspenseSound.play().catch(() => {});
    let k = 0;
    let prev: PlayerComponent | TravelerComponent | null = null;
    const tick = () => {
      k++;
      if (prev) prev.isHighlighted = false;
      const current = participants[k % n];
      current.isHighlighted = true;
      prev = current;
      if (k >= steps) {
        this.finishReveal(current);
        return;
      }
      // Cumulative schedule follows ease-out, so gaps widen and the spin decelerates
      const delay = total * (easeOut((k + 1) / steps) - easeOut(k / steps));
      this.spinTimer = setTimeout(tick, delay);
    };
    tick();
  }

  private finishReveal(landed: PlayerComponent | TravelerComponent): void {
    this.suspenseSound.pause();
    this.suspenseSound.currentTime = 0;
    this.boomSound.currentTime = 0;
    this.boomSound.play().catch(() => {});
    // Pulse everyone about to die, not just the token the spin landed on.
    // Zero-death night: no pulse, just a short beat before the highlight clears.
    const victims = this.pendingDeaths
      .map(token => this.findComponent(token))
      .filter((c): c is PlayerComponent | TravelerComponent => !!c);
    for (const v of victims) {
      v.isWinner = true;
    }
    const delay = victims.length > 0 ? 1300 : 600;
    this.spinTimer = setTimeout(() => {
      for (const v of victims) {
        v.isWinner = false;
        v.isHighlighted = false;
      }
      landed.isHighlighted = false;
      this.applyDeaths();
      this.isSpinning = false;
    }, delay);
  }

  private applyDeaths(): void {
    for (const token of this.pendingDeaths) {
      const c = this.findComponent(token);
      if (c) {
        c.state = 'dead with vote';
        c.stateChange.emit(c.state);
      }
    }
    this.pendingDeaths = [];
  }

  get playerCount(): number {
    return this.players.length;
  }

  get travelerCount(): number {
    return this.travelers.length;
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

    const newNumber = highestNumber + 1;
    this.players.push({ number: newNumber, initialX: newX, initialY: newY, texture: (newNumber - 1) % 4 + 1 });
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

  addTraveler(): void {
    const highestNumber = this.travelers.length > 0 ? Math.max(...this.travelers.map(t => t.number)) : 0;

    // Get the last traveler component's current position, fall back to last player position
    const travelerArray = this.travelerComponents.toArray();
    const lastTraveler = travelerArray[travelerArray.length - 1];

    let newX: number;
    let newY: number;
    if (lastTraveler) {
      newX = lastTraveler.positionX + 50;
      newY = lastTraveler.positionY + 50;
    } else {
      const playerArray = this.playerComponents.toArray();
      const lastPlayer = playerArray[playerArray.length - 1];
      newX = lastPlayer ? lastPlayer.positionX + 50 : 200;
      newY = lastPlayer ? lastPlayer.positionY + 50 : 100;
    }

    const newNumber = highestNumber + 1;
    this.travelers.push({ number: newNumber, initialX: newX, initialY: newY, texture: (newNumber - 1) % 4 + 1 });
  }

  removeTraveler(): void {
    if (this.travelers.length > 0) {
      const highestNumber = Math.max(...this.travelers.map(t => t.number));
      const index = this.travelers.findIndex(t => t.number === highestNumber);
      this.travelers.splice(index, 1);
    }
  }

  onTravelerStateChange(): void {
    // This triggers change detection to update alive and ghostVotes counts
  }

  addLandmark(): void {
    const highestNumber = this.landmarks.length > 0 ? Math.max(...this.landmarks.map(l => l.number)) : 0;

    // Get the last landmark component's current position, fall back to last player position
    const landmarkArray = this.landmarkComponents.toArray();
    const lastLandmark = landmarkArray[landmarkArray.length - 1];

    let newX: number;
    let newY: number;
    if (lastLandmark) {
      newX = lastLandmark.positionX + 50;
      newY = lastLandmark.positionY + 50;
    } else {
      const playerArray = this.playerComponents.toArray();
      const lastPlayer = playerArray[playerArray.length - 1];
      newX = lastPlayer ? lastPlayer.positionX + 50 : 300;
      newY = lastPlayer ? lastPlayer.positionY + 50 : 100;
    }

    const newNumber = highestNumber + 1;
    this.landmarks.push({ number: newNumber, initialX: newX, initialY: newY, texture: (newNumber - 1) % 4 + 1 });
  }

  removeLandmark(): void {
    if (this.landmarks.length > 0) {
      const highestNumber = Math.max(...this.landmarks.map(l => l.number));
      const index = this.landmarks.findIndex(l => l.number === highestNumber);
      this.landmarks.splice(index, 1);
    }
  }
}
