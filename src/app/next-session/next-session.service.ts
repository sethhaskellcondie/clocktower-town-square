import { Injectable, signal } from '@angular/core';
import { AttractDirection, AttractMode, isEditable } from '../attract-mode/attract-mode.service';

interface NextSessionState {
  mode: AttractMode;
  direction: AttractDirection;
}

const STORAGE_KEY = 'clocktower-next-session';
// Same ladder as the attract banner: off, then the footer (small), then full
// screen (large), and every change moves exactly one rung
const MODE_ORDER: readonly AttractMode[] = ['off', 'small', 'large'];
const DIRECTIONS: readonly AttractDirection[] = ['up', 'down'];

// Holds the next session shelf's size. It's kept in localStorage so a
// refresh picks up where it left off.
@Injectable({ providedIn: 'root' })
export class NextSessionService {
  readonly mode = signal<AttractMode>('off');
  readonly direction = signal<AttractDirection>('up');

  constructor() {
    this.load();
  }

  // Only steps to a neighboring mode; anything else (like Large -> Off) is ignored
  setMode(target: AttractMode): void {
    if (!this.canSetMode(target)) return;
    if (target === 'small') {
      this.direction.set(this.mode() === 'off' ? 'up' : 'down');
    }
    this.mode.set(target);
    this.save();
  }

  // Off -> Small -> Large -> Small -> Off
  cycleMode(): void {
    const mode = this.mode();
    if (mode === 'small') {
      this.setMode(this.direction() === 'up' ? 'large' : 'off');
    } else {
      this.setMode('small');
    }
  }

  // Returns true when the key was a next session hotkey, so the caller can
  // prevent its default. Typing in a field and modifier shortcuts are left alone.
  handleKey(event: KeyboardEvent): boolean {
    if (event.metaKey || event.ctrlKey || event.altKey || isEditable(event.target)) {
      return false;
    }
    // Q for the QR code
    if (event.code === 'KeyQ') {
      if (!event.repeat) this.cycleMode();
      return true;
    }
    return false;
  }

  private canSetMode(target: AttractMode): boolean {
    return Math.abs(MODE_ORDER.indexOf(target) - MODE_ORDER.indexOf(this.mode())) === 1;
  }

  private save(): void {
    const state: NextSessionState = {
      mode: this.mode(),
      direction: this.direction(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage can be full or blocked; the shelf still works for this session
    }
  }

  // Each field falls back to its default on its own when it's missing or invalid
  private load(): void {
    let saved: Partial<NextSessionState> | null = null;
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
    } catch {
      return;
    }
    if (!saved || typeof saved !== 'object') return;

    if (MODE_ORDER.includes(saved.mode as AttractMode)) {
      this.mode.set(saved.mode as AttractMode);
    }
    if (DIRECTIONS.includes(saved.direction as AttractDirection)) {
      this.direction.set(saved.direction as AttractDirection);
    }
  }
}
