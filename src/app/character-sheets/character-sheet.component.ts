import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Character } from './character';
import { PlayerAid } from '../player-aids/player-aid';
import { Script } from '../scripts/script';
import { ALL_SCRIPT, BAD_MOON_RISING, EXPERIMENTAL, FABLED_AND_LORIC, NO_GREATER_JOY, SECTS_AND_VIOLETS, TROUBLE_BREWING } from '../scripts/script-library';

// Travelers can be on either team, and the Fabled and Loric are on neither,
// so each of them gets a team of its own
type SheetTeam = 'good' | 'evil' | 'traveler' | 'fabled' | 'loric';

// A heading on the sheet, with the characters of its type listed under it
export interface CharacterGroup {
  id: string;
  title: string;
  team: SheetTeam;
  characters: Character[];
  // The number beside the group's first character, with the rest counting
  // on from it
  start: number;
}

// The types the sheet lists, in the order a printed character sheet does,
// with the travelers after, then the Fabled and Loric
const SHEET_GROUPS: readonly { id: string; title: string; type: string; team: SheetTeam }[] = [
  { id: 'townsfolk', title: 'Townsfolk', type: 'Townsfolk', team: 'good' },
  { id: 'outsiders', title: 'Outsiders', type: 'Outsider', team: 'good' },
  { id: 'minions', title: 'Minions', type: 'Minion', team: 'evil' },
  { id: 'demons', title: 'Demons', type: 'Demon', team: 'evil' },
  { id: 'travelers', title: 'Travelers', type: 'Traveler', team: 'traveler' },
  { id: 'fabled', title: 'Fabled', type: 'Fabled', team: 'fabled' },
  { id: 'loric', title: 'Loric', type: 'Loric', team: 'loric' },
];

// The first script is the one the sheet opens on
const SHEET_SCRIPTS: Script[] = [ALL_SCRIPT, TROUBLE_BREWING, BAD_MOON_RISING, SECTS_AND_VIOLETS, EXPERIMENTAL, FABLED_AND_LORIC, NO_GREATER_JOY];

// A shelf on the right, mirroring the Player Aids shelf on the left, that
// shows the characters of the picked script grouped by type
@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './character-sheet.component.scss'
})
export class CharacterSheetComponent implements OnChanges {
  // The aid the player aids modal is showing, if any, so the sheet knows
  // when an aid it opened has closed
  @Input() activeAid: PlayerAid | null = null;
  @Output() openAid = new EventEmitter<PlayerAid>();

  readonly scripts: readonly Script[] = SHEET_SCRIPTS;
  activeScript: Script = this.scripts[0];
  open = false;
  // Whether the dropdown for picking a script is showing
  scriptMenuOpen = false;
  // Scales the shelf, its icons and its text, stepped by the buttons beside
  // the first heading
  size: 'small' | 'medium' | 'large' = 'small';
  // Whether each character's ability is printed beneath its name
  showAbilities = false;

  // The aid opened from the sheet while it's showing, so the sheet can
  // reopen once it closes
  private sheetAid: PlayerAid | null = null;

  @ViewChild('scriptPicker') scriptPicker?: ElementRef<HTMLElement>;

  constructor(private host: ElementRef<HTMLElement>) {}

  // The sheet comes back once the aid it opened closes. Reopening here rather
  // than in the click or key that closed the aid keeps this sheet's own
  // outside-click and Escape handlers from shutting it again straight away.
  // If another aid takes its place, the sheet stays shut.
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeAid'] && this.sheetAid && this.activeAid !== this.sheetAid) {
      if (!this.activeAid) {
        this.open = true;
      }
      this.sheetAid = null;
    }
  }

  // The picked script's characters under their type's heading, leaving out
  // any type the script has none of. The characters are numbered by where
  // they fall on the sheet, top to bottom, carrying on from one heading to
  // the next, so the numbers belong to the sheet rather than the characters.
  get groups(): CharacterGroup[] {
    let next = 1;
    return SHEET_GROUPS
      .map(({ id, title, type, team }) => ({ id, title, team, characters: this.activeScript.characters.filter(c => c.type === type) }))
      .filter(group => group.characters.length > 0)
      .map(group => {
        const start = next;
        next += group.characters.length;
        return { ...group, start };
      });
  }

  // How many digits the last number runs to, so every number can be given
  // the same width and the icons beside them line up
  get numberDigits(): number {
    return String(this.groups.reduce((count, group) => count + group.characters.length, 0)).length;
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

  showCharacter(character: Character): void {
    this.showAid(new PlayerAid({ character }));
  }

  // The picked script's night order for the first night, or for the nights
  // after it, opens as an aid of its own
  showNightOrder(night: 'first' | 'other'): void {
    const nightOrder = this.activeScript.nightOrder;
    if (!nightOrder) {
      return;
    }
    const title = night === 'first' ? 'First Night' : 'Other Nights';
    const steps = night === 'first' ? nightOrder.firstNight : nightOrder.otherNights;
    this.showAid(new PlayerAid({ id: `${this.activeScript.id}-${night}-night`, title, blocks: [{ type: 'night-order', steps }] }));
  }

  // The sheet steps aside while an aid it opened is open
  private showAid(aid: PlayerAid): void {
    this.close();
    this.sheetAid = aid;
    this.openAid.emit(aid);
  }

  toggleAbilities(): void {
    this.showAbilities = !this.showAbilities;
  }

  sizeUp(): void {
    if (this.size === 'small') {
      this.size = 'medium';
    } else if (this.size === 'medium') {
      this.size = 'large';
    }
  }

  sizeDown(): void {
    if (this.size === 'large') {
      this.size = 'medium';
    } else if (this.size === 'medium') {
      this.size = 'small';
    }
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
