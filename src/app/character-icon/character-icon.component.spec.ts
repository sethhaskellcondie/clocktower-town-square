import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CharacterIconComponent } from './character-icon.component';
import { CharacterOption, LANDMARK_FABLED, LANDMARK_LORIC, PLAYER_FABLED, TRAVELER_CHARACTERS, landmarkRows, travelerRows } from './character-options';
import { PlayerAid } from '../player-aids/player-aid';
import { Script } from '../scripts/script';
import {
  A_GRIMM_CHORUS,
  ALL_SCRIPT,
  BAD_MOON_RISING,
  EXPERIMENTAL,
  HIDE_AND_SEEK,
  LUNAR_ECLIPSE,
  NO_GREATER_JOY,
  ONE_IN_ONE_OUT,
  RACE_TO_THE_BOTTOM,
  SECTS_AND_VIOLETS,
  TROUBLE_BREWING,
} from '../scripts/script-library';
import { PlayerComponent } from '../player/player.component';
import { TravelerComponent } from '../traveler/traveler.component';
import { LandmarkComponent } from '../landmark/landmark.component';
import { DJINN, DJINN_A_GRIMM_CHORUS } from '../character-sheets/character-library';

const TB_TRAVELERS = ['Scapegoat', 'Gunslinger', 'Beggar', 'Bureaucrat', 'Thief'];
const BMR_TRAVELERS = ['Apprentice', 'Matron', 'Voudon', 'Judge', 'Bishop'];
const SNV_TRAVELERS = ['Barista', 'Harlot', 'Butcher', 'Bone Collector', 'Deviant'];
const EXPERIMENTAL_TRAVELERS = ['Gangster', 'Gnome', 'Cacklejack'];
const LANDMARK_FABLED_NAMES = ['Fiddler', "Hell's Librarian", 'Toymaker', 'Djinn', 'Duchess', 'Fibbin', 'Sentinel', 'Spirit of Ivory', 'Deus ex Fiasco', 'Ferryman'];
const LANDMARK_LORIC_NAMES = ['Big Wig', 'Bootlegger', 'Gardener', 'God of Ug', 'Hindu', 'Knaves', 'Pope', 'Storm Catcher', 'Tor', 'Ventriloquist', 'Zenomancer'];

// Each token on the board offers its own set of character icons, a row at a
// time. Travelers start on the "All" script, with a row for each script.
const TOKENS: { kind: string; component: Type<PlayerComponent | TravelerComponent | LandmarkComponent>; tokenClass: string; rows: string[][] }[] = [
  {
    kind: 'traveler',
    component: TravelerComponent,
    tokenClass: '.traveler-circle',
    rows: [TB_TRAVELERS, BMR_TRAVELERS, SNV_TRAVELERS, EXPERIMENTAL_TRAVELERS],
  },
  {
    kind: 'player',
    component: PlayerComponent,
    tokenClass: '.player-circle',
    rows: [['Angel', 'Buddhist', 'Doomsayer', 'Revolutionary']],
  },
  {
    kind: 'landmark',
    component: LandmarkComponent,
    tokenClass: '.landmark-square',
    rows: [LANDMARK_FABLED_NAMES, LANDMARK_LORIC_NAMES],
  },
];

function pickerRows(el: HTMLElement): (string | null)[][] {
  return Array.from(el.querySelectorAll('.character-row')).map(row =>
    Array.from(row.querySelectorAll('.character-option')).map(o => o.getAttribute('title')));
}

