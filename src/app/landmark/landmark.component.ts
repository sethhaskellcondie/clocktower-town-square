import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landmark',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landmark.component.html',
  styleUrl: './landmark.component.scss'
})
export class LandmarkComponent implements OnInit {
  // Landmark attributes
  @Input() number = 1;
  @Input() initialX = 100;
  @Input() initialY = 100;
  name = '';
  @Input() size: 'small' | 'medium' | 'large' = 'small';

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
