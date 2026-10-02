import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerAidTextPart } from './player-aid';
import { PlayerAidShelf } from './player-aid-shelf';

@Component({
  selector: 'app-player-aids',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-aids.component.html',
  styleUrl: './player-aids.component.scss'
})
export class PlayerAidsComponent {
  shelf = new PlayerAidShelf();

  @ViewChild('modalBody') modalBody?: ElementRef<HTMLElement>;

  constructor(private host: ElementRef<HTMLElement>) {}

  showPrevious(): void {
    this.shelf.showPrevious();
    this.scrollToTop();
  }

  showNext(): void {
    this.shelf.showNext();
    this.scrollToTop();
  }

  // The modal stays put while its aid changes, so start each aid at the top
  private scrollToTop(): void {
    if (this.modalBody) {
      this.modalBody.nativeElement.scrollTop = 0;
    }
  }

  // Flatten a paragraph into one shape the template can render without
  // needing to narrow the string | icon | styled text union
  textParts(text: string | PlayerAidTextPart[]): { text?: string; icon?: string; alt?: string; style?: 'bold' | 'strike' }[] {
    const parts = typeof text === 'string' ? [text] : text;
    return parts.map(part => typeof part === 'string' ? { text: part } : part);
  }

  // Clicking anywhere outside the shelf closes it. The toggle button and the
  // aid modal live inside this component too, so clicks there are left alone.
  // composedPath is read rather than contains(), because the click may have
  // already removed its target (e.g. closing the modal from the backdrop).
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.shelf.open && !event.composedPath().includes(this.host.nativeElement)) {
      this.shelf.open = false;
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
