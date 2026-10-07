import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CharacterIconComponent } from './character-icon.component';
import { LANDMARK_FABLED, PLAYER_FABLED, TRAVELER_CHARACTERS } from './character-options';
import { PlayerAid } from '../player-aids/player-aid';
import { PlayerAidShelf } from '../player-aids/player-aid-shelf';
import { PlayerComponent } from '../player/player.component';
import { TravelerComponent } from '../traveler/traveler.component';
import { LandmarkComponent } from '../landmark/landmark.component';

// Each token on the board offers its own set of character icons
const TOKENS: { kind: string; component: Type<PlayerComponent | TravelerComponent | LandmarkComponent>; tokenClass: string; names: string[] }[] = [
  {
    kind: 'traveler',
    component: TravelerComponent,
    tokenClass: '.traveler-circle',
    names: ['Scapegoat', 'Gunslinger', 'Beggar', 'Bureaucrat', 'Thief'],
  },
  {
    kind: 'player',
    component: PlayerComponent,
    tokenClass: '.player-circle',
    names: ['Angel', 'Buddhist', 'Doomsayer', 'Revolutionary'],
  },
  {
    kind: 'landmark',
    component: LandmarkComponent,
    tokenClass: '.landmark-square',
    names: ['Fiddler', "Hell's Librarian"],
  },
];

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
      const options = Array.from(el.querySelectorAll('.character-option')).map(o => o.getAttribute('title'));
      expect(options).toEqual(token.names);

      const last = icon.options[icon.options.length - 1];
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
      icon.choose(icon.options[0]);
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
      icon.choose(icon.options[0]);
      fixture.detectChanges();

      click(id(''));
      expect(opened).toEqual([icon.options[0].aid]);

      toggleEditing();
      icon.onIconClick();
      expect(opened.length).toBe(1);
    });
  });
}

describe('Character options', () => {
  it('opens each character in the shelf section it belongs to', () => {
    const shelf = new PlayerAidShelf();
    const expected: [readonly { aid: PlayerAid }[], string][] = [
      [TRAVELER_CHARACTERS, 'traveler'],
      [PLAYER_FABLED, 'fabled'],
      [LANDMARK_FABLED, 'fabled'],
    ];
    for (const [options, section] of expected) {
      for (const option of options) {
        shelf.show(option.aid);
        expect(shelf.activeSection?.id).toBe(section);
      }
    }
  });
});
