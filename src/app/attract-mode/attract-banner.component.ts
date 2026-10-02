import { Component, OnDestroy, effect, signal } from '@angular/core';
import { AttractModeService } from './attract-mode.service';
import { ATTRACT_REASONS } from './attract-reasons';

const REASON_ROTATION_MS = 6000;

// The banner that advertises the next game. It's always in the DOM so it can
// slide and grow between modes; the service decides which mode it's in.
@Component({
  selector: 'app-attract-banner',
  standalone: true,
  templateUrl: './attract-banner.component.html',
  styleUrl: './attract-banner.component.scss'
})
export class AttractBannerComponent implements OnDestroy {
  readonly reasons = ATTRACT_REASONS;
  readonly reasonIndex = signal(0);
  private rotationTimer: ReturnType<typeof setInterval> | null = null;

  constructor(readonly attract: AttractModeService) {
    // Reasons only rotate while they're on screen
    effect(() => {
      if (this.attract.mode() === 'large') {
        this.startRotation();
      } else {
        this.stopRotation();
      }
    });
  }

  ngOnDestroy(): void {
    this.stopRotation();
  }

  // The chevron grows the small header to full screen, and shrinks it back
  toggleSize(): void {
    this.attract.setMode(this.attract.mode() === 'large' ? 'small' : 'large');
  }

  private startRotation(): void {
    this.stopRotation();
    this.reasonIndex.set(0);
    this.rotationTimer = setInterval(() => {
      this.reasonIndex.update(index => (index + 1) % this.reasons.length);
    }, REASON_ROTATION_MS);
  }

  private stopRotation(): void {
    if (this.rotationTimer) {
      clearInterval(this.rotationTimer);
      this.rotationTimer = null;
    }
  }
}
