import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type PlayerState = 'alive' | 'dead with vote' | 'dead without vote';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnInit {
  // Player attributes
  @Input() number = 1;
  @Input() initialX = 100;
  @Input() initialY = 100;
  name = '';
  state: PlayerState = 'alive';
  @Input() size: 'small' | 'medium' | 'large' = 'small';
  @Output() stateChange = new EventEmitter<PlayerState>();

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
    if (this.isDragging && !this.hasDragged) {
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
  }

  onNameKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.stopEditing();
    }
  }

  cycleState(): void {
    if (this.state === 'alive') {
      this.state = 'dead with vote';
    } else if (this.state === 'dead with vote') {
      this.state = 'dead without vote';
    } else if (this.state === 'dead without vote') {
      this.state = 'alive';
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
