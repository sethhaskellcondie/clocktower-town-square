import { Injectable, OnDestroy, computed, signal } from '@angular/core';

export type AttractMode = 'off' | 'small' | 'large';
// Small is visited twice per cycle, so this records which way it's heading
export type AttractDirection = 'up' | 'down';

interface AttractState {
  mode: AttractMode;
  direction: AttractDirection;
  slotsLeft: number;
  endsAt: number;
}

const STORAGE_KEY = 'clocktower-attract-mode';
// The modes form a ladder, and every change moves exactly one rung
const MODE_ORDER: readonly AttractMode[] = ['off', 'small', 'large'];
const DIRECTIONS: readonly AttractDirection[] = ['up', 'down'];
const MINUTE_MS = 60_000;

// Holds the attract banner's state: its size, the open seats, and the
// countdown to the next game. Everything but the clock is kept in
// localStorage so a refresh picks up where it left off.
@Injectable({ providedIn: 'root' })
export class AttractModeService implements OnDestroy {
  readonly mode = signal<AttractMode>('off');
  readonly direction = signal<AttractDirection>('up');
  readonly slotsLeft = signal(0);
  // The countdown is stored as the moment it ends (epoch ms), so a refresh
  // or a sleeping laptop doesn't throw it off. 0 means already expired.
  readonly endsAt = signal(0);
  readonly now = signal(Date.now());

  readonly remainingMs = computed(() => Math.max(0, this.endsAt() - this.now()));

  // m:ss, or h:mm:ss once it's an hour or more
  readonly clockText = computed(() => {
    const totalSeconds = Math.ceil(this.remainingMs() / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return hours > 0 ? `${hours}:${String(minutes).padStart(2, '0')}:${seconds}` : `${minutes}:${seconds}`;
  });

  readonly countdownText = computed(() => this.remainingMs() === 0 ? "It's not too late, join mid game!" : `NEXT GAME IN ${this.clockText()}`);

  readonly slotsText = computed(() => {
    const slots = this.slotsLeft();
    if (slots === 0) return 'Game full — join the waitlist!';
    return slots === 1 ? '1 SEAT LEFT' : `${slots} SEATS LEFT`;
  });

  private tickTimer = setInterval(() => this.refreshNow(), 1000);

  constructor() {
    this.load();
  }

  ngOnDestroy(): void {
    clearInterval(this.tickTimer);
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

  addSlot(): void {
    this.slotsLeft.update(slots => slots + 1);
    this.save();
  }

  removeSlot(): void {
    this.slotsLeft.update(slots => Math.max(0, slots - 1));
    this.save();
  }

  // Measures from now when the timer has expired, so adding a minute to an
  // expired timer gives 1:00. Taking off more than is left clamps to 0.
  nudgeMinutes(minutes: number): void {
    const now = this.refreshNow();
    const endsAt = Math.max(this.endsAt(), now) + minutes * MINUTE_MS;
    this.endsAt.set(endsAt > now ? endsAt : 0);
    this.save();
  }

  setMinutes(minutes: number): void {
    if (!Number.isFinite(minutes)) return;
    const now = this.refreshNow();
    this.endsAt.set(minutes > 0 ? now + minutes * MINUTE_MS : 0);
    this.save();
  }

  resetCountdown(): void {
    this.endsAt.set(0);
    this.save();
  }

  // Returns true when the key was an attract hotkey, so the caller can
  // prevent its default. Typing in a field and Cmd/Ctrl/Alt shortcuts are
  // left alone; Shift is allowed since it picks the 5 minute nudge.
  handleKey(event: KeyboardEvent): boolean {
    if (event.metaKey || event.ctrlKey || event.altKey || isEditable(event.target)) {
      return false;
    }
    // event.code, not event.key, since Shift turns ] into }
    switch (event.code) {
      case 'KeyA':
        if (!event.repeat) this.cycleMode();
        return true;
      case 'ArrowUp':
        this.addSlot();
        return true;
      case 'ArrowDown':
        this.removeSlot();
        return true;
      case 'BracketRight':
        this.nudgeMinutes(event.shiftKey ? 5 : 1);
        return true;
      case 'BracketLeft':
        this.nudgeMinutes(event.shiftKey ? -5 : -1);
        return true;
      case 'KeyR':
        this.resetCountdown();
        return true;
      default:
        return false;
    }
  }

  private canSetMode(target: AttractMode): boolean {
    return Math.abs(MODE_ORDER.indexOf(target) - MODE_ORDER.indexOf(this.mode())) === 1;
  }

  private refreshNow(): number {
    const now = Date.now();
    this.now.set(now);
    return now;
  }

  private save(): void {
    const state: AttractState = {
      mode: this.mode(),
      direction: this.direction(),
      slotsLeft: this.slotsLeft(),
      endsAt: this.endsAt(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage can be full or blocked; the banner still works for this session
    }
  }

  // Each field falls back to its default on its own when it's missing or invalid
  private load(): void {
    let saved: Partial<AttractState> | null = null;
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
    if (Number.isInteger(saved.slotsLeft) && saved.slotsLeft! >= 0) {
      this.slotsLeft.set(saved.slotsLeft!);
    }
    if (Number.isFinite(saved.endsAt) && saved.endsAt! >= 0) {
      this.endsAt.set(saved.endsAt!);
    }
  }
}

export function isEditable(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
}
