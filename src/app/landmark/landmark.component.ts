import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlayerAid } from '../player-aids/player-aid';
import { CharacterIconComponent } from '../character-icon/character-icon.component';
import { CharacterOption, landmarkRows } from '../character-icon/character-options';
import { Script } from '../scripts/script';
import { ALL_SCRIPT } from '../scripts/script-library';

@Component({
  selector: 'app-landmark',
  imports: [FormsModule, CharacterIconComponent],
  templateUrl: './landmark.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './landmark.component.scss'
})
export class LandmarkComponent implements OnInit {
  // Landmark attributes
  @Input() number = 1;
  @Input() initialX = 100;
  @Input() initialY = 100;
  name = '';
  @Input() size: 'small' | 'medium' | 'large' = 'small';
  @Input() texture = 1;
  @Output() openAid = new EventEmitter<PlayerAid>();
  // The Fabled offered follow the script picked on the character sheet
  @Input() set script(script: Script) {
    this.characterRows = landmarkRows(script);
  }
  characterRows: (readonly CharacterOption[])[] = landmarkRows(ALL_SCRIPT);

  // Dragging position
  positionX = 0;
  positionY = 0;
  private isDragging = false;
  private offsetX = 0;
  private offsetY = 0;

  // Editing state
  isEditing = false;
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.positionX = this.initialX;
    this.positionY = this.initialY;
  }

  onMouseDown(event: MouseEvent): void {
    if (event.button !== 0) return; // Only handle left-click
    this.isDragging = true;
    this.offsetX = event.clientX - this.positionX;
    this.offsetY = event.clientY - this.positionY;
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      this.positionX = event.clientX - this.offsetX;
      this.positionY = event.clientY - this.offsetY;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
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
  }

  onNameKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.stopEditing();
    }
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
