import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NextSessionService } from './next-session.service';

// Swapped out for the next event's QR code before each deploy. Keep the same
// path and name so the shelf picks up the new one without a code change.
export const NEXT_SESSION_QR = 'assets/qr_next_session.png';

// The shelf that advertises the next session. It mirrors the attract banner
// from the bottom of the screen: a footer (small) that stretches to cover the
// screen (large). It's always in the DOM so it can slide between modes.
@Component({
  selector: 'app-next-session-shelf',
  templateUrl: './next-session-shelf.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './next-session-shelf.component.scss'
})
export class NextSessionShelfComponent {
  readonly qrSrc = NEXT_SESSION_QR;

  constructor(readonly nextSession: NextSessionService) {}

  // The chevron grows the footer to full screen, and shrinks it back
  toggleSize(): void {
    this.nextSession.setMode(this.nextSession.mode() === 'large' ? 'small' : 'large');
  }
}
