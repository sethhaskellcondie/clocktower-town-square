import { Component } from '@angular/core';
import { PlayerComponent } from './player/player.component';

@Component({
  selector: 'app-root',
  imports: [PlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'clocktower-town-square';
  playerCount = 1;
  alive = 1;
  ghostVotes = 1;
  townsfolk = 1;
  outsiders = 1;
  minions = 1;
  demons = 1;
  showSettings = true;

  hideSettings(): void {
    this.showSettings = false;
  }

  displaySettings(): void {
    this.showSettings = true;
  }
}
