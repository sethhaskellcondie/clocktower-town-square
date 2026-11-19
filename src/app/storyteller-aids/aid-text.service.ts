import { Injectable, signal } from '@angular/core';
import { StorytellerAid } from './storyteller-aid';

const STORAGE_KEY = 'clocktower-storyteller-aid-text';

// The words the storyteller has written into the custom aids, in place of
// the ones they come with, like their own secret word on "Your secret word
// is haberdashery". They're kept in localStorage so a refresh remembers them.
@Injectable({ providedIn: 'root' })
export class AidTextService {
  // The storyteller's words, by aid id
  private readonly texts = signal<ReadonlyMap<string, string>>(new Map());

  constructor() {
    this.load();
  }

  // The aid as the storyteller has written it, or as it comes if they
  // haven't changed its words
  written(aid: StorytellerAid): StorytellerAid {
    const text = this.texts().get(aid.id);
    return text === undefined ? aid : aid.withEditableText(text);
  }

  // Writes these words into the aid, tidied of extra spaces. Writing none,
  // or the words it comes with, puts it back as it comes.
  write(aid: StorytellerAid, text: string): void {
    if (aid.editableText === undefined) return;
    const tidied = tidy(text);
    const texts = new Map(this.texts());
    if (!tidied || tidied === aid.editableText) {
      texts.delete(aid.id);
    } else {
      texts.set(aid.id, tidied);
    }
    this.texts.set(texts);
    this.save();
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(this.texts())));
    } catch {
      // Storage can be full or blocked; the words still change for this session
    }
  }

  // Anything missing or invalid leaves those aids as they come
  private load(): void {
    let saved: unknown = null;
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
    } catch {
      return;
    }
    if (typeof saved !== 'object' || saved === null || Array.isArray(saved)) return;
    const texts = new Map<string, string>();
    for (const [id, text] of Object.entries(saved)) {
      if (typeof text === 'string' && tidy(text)) texts.set(id, tidy(text));
    }
    this.texts.set(texts);
  }
}

// Without spaces at either end or more than one between words
export function tidy(text: string): string {
  return text.trim().replace(/\s+/g, ' ');
}
