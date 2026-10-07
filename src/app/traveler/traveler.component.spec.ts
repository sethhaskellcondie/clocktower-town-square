import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelerComponent } from './traveler.component';
import { TRAVELER_CHARACTERS } from './traveler-characters';
import { PlayerAid } from '../player-aids/player-aid';
import { PlayerAidShelf } from '../player-aids/player-aid-shelf';

describe('TravelerComponent', () => {
  let fixture: ComponentFixture<TravelerComponent>;
  let component: TravelerComponent;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelerComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TravelerComponent);
    component = fixture.componentInstance;
    component.number = 3;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  function query(selector: string): HTMLElement | null {
    return el.querySelector(selector);
  }

  function click(selector: string): void {
    query(selector)!.click();
    fixture.detectChanges();
  }

  function startEditing(): void {
    query('.traveler-circle')!.dispatchEvent(new MouseEvent('contextmenu', { cancelable: true }));
    fixture.detectChanges();
  }

  it('offers a + beside the circle only while editing', () => {
    expect(query('#traveler_3_character_add')).toBeNull();
    startEditing();
    expect(query('#traveler_3_character_add')).not.toBeNull();
    component.stopEditing();
    fixture.detectChanges();
    expect(query('#traveler_3_character_add')).toBeNull();
  });

  it('picks one of the five travelers from the +', () => {
    startEditing();
    click('#traveler_3_character_add');
    const options = Array.from(el.querySelectorAll('.character-option')).map(o => o.getAttribute('title'));
    expect(options).toEqual(['Scapegoat', 'Gunslinger', 'Beggar', 'Bureaucrat', 'Thief']);

    click('#traveler_3_character_beggar');
    expect(component.character?.id).toBe('beggar');
    expect(query('.character-picker')).toBeNull();
    expect(query('#traveler_3_character_add')).toBeNull();
    expect(query('#traveler_3_character img')?.getAttribute('src')).toBe('assets/player_aids/icon_beggar.png');
  });

  it('keeps the name input focused when the + is pressed, so editing carries on', () => {
    startEditing();
    const press = new MouseEvent('mousedown', { cancelable: true });
    query('#traveler_3_character_add')!.dispatchEvent(press);
    expect(press.defaultPrevented).toBeTrue();
  });

  it('removes the icon with the X shown over it while editing', () => {
    component.chooseCharacter(TRAVELER_CHARACTERS[0]);
    fixture.detectChanges();
    expect(query('#traveler_3_character')).not.toBeNull();
    expect(query('#traveler_3_character_remove')).toBeNull();

    startEditing();
    click('#traveler_3_character_remove');
    expect(component.character).toBeNull();
    expect(query('#traveler_3_character')).toBeNull();
    expect(query('#traveler_3_character_add')).not.toBeNull();
  });

  it("opens the character's player aid when the icon is clicked outside of editing", () => {
    const opened: PlayerAid[] = [];
    component.openAid.subscribe(aid => opened.push(aid));
    component.chooseCharacter(TRAVELER_CHARACTERS[4]);
    fixture.detectChanges();

    click('#traveler_3_character');
    expect(opened).toEqual([TRAVELER_CHARACTERS[4].aid]);

    startEditing();
    component.onCharacterClick();
    expect(opened.length).toBe(1);
  });

  it("lists each traveler's aid in the shelf's Traveler section", () => {
    const shelf = new PlayerAidShelf();
    for (const character of TRAVELER_CHARACTERS) {
      shelf.show(character.aid);
      expect(shelf.activeSection?.id).toBe('traveler');
    }
  });
});
