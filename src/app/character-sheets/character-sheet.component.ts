import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Character } from './character';
import { Script } from '../scripts/script';
import { ALL_SCRIPT, TROUBLE_BREWING } from '../scripts/script-library';

// A heading on the sheet, with the characters of its type listed under it
export interface CharacterGroup {
  id: string;
  title: string;
  team: 'good' | 'evil';
  characters: Character[];
}

// The types the sheet lists, in the order a printed character sheet does.
// Travelers aren't on a character sheet, so they're left off.
const SHEET_GROUPS: readonly { id: string; title: string; type: string; team: 'good' | 'evil' }[] = [
  { id: 'townsfolk', title: 'Townsfolk', type: 'Townsfolk', team: 'good' },
  { id: 'outsiders', title: 'Outsiders', type: 'Outsider', team: 'good' },
  { id: 'minions', title: 'Minions', type: 'Minion', team: 'evil' },
  { id: 'demons', title: 'Demons', type: 'Demon', team: 'evil' },
];

// The first script is the one the sheet opens on
const SHEET_SCRIPTS: Script[] = [ALL_SCRIPT, TROUBLE_BREWING];

// A shelf on the right, mirroring the Player Aids shelf on the left, that
// shows the characters of the picked script grouped by type
@Component({
  selector: 'app-character-sheet',
  standalone: true,
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.scss'
})
export class CharacterSheetComponent {
  readonly scripts: readonly Script[] = SHEET_SCRIPTS;
  activeScript: Script = this.scripts[0];
  open = false;
  // Whether the dropdown for picking a script is showing
  scriptMenuOpen = false;

  @ViewChild('scriptPicker') scriptPicker?: ElementRef<HTMLElement>;

  constructor(private host: ElementRef<HTMLElement>) {}

  // The picked script's characters under their type's heading, leaving out
  // any type the script has none of
  get groups(): CharacterGroup[] {
    return SHEET_GROUPS
      .map(({ id, title, type, team }) => ({ id, title, team, characters: this.activeScript.characters.filter(c => c.type === type) }))
      .filter(group => group.characters.length > 0);
  }

  toggle(): void {
    if (this.open) {
      this.close();
    } else {
      this.open = true;
    }
  }

  // Closing the shelf closes the script dropdown with it
  close(): void {
    this.open = false;
    this.scriptMenuOpen = false;
  }

  toggleScriptMenu(): void {
    this.scriptMenuOpen = !this.scriptMenuOpen;
  }

  selectScript(script: Script): void {
    this.scriptMenuOpen = false;
    this.activeScript = script;
  }

  // Clicking anywhere outside the shelf closes it, and the script dropdown
  // likewise closes on any click outside of it. composedPath is read rather
  // than contains(), in case the click already removed its target.
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const path = event.composedPath();
    if (this.open && !path.includes(this.host.nativeElement)) {
      this.close();
    } else if (this.scriptMenuOpen && this.scriptPicker && !path.includes(this.scriptPicker.nativeElement)) {
      this.scriptMenuOpen = false;
    }
  }

  // Peel back one layer at a time: the script dropdown, then the shelf
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.scriptMenuOpen) {
      this.scriptMenuOpen = false;
    } else if (this.open) {
      this.close();
    }
  }
}
