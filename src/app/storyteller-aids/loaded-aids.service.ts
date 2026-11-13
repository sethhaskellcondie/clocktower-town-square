import { Injectable, computed, signal } from '@angular/core';
import { STORYTELLER_AID_CATEGORIES, StorytellerAid } from './storyteller-aid';
import { STORYTELLER_AIDS } from './storyteller-aid-library';

const STORAGE_KEY = 'clocktower-storyteller-aids';

// Which storyteller aids are loaded: the ones that come round as the
// storyteller swipes through them. Each aid starts out as its category says,
// so the standard aids start out loaded and the character aids don't,
// including any added to the library later. The storyteller's own choices,
// every aid they've loaded or unloaded, are kept in localStorage so a
// refresh remembers them.
@Injectable({ providedIn: 'root' })
export class LoadedAidsService {
  // The storyteller's choices, by aid id: true for loaded, false for unloaded
  private readonly choices = signal<ReadonlyMap<string, boolean>>(new Map());

  // The loaded aids, in library order
  readonly aids = computed(() => STORYTELLER_AIDS.filter(aid => this.isLoaded(aid)));

  constructor() {
    this.load();
  }

  isLoaded(aid: StorytellerAid): boolean {
    return this.choices().get(aid.id) ?? STORYTELLER_AID_CATEGORIES[aid.category].startsLoaded;
  }

  // Unloads the aid if it's loaded, and loads it if it isn't
  toggle(aid: StorytellerAid): void {
    const choices = new Map(this.choices());
    choices.set(aid.id, !this.isLoaded(aid));
    this.choices.set(choices);
    this.save();
  }

  private save(): void {
    const ids = (loaded: boolean) => [...this.choices()].filter(([, choice]) => choice === loaded).map(([id]) => id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ loaded: ids(true), unloaded: ids(false) }));
    } catch {
      // Storage can be full or blocked; the aids still load and unload for this session
    }
  }

  // Anything missing or invalid leaves those aids as their categories say
  private load(): void {
    let saved: { loaded?: unknown; unloaded?: unknown } | null = null;
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
    } catch {
      return;
    }
    const choices = new Map<string, boolean>();
    for (const [ids, loaded] of [[saved?.loaded, true], [saved?.unloaded, false]] as const) {
      if (!Array.isArray(ids)) continue;
      for (const id of ids) {
        if (typeof id === 'string') choices.set(id, loaded);
      }
    }
    this.choices.set(choices);
  }
}
