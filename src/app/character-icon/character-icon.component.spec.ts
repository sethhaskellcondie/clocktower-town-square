import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CharacterIconComponent } from './character-icon.component';
import { LANDMARK_FABLED, LANDMARK_LORIC, PLAYER_FABLED, TRAVELER_CHARACTERS, travelerRows } from './character-options';
import { PlayerAid } from '../player-aids/player-aid';
import { PlayerAidShelf } from '../player-aids/player-aid-shelf';
import { ALL_SCRIPT, BAD_MOON_RISING, EXPERIMENTAL, SECTS_AND_VIOLETS, TROUBLE_BREWING } from '../scripts/script-library';
import { PlayerComponent } from '../player/player.component';
import { TravelerComponent } from '../traveler/traveler.component';
import { LandmarkComponent } from '../landmark/landmark.component';

const TB_TRAVELERS = ['Scapegoat', 'Gunslinger', 'Beggar', 'Bureaucrat', 'Thief'];
const BMR_TRAVELERS = ['Apprentice', 'Matron', 'Voudon', 'Judge', 'Bishop'];
const SNV_TRAVELERS = ['Barista', 'Harlot', 'Butcher', 'Bone Collector', 'Deviant'];
const EXPERIMENTAL_TRAVELERS = ['Gangster', 'Gnome', 'Cacklejack'];

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
    rows: [
      ['Deus ex Fiasco', 'Ferryman', 'Fiddler', "Hell's Librarian"],
      ['Big Wig', 'Bootlegger', 'Gardener', 'God of Ug', 'Hindu', 'Knaves', 'Pope', 'Storm Catcher', 'Tor', 'Ventriloquist', 'Zenomancer'],
    ],
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

  it('offers a row for each script when "All" is picked', () => {
    fixture.componentRef.setInput('script', BAD_MOON_RISING);
    fixture.detectChanges();
    fixture.componentRef.setInput('script', ALL_SCRIPT);
    fixture.detectChanges();
    expect(pickerRows(el)).toEqual([TB_TRAVELERS, BMR_TRAVELERS, SNV_TRAVELERS, EXPERIMENTAL_TRAVELERS]);
  });
});

describe('Character options', () => {
  it('opens each character in the shelf section it belongs to', () => {
    const shelf = new PlayerAidShelf();
    const expected: [readonly { aid: PlayerAid }[], string][] = [
      [travelerRows(TROUBLE_BREWING)[0], 'traveler'],
      [travelerRows(BAD_MOON_RISING)[0], 'traveler-bmr'],
      [travelerRows(SECTS_AND_VIOLETS)[0], 'traveler-snv'],
      [travelerRows(EXPERIMENTAL)[0], 'traveler-experimental'],
      [PLAYER_FABLED, 'fabled'],
      [LANDMARK_FABLED, 'fabled'],
      [LANDMARK_LORIC, 'loric'],
    ];
    for (const [options, section] of expected) {
      for (const option of options) {
        shelf.show(option.aid);
        expect(shelf.activeSection?.id).toBe(section);
      }
    }
  });

  it('gives every traveler a script', () => {
    for (const traveler of TRAVELER_CHARACTERS) {
      expect(traveler.scripts?.length).withContext(traveler.name).toBeGreaterThan(0);
    }
  });

  it('lists a traveler in a row for each of its scripts when "All" is picked', () => {
    const rows = travelerRows(ALL_SCRIPT);
    const appearances = rows.flat().length;
    const memberships = TRAVELER_CHARACTERS.reduce((sum, t) => sum + (t.scripts?.length ?? 0), 0);
    expect(appearances).toBe(memberships);
  });
});