for (const token of TOKENS) {
  describe(`Character icon on a ${token.kind}`, () => {
    let fixture: ComponentFixture<PlayerComponent | TravelerComponent | LandmarkComponent>;
    let el: HTMLElement;
    let icon: CharacterIconComponent;
    const id = (suffix: string) => `#${token.kind}_3_character${suffix}`;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [token.component],
      }).compileComponents();
      fixture = TestBed.createComponent(token.component);
      fixture.componentInstance.number = 3;
      el = fixture.nativeElement;
      fixture.detectChanges();
      icon = fixture.debugElement.query(By.directive(CharacterIconComponent)).componentInstance;
    });

    function query(selector: string): HTMLElement | null {
      return el.querySelector(selector);
    }

    function click(selector: string): void {
      query(selector)!.click();
      fixture.detectChanges();
    }

    function toggleEditing(): void {
      query(token.tokenClass)!.dispatchEvent(new MouseEvent('contextmenu', { cancelable: true }));
      fixture.detectChanges();
    }

    it('offers a + beside the token only while editing', () => {
      expect(query(id('_add'))).toBeNull();
      toggleEditing();
      expect(query(id('_add'))).not.toBeNull();
      toggleEditing();
      expect(query(id('_add'))).toBeNull();
    });

    it(`picks from the ${token.kind}'s own characters`, () => {
      toggleEditing();
      click(id('_add'));
      expect(pickerRows(el)).toEqual(token.rows);

      const options = icon.optionRows.flat();
      const last = options[options.length - 1];
      click(id('_' + last.id));
      expect(icon.character).toBe(last);
      expect(query('.character-picker')).toBeNull();
      expect(query(id('_add'))).toBeNull();
      expect(query(id('') + ' img')?.getAttribute('src')).toBe(last.icon);
    });

    it('closes the picker when editing ends', () => {
      toggleEditing();
      click(id('_add'));
      toggleEditing();
      expect(icon.isPicking).toBeFalse();
    });

    it('keeps the name input focused when the + is pressed, so editing carries on', () => {
      toggleEditing();
      const press = new MouseEvent('mousedown', { cancelable: true });
      query(id('_add'))!.dispatchEvent(press);
      expect(press.defaultPrevented).toBeTrue();
    });

    it('removes the icon with the X shown over it while editing', () => {
      icon.choose(icon.optionRows[0][0]);
      fixture.detectChanges();
      expect(query(id(''))).not.toBeNull();
      expect(query(id('_remove'))).toBeNull();

      toggleEditing();
      click(id('_remove'));
      expect(icon.character).toBeNull();
      expect(query(id(''))).toBeNull();
      expect(query(id('_add'))).not.toBeNull();
    });

    it("opens the character's player aid when the icon is clicked outside of editing", () => {
      const opened: PlayerAid[] = [];
      fixture.componentInstance.openAid.subscribe(aid => opened.push(aid));
      const first = icon.optionRows[0][0];
      icon.choose(first);
      fixture.detectChanges();

      click(id(''));
      expect(opened).toEqual([first.aid]);

      toggleEditing();
      icon.onIconClick();
      expect(opened.length).toBe(1);
    });
  });
}

describe('Traveler options', () => {
  let fixture: ComponentFixture<TravelerComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TravelerComponent] }).compileComponents();
    fixture = TestBed.createComponent(TravelerComponent);
    el = fixture.nativeElement;
    fixture.detectChanges();
    el.querySelector('.traveler-circle')!.dispatchEvent(new MouseEvent('contextmenu', { cancelable: true }));
    fixture.detectChanges();
    (el.querySelector('#traveler_1_character_add') as HTMLElement).click();
    fixture.detectChanges();
  });

  it("offers only the picked script's travelers", () => {
    fixture.componentRef.setInput('script', TROUBLE_BREWING);
    fixture.detectChanges();
    expect(pickerRows(el)).toEqual([TB_TRAVELERS]);

    fixture.componentRef.setInput('script', BAD_MOON_RISING);
    fixture.detectChanges();
    expect(pickerRows(el)).toEqual([BMR_TRAVELERS]);

    fixture.componentRef.setInput('script', SECTS_AND_VIOLETS);
    fixture.detectChanges();
    expect(pickerRows(el)).toEqual([SNV_TRAVELERS]);

    fixture.componentRef.setInput('script', EXPERIMENTAL);
    fixture.detectChanges();
    expect(pickerRows(el)).toEqual([EXPERIMENTAL_TRAVELERS]);
  });

  it('offers the travelers a custom script recommends, and none when it recommends none', () => {
    fixture.componentRef.setInput('script', RACE_TO_THE_BOTTOM);
    fixture.detectChanges();
    expect(pickerRows(el)).toEqual([['Scapegoat', 'Beggar', 'Bishop', 'Barista', 'Harlot']]);

    fixture.componentRef.setInput('script', A_GRIMM_CHORUS);
    fixture.detectChanges();
    expect(pickerRows(el)).toEqual([['Scapegoat', 'Beggar', 'Thief', 'Judge', 'Harlot']]);

    fixture.componentRef.setInput('script', LUNAR_ECLIPSE);
    fixture.detectChanges();
    expect(pickerRows(el)).toEqual([['Beggar', 'Apprentice', 'Voudon', 'Barista', 'Harlot']]);

    fixture.componentRef.setInput('script', NO_GREATER_JOY);
    fixture.detectChanges();
    expect(pickerRows(el)).toEqual([]);

    fixture.componentRef.setInput('script', HIDE_AND_SEEK);
    fixture.detectChanges();
    expect(pickerRows(el)).toEqual([]);
  });

  it('offers a row for each script when "All" is picked', () => {
    fixture.componentRef.setInput('script', BAD_MOON_RISING);
    fixture.detectChanges();
    fixture.componentRef.setInput('script', ALL_SCRIPT);
    fixture.detectChanges();
    expect(pickerRows(el)).toEqual([TB_TRAVELERS, BMR_TRAVELERS, SNV_TRAVELERS, EXPERIMENTAL_TRAVELERS]);
  });
});

