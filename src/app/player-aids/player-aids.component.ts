import { Component, ElementRef, HostListener, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Character } from '../character-sheets/character';
import { NightOrderStep, PlayerAid, PlayerAidTextPart } from './player-aid';
import { PlayerAidShelf } from './player-aid-shelf';

@Component({
  selector: 'app-player-aids',
  imports: [NgTemplateOutlet],
  templateUrl: './player-aids.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './player-aids.component.scss'
})
export class PlayerAidsComponent {
  shelf = new PlayerAidShelf();
  size: 'small' | 'medium' | 'large' = 'small';

  @ViewChild('modalBody') modalBody?: ElementRef<HTMLElement>;
  @ViewChild('groupPicker') groupPicker?: ElementRef<HTMLElement>;

  constructor(private host: ElementRef<HTMLElement>) {}

  show(aid: PlayerAid): void {
    this.shelf.show(aid);
    this.scrollToTop();
  }

  showPrevious(): void {
    this.shelf.showPrevious();
    this.scrollToTop();
  }

  showNext(): void {
    this.shelf.showNext();
    this.scrollToTop();
  }

  sizeUp(): void {
    if (this.size === 'small') {
      this.size = 'medium';
    } else if (this.size === 'medium') {
      this.size = 'large';
    }
  }

  sizeDown(): void {
    if (this.size === 'large') {
      this.size = 'medium';
    } else if (this.size === 'medium') {
      this.size = 'small';
    }
  }

  // The modal stays put while its aid changes, so start each aid at the top
  private scrollToTop(): void {
    if (this.modalBody) {
      this.modalBody.nativeElement.scrollTop = 0;
    }
  }

  // Open a character's aid from its icon in another aid's text
  showCharacter(character: Character): void {
    this.show(new PlayerAid({ character }));
  }

  // Flatten a paragraph into one shape the template can render without
  // needing to narrow the string | icon | character | styled text union
  textParts(text: string | PlayerAidTextPart[]): { text?: string; icon?: string; alt?: string; character?: Character; style?: 'bold' | 'strike' }[] {
    const parts = typeof text === 'string' ? [text] : text;
    return parts.map(part => typeof part === 'string' ? { text: part } : part);
  }

  // Flatten a night order's steps the same way, giving a character's step
  // the character's name and icon
  nightSteps(steps: readonly NightOrderStep[]): { name: string; icon: string; character?: Character; reminder: string | PlayerAidTextPart[] }[] {
    return steps.map(step => 'character' in step
      ? { name: step.character.name, icon: step.character.icon, character: step.character, reminder: step.reminder }
      : step);
  }

  // Clicking anywhere outside the shelf closes it. The toggle button and the
  // aid modal live inside this component too, so clicks there are left alone.
  // composedPath is read rather than contains(), because the click may have
  // already removed its target (e.g. closing the modal from the backdrop).
  // The group dropdown likewise closes on any click outside of it.
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const path = event.composedPath();
    if (this.shelf.open && !path.includes(this.host.nativeElement)) {
      this.shelf.close();
    } else if (this.shelf.groupMenuOpen && this.groupPicker && !path.includes(this.groupPicker.nativeElement)) {
      this.shelf.groupMenuOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.shelf.back();
  }

  @HostListener('document:keydown.arrowleft')
  onArrowLeft(): void {
    if (this.shelf.activeAid) {
      this.showPrevious();
    }
  }

  @HostListener('document:keydown.arrowright')
  onArrowRight(): void {
    if (this.shelf.activeAid) {
      this.showNext();
    }
  }
}
