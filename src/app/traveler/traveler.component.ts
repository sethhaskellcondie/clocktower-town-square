import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerAid } from '../player-aids/player-aid';
import { TRAVELER_CHARACTERS, TravelerCharacter } from './traveler-characters';

export type TravelerState = 'alive' | 'marked for death' | 'killed during the night' | 'dead with vote' | 'dead without vote';

@Component({
  selector: 'app-traveler',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './traveler.component.html',
  styleUrls: ['./traveler.component.scss', './traveler-character.scss']
})
export class TravelerComponent implements OnInit {
  // Traveler attributes
  @Input() number = 1;
  @Input() initialX = 100;
  @Input() initialY = 100;
  name = '';
  state: TravelerState = 'alive';
  @Input() size: 'small' | 'medium' | 'large' = 'small';
  @Input() texture = 1;
  @Input() isDay = false;
  @Input() locked = false;
  isHighlighted = false;
  isWinner = false;
  @Output() stateChange = new EventEmitter<TravelerState>();
  @Output() openAid = new EventEmitter<PlayerAid>();

  // The traveler character whose icon sits to the right of the circle
  character: TravelerCharacter | null = null;
  readonly characters = TRAVELER_CHARACTERS;
  isPickingCharacter = false;

  // Dragging position
  positionX = 0;
  positionY = 0;
  private isDragging = false;
  private hasDragged = false;
  private offsetX = 0;
  private offsetY = 0;

  // Editing state
  isEditing = false;
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.positionX = this.initialX;
    this.positionY = this.initialY;
  }

  onMouseDown(event: MouseEvent): void {
    if (event.button !== 0) return; // Only handle left-click
    this.isDragging = true;
    this.hasDragged = false;
    this.offsetX = event.clientX - this.positionX;
    this.offsetY = event.clientY - this.positionY;
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      this.hasDragged = true;
      this.positionX = event.clientX - this.offsetX;
      this.positionY = event.clientY - this.offsetY;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    if (this.isDragging && !this.hasDragged && !this.locked) {
      this.cycleState();
    }
    this.isDragging = false;
  }

  startEditing(): void {
    this.isEditing = true;
    setTimeout(() => {
      this.nameInput?.nativeElement?.focus();
    });
  }

  stopEditing(): void {
    this.isEditing = false;
    this.isPickingCharacter = false;
  }

  // Circle width for each size, so the character icon can sit beside it
  get diameter(): number {
    return { small: 120, medium: 160, large: 200 }[this.size];
  }

  togglePicker(): void {
    this.isPickingCharacter = !this.isPickingCharacter;
  }

  chooseCharacter(character: TravelerCharacter): void {
    this.character = character;
    this.isPickingCharacter = false;
  }

  removeCharacter(): void {
    this.character = null;
  }

  // The icon is a shortcut to the character's player aid, except while
  // editing, when it's covered by the remove button instead
  onCharacterClick(): void {
    if (this.character && !this.isEditing) {
      this.openAid.emit(this.character.aid);
    }
  }

  onNameKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.stopEditing();
    }
  }

  cycleState(): void {
    switch (this.state) {
      case 'alive':
        // 'marked for death' is only reachable during the day
        this.state = this.isDay ? 'marked for death' : 'killed during the night';
        break;
      case 'marked for death':
        // 'killed during the night' is only reachable at night
        this.state = this.isDay ? 'dead with vote' : 'killed during the night';
        break;
      case 'killed during the night':
        this.state = 'dead with vote';
        break;
      case 'dead with vote':
        this.state = 'dead without vote';
        break;
      case 'dead without vote':
        this.state = 'alive';
        break;
    }
    this.stateChange.emit(this.state);
  }

  onRightClick(event: MouseEvent): void {
    event.preventDefault();
    if (this.isEditing) {
      this.stopEditing();
    } else {
      this.startEditing();
    }
  }
}
