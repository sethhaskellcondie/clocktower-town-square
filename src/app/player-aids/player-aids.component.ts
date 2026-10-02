import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PLAYER_AID_SECTIONS, PlayerAid, PlayerAidSection, PlayerAidTextPart } from './player-aids';

@Component({
  selector: 'app-player-aids',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-aids.component.html',
  styleUrl: './player-aids.component.scss'
})
export class PlayerAidsComponent {
  sections: PlayerAidSection[] = PLAYER_AID_SECTIONS;
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

  // A section counts as empty only when neither it nor any of its
  // subsections hold an aid
  isEmpty(section: PlayerAidSection): boolean {
    return section.aids.length === 0 && (section.subsections ?? []).every(sub => this.isEmpty(sub));
  }

  // Flatten a paragraph into one shape the template can render without
  // needing to narrow the string | icon | styled text union
  textParts(text: string | PlayerAidTextPart[]): { text?: string; icon?: string; alt?: string; style?: 'bold' | 'strike' }[] {
    const parts = typeof text === 'string' ? [text] : text;
    return parts.map(part => typeof part === 'string' ? { text: part } : part);
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
