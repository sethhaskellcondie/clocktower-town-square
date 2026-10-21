import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterSheetComponent } from './character-sheet.component';
import { Script } from '../scripts/script';
import { TROUBLE_BREWING } from '../scripts/script-library';
import { IMP, SCAPEGOAT, WASHERWOMAN } from './character-library';

describe('CharacterSheetComponent', () => {
  let fixture: ComponentFixture<CharacterSheetComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterSheetComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CharacterSheetComponent);
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  function click(selector: string): void {
    (el.querySelector(selector) as HTMLElement).click();
    fixture.detectChanges();
  }

  const headings = () => Array.from(el.querySelectorAll('.sheet-group-title')).map(h => h.textContent?.trim());
  const names = (group: string) =>
    Array.from(el.querySelectorAll(`#character_sheet_group_${group} .sheet-character-name`)).map(n => n.textContent?.trim());

  it('toggles the shelf from the top-right button', () => {
    expect(el.querySelector('.sheet-shelf')?.classList).not.toContain('open');
    click('#character_sheet_toggle');
    expect(el.querySelector('.sheet-shelf')?.classList).toContain('open');
    expect(el.querySelector('#character_sheet_toggle')?.getAttribute('aria-expanded')).toBe('true');
    click('#character_sheet_toggle');
    expect(el.querySelector('.sheet-shelf')?.classList).not.toContain('open');
  });

  it('lists the characters from Townsfolk to Demons, each under its heading, leaving out travelers', () => {
    expect(headings()).toEqual(['Townsfolk', 'Outsiders', 'Minions', 'Demons']);
    expect(names('townsfolk')).toEqual(['Washerwoman', 'Librarian', 'Investigator', 'Chef', 'Empath', 'Fortune Teller', 'Undertaker', 'Monk', 'Ravenkeeper', 'Virgin', 'Slayer', 'Soldier', 'Mayor']);
    expect(names('outsiders')).toEqual(['Butler', 'Drunk', 'Recluse', 'Saint']);
    expect(names('minions')).toEqual(['Poisoner', 'Spy', 'Scarlet Woman', 'Baron']);
    expect(names('demons')).toEqual(['Imp']);
    expect(el.querySelector(`#character_sheet_character_${SCAPEGOAT.id}`)).toBeNull();
  });

  it("shows each character's icon beside its name", () => {
    const character = el.querySelector(`#character_sheet_character_${WASHERWOMAN.id}`)!;
    expect(character.querySelector('img.sheet-character-icon')?.getAttribute('src')).toBe(WASHERWOMAN.icon);
    expect(character.querySelector('.sheet-character-name')?.textContent).toBe('Washerwoman');
  });

  it('colors the good headings apart from the evil ones', () => {
    expect(el.querySelector('#character_sheet_group_outsiders h2')?.classList).toContain('good');
    expect(el.querySelector('#character_sheet_group_minions h2')?.classList).toContain('evil');
  });

  it('picks the script from a dropdown, starting on All', () => {
    const header = () => el.querySelector('#character_sheet_script_toggle');
    expect(header()?.textContent).toContain('Script: All');
    expect(el.querySelector('.sheet-script-menu')).toBeNull();

    click('#character_sheet_script_toggle');
    const options = Array.from(el.querySelectorAll('.sheet-script-option')).map(o => o.textContent?.trim());
    expect(options).toEqual(['All', 'Trouble Brewing']);
    expect(el.querySelector('#character_sheet_script_all')?.getAttribute('aria-selected')).toBe('true');

    click('#character_sheet_script_trouble-brewing');
    expect(el.querySelector('.sheet-script-menu')).toBeNull();
    expect(header()?.textContent).toContain('Script: Trouble Brewing');
    expect(names('demons')).toEqual(['Imp']);
  });

  it("shows only the picked script's characters, and only the types it has", () => {
    const component = fixture.componentInstance;
    component.selectScript(new Script({ id: 'small', name: 'Small', base: false, characters: [WASHERWOMAN, IMP] }));
    fixture.detectChanges();
    expect(headings()).toEqual(['Townsfolk', 'Demons']);
    expect(names('townsfolk')).toEqual(['Washerwoman']);

    component.selectScript(new Script({ id: 'bare', name: 'Bare', base: false }));
    fixture.detectChanges();
    expect(el.querySelector('.sheet-empty')?.textContent).toContain('No characters yet.');

    component.selectScript(TROUBLE_BREWING);
    fixture.detectChanges();
    expect(el.querySelector('.sheet-empty')).toBeNull();
  });

  it('closes on a click outside it, but not on one inside it', () => {
    click('#character_sheet_toggle');
    click('#character_sheet_group_townsfolk');
    expect(el.querySelector('.sheet-shelf')?.classList).toContain('open');

    document.body.click();
    fixture.detectChanges();
    expect(el.querySelector('.sheet-shelf')?.classList).not.toContain('open');
  });

  it('closes the script dropdown on a click elsewhere, then on Escape before the shelf', () => {
    click('#character_sheet_toggle');
    click('#character_sheet_script_toggle');
    click('#character_sheet_group_townsfolk');
    expect(el.querySelector('.sheet-script-menu')).toBeNull();
    expect(el.querySelector('.sheet-shelf')?.classList).toContain('open');

    click('#character_sheet_script_toggle');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(el.querySelector('.sheet-script-menu')).toBeNull();
    expect(el.querySelector('.sheet-shelf')?.classList).toContain('open');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(el.querySelector('.sheet-shelf')?.classList).not.toContain('open');
  });
});
