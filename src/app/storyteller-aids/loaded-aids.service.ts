import { Injectable, computed, signal } from '@angular/core';
import { StorytellerAid } from './storyteller-aid';
import { STORYTELLER_AIDS } from './storyteller-aid-library';

const STORAGE_KEY = 'clocktower-storyteller-aids';

// Which storyteller aids are loaded: the ones that come round as the
// storyteller swipes through them. Every aid starts out loaded, including
// any added to the library later. The ones the storyteller unloads are kept
// in localStorage so a refresh remembers them.
@Injectable({ providedIn: 'root' })
export class LoadedAidsService {
  private readonly unloadedIds = signal<ReadonlySet<string>>(new Set());

  // The loaded aids, in library order
  readonly aids = computed(() => STORYTELLER_AIDS.filter(aid => this.isLoaded(aid)));

  constructor() {
    this.load();
  }

  isLoaded(aid: StorytellerAid): boolean {
    return !this.unloadedIds().has(aid.id);
  }

  // Unloads the aid if it's loaded, and loads it if it isn't
  toggle(aid: StorytellerAid): void {
    const unloaded = new Set(this.unloadedIds());
    if (!unloaded.delete(aid.id)) unloaded.add(aid.id);
    this.unloadedIds.set(unloaded);
    this.save();
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ unloaded: [...this.unloadedIds()] }));
    } catch {
      // Storage can be full or blocked; the aids still load and unload for this session
    }
  }

  // Anything missing or invalid leaves every aid loaded
  private load(): void {
    let saved: { unloaded?: unknown } | null = null;
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
    } catch {
      return;
    }
    const ids = saved?.unloaded;
    if (Array.isArray(ids)) {
      this.unloadedIds.set(new Set(ids.filter((id): id is string => typeof id === 'string')));
    }
  }
}
