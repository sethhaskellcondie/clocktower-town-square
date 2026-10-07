import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PlayerAid } from '../player-aids/player-aid';
import { CharacterOption } from './character-options';

// The character icon that sits just right of a token on the board. While the
// token is being edited a + picks the icon and an X over it removes it;
// otherwise clicking the icon opens the character's player aid.
@Component({
  selector: 'app-character-icon',
  standalone: true,
  templateUrl: './character-icon.component.html',
  styleUrl: './character-icon.component.scss'
})
export class CharacterIconComponent implements OnChanges {
  @Input({ required: true }) options!: readonly CharacterOption[];
  @Input() idPrefix = '';
  @Input() isEditing = false;
  @Input() size: 'small' | 'medium' | 'large' = 'small';
  // The token's top-left corner, which the icon is placed relative to
  @Input() tokenX = 0;
  @Input() tokenY = 0;
  @Output() openAid = new EventEmitter<PlayerAid>();

  character: CharacterOption | null = null;
  isPicking = false;

  // The picker only makes sense while editing, so it closes along with it
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditing'] && !this.isEditing) {
      this.isPicking = false;
    }
  }

  // Token width for each size, so the icon can sit beside it
  get tokenWidth(): number {
    return { small: 120, medium: 160, large: 200 }[this.size];
  }

  togglePicker(): void {
    this.isPicking = !this.isPicking;
  }

  choose(character: CharacterOption): void {
    this.character = character;
    this.isPicking = false;
  }

  remove(): void {
    this.character = null;
  }

  // The icon is a shortcut to the character's player aid, except while
  // editing, when it's covered by the remove button instead
  onIconClick(): void {
    if (this.character && !this.isEditing) {
      this.openAid.emit(this.character.aid);
    }
  }
}
