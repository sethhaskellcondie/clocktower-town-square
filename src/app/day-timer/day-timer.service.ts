import { Injectable, OnDestroy, computed, signal } from '@angular/core';
import { isEditable } from '../attract-mode/attract-mode.service';

const SECOND_MS = 1000;
// How long "Time's up" pulses and the bell tolls before both stop
const TIMES_UP_MS = 10_000;
const BELL_FADE_MS = 3000;
const BELL_FADE_STEP_MS = 50;

// Counts down the day's discussion. When it runs out it shows "Time's up"
// and tolls the bell for a while, then clears the text and fades the bell
// out. Only meant for the day, so nothing is kept across a refresh.
@Injectable({ providedIn: 'root' })
export class DayTimerService implements OnDestroy {
  // Stored as the moment it ends (epoch ms), like the attract countdown.
  // 0 means it isn't running.
  readonly endsAt = signal(0);
  readonly now = signal(Date.now());
  readonly timesUp = signal(false);

  readonly remainingMs = computed(() => Math.max(0, this.endsAt() - this.now()));

  // m:ss, letting the minutes run past 59 since days rarely go that long
  readonly clockText = computed(() => {
    const totalSeconds = Math.ceil(this.remainingMs() / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  });

  readonly bell = new Audio('assets/sound_effects/bell_tolls.mp3');

  private tickTimer = setInterval(() => this.refreshNow(), 1000);
  private timesUpTimer: ReturnType<typeof setTimeout> | null = null;
  private tollTimer: ReturnType<typeof setTimeout> | null = null;
  private fadeTimer: ReturnType<typeof setInterval> | null = null;

  ngOnDestroy(): void {
    clearInterval(this.tickTimer);
    this.clearTimesUpTimer();
    this.clearTollTimer();
    this.stopBell();
  }

  // Measures from now when the timer isn't running, so adding 30 seconds gives
  // 0:30. Taking off more than is left stops it quietly, without the bell.
  nudgeSeconds(seconds: number): void {
    const now = this.refreshNow();
    const endsAt = Math.max(this.endsAt(), now) + seconds * SECOND_MS;
    if (endsAt > now) this.endTimesUp();
    this.endsAt.set(endsAt > now ? endsAt : 0);
  }

  setMinutes(minutes: number): void {
    if (!Number.isFinite(minutes)) return;
    const now = this.refreshNow();
    if (minutes > 0) this.endTimesUp();
    this.endsAt.set(minutes > 0 ? now + minutes * 60 * SECOND_MS : 0);
  }

  // Stops the countdown, and cuts a ringing "Time's up" or toll short
  reset(): void {
    this.endsAt.set(0);
    this.endTimesUp();
    this.endToll();
  }

  // Tolls the bell on demand, for as long as "Time's up" would, without
  // touching the countdown. Pressing it again restarts the toll.
  tollBell(): void {
    this.clearTollTimer();
    this.stopBell();
    this.bell.currentTime = 0;
    this.bell.play().catch(() => {});
    this.tollTimer = setTimeout(() => this.endToll(), TIMES_UP_MS);
  }

  // Returns true when the key was a day timer hotkey, so the caller can
  // prevent its default. Same rules as the attract hotkeys: Shift picks the
  // 5 minute nudge, and fields and Cmd/Ctrl/Alt shortcuts are left alone.
  handleKey(event: KeyboardEvent): boolean {
    if (event.metaKey || event.ctrlKey || event.altKey || isEditable(event.target)) {
      return false;
    }
    // event.code, not event.key, since Shift turns = into +
    switch (event.code) {
      case 'Equal':
        this.nudgeSeconds(event.shiftKey ? 300 : 30);
        return true;
      case 'Minus':
        this.nudgeSeconds(event.shiftKey ? -300 : -30);
        return true;
      case 'Digit0':
        this.reset();
        return true;
      default:
        return false;
    }
  }

  private refreshNow(): number {
    const now = Date.now();
    this.now.set(now);
    if (this.endsAt() > 0 && now >= this.endsAt()) {
      this.endsAt.set(0);
      this.startTimesUp();
    }
    return now;
  }

  private startTimesUp(): void {
    this.clearTimesUpTimer();
    this.clearTollTimer();
    this.stopBell();
    this.timesUp.set(true);
    this.bell.currentTime = 0;
    this.bell.play().catch(() => {});
    this.timesUpTimer = setTimeout(() => this.endTimesUp(), TIMES_UP_MS);
  }

  // The text clears at once; the bell fades so it doesn't cut off mid toll
  private endTimesUp(): void {
    if (!this.timesUp()) return;
    this.clearTimesUpTimer();
    this.timesUp.set(false);
    this.fadeOutBell();
  }

  private endToll(): void {
    if (!this.tollTimer) return;
    this.clearTollTimer();
    this.fadeOutBell();
  }

  private fadeOutBell(): void {
    const step = BELL_FADE_STEP_MS / BELL_FADE_MS;
    this.fadeTimer = setInterval(() => {
      const volume = this.bell.volume - step;
      if (volume <= 0) {
        this.stopBell();
      } else {
        this.bell.volume = volume;
      }
    }, BELL_FADE_STEP_MS);
  }

  private stopBell(): void {
    if (this.fadeTimer) {
      clearInterval(this.fadeTimer);
      this.fadeTimer = null;
    }
    this.bell.pause();
    this.bell.volume = 1;
  }

  private clearTimesUpTimer(): void {
    if (this.timesUpTimer) {
      clearTimeout(this.timesUpTimer);
      this.timesUpTimer = null;
    }
  }

  private clearTollTimer(): void {
    if (this.tollTimer) {
      clearTimeout(this.tollTimer);
      this.tollTimer = null;
    }
  }
}
