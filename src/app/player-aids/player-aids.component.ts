import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PLAYER_AIDS, PlayerAid } from './player-aids';

@Component({
  selector: 'app-player-aids',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-aids.component.html',
  styleUrl: './player-aids.component.scss'
})
export class PlayerAidsComponent {
  aids: PlayerAid[] = PLAYER_AIDS;
  shelfOpen = false;
  activeAid: PlayerAid | null = null;

  toggleShelf(): void {
    this.shelfOpen = !this.shelfOpen;
  }

  openAid(aid: PlayerAid): void {
    this.activeAid = aid;
  }

  closeAid(): void {
    this.activeAid = null;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    // Peel back one layer at a time: modal first, then the shelf
    if (this.activeAid) {
      this.closeAid();
    } else if (this.shelfOpen) {
      this.shelfOpen = false;
    }
  }
}