describe('Landmark options', () => {
  let fixture: ComponentFixture<LandmarkComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [LandmarkComponent] }).compileComponents();
    fixture = TestBed.createComponent(LandmarkComponent);
    el = fixture.nativeElement;
    fixture.detectChanges();
    el.querySelector('.landmark-square')!.dispatchEvent(new MouseEvent('contextmenu', { cancelable: true }));
    fixture.detectChanges();
    (el.querySelector('#landmark_1_character_add') as HTMLElement).click();
    fixture.detectChanges();
  });

  // The landmark's Fabled, with a script's own Djinn in the Djinn's place
  const withDjinn = (name: string) => LANDMARK_FABLED_NAMES.map(fabled => fabled === 'Djinn' ? name : fabled);

  it("offers a script's own Djinn in the Djinn's place, only while that script is picked", () => {
    const expected: [Script, string][] = [
      [A_GRIMM_CHORUS, 'Djinn, A Grimm Chorus'],
      [LUNAR_ECLIPSE, 'Djinn, Lunar Eclipse'],
      [ONE_IN_ONE_OUT, 'Djinn, One in one out'],
    ];
    for (const [script, name] of expected) {
      fixture.componentRef.setInput('script', script);
      fixture.detectChanges();
      expect(pickerRows(el)).withContext(script.name).toEqual([withDjinn(name), LANDMARK_LORIC_NAMES]);
    }

    for (const script of [HIDE_AND_SEEK, TROUBLE_BREWING, ALL_SCRIPT]) {
      fixture.componentRef.setInput('script', script);
      fixture.detectChanges();
      expect(pickerRows(el)).withContext(script.name).toEqual([LANDMARK_FABLED_NAMES, LANDMARK_LORIC_NAMES]);
    }
  });

  it("opens the script's own Djinn's aid, with its jinxes", () => {
    const option = landmarkRows(A_GRIMM_CHORUS)[0].find(fabled => fabled.id === DJINN_A_GRIMM_CHORUS.id)!;
    expect(option.aid.character).toBe(DJINN_A_GRIMM_CHORUS);
    expect(option.aid.blocks).toContain({ type: 'heading', text: 'Jinxes' });
    expect(landmarkRows(ALL_SCRIPT)[0].find(fabled => fabled.id === DJINN.id)?.aid.character).toBe(DJINN);
  });
});

describe('Character options', () => {
  it("opens each traveler's character aid", () => {
    for (const traveler of TRAVELER_CHARACTERS) {
      expect(traveler.aid.character?.id).withContext(traveler.name).toBe(traveler.id);
      expect(traveler.aid.character?.type).withContext(traveler.name).toBe('Traveler');
    }
  });

  it("opens each Fabled and Loric's character aid", () => {
    const expected: [readonly CharacterOption[], string][] = [
      [PLAYER_FABLED, 'Fabled'],
      [LANDMARK_FABLED, 'Fabled'],
      [LANDMARK_LORIC, 'Loric'],
    ];
    for (const [options, type] of expected) {
      for (const option of options) {
        expect(option.aid.character?.id).withContext(option.name).toBe(option.id);
        expect(option.aid.character?.type).withContext(option.name).toBe(type);
      }
    }
  });

  it('gives every traveler a script', () => {
    for (const traveler of TRAVELER_CHARACTERS) {
      expect(traveler.scripts?.length).withContext(traveler.name).toBeGreaterThan(0);
    }
  });

  it('lists every traveler once when "All" is picked, in the row of the script it comes from', () => {
    const rows = travelerRows(ALL_SCRIPT);
    expect(rows.flat().length).toBe(TRAVELER_CHARACTERS.length);
    expect(new Set(rows.flat()).size).toBe(TRAVELER_CHARACTERS.length);
    for (const row of rows) {
      expect(new Set(row.map(traveler => traveler.scripts?.[0])).size).toBe(1);
    }
  });
});
