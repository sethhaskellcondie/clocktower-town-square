import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterSheetComponent } from './character-sheet.component';
import { PlayerAid } from '../player-aids/player-aid';
import { Script } from '../scripts/script';
import { ALL_SCRIPT, BAD_MOON_RISING, EXPERIMENTAL, FABLED_AND_LORIC, SECTS_AND_VIOLETS, TROUBLE_BREWING } from '../scripts/script-library';
import { ACROBAT, ANGEL, DEVIANT, GRANDMOTHER, IMP, SCAPEGOAT, VOUDON, WASHERWOMAN } from './character-library';

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

  it('lists the characters from Townsfolk to Demons, each under its heading, with the travelers last', () => {
    fixture.componentInstance.selectScript(TROUBLE_BREWING);
    fixture.detectChanges();
    expect(headings()).toEqual(['Townsfolk', 'Outsiders', 'Minions', 'Demons', 'Travelers']);
    expect(names('townsfolk')).toEqual(['Washerwoman', 'Librarian', 'Investigator', 'Chef', 'Empath', 'Fortune Teller', 'Undertaker', 'Monk', 'Ravenkeeper', 'Virgin', 'Slayer', 'Soldier', 'Mayor']);
    expect(names('outsiders')).toEqual(['Butler', 'Drunk', 'Recluse', 'Saint']);
    expect(names('minions')).toEqual(['Poisoner', 'Spy', 'Scarlet Woman', 'Baron']);
    expect(names('demons')).toEqual(['Imp']);
    expect(names('travelers')).toEqual(['Scapegoat', 'Gunslinger', 'Beggar', 'Bureaucrat', 'Thief']);
  });

  it('numbers the characters down the sheet, carrying on from one heading to the next', () => {
    fixture.componentInstance.selectScript(TROUBLE_BREWING);
    fixture.detectChanges();
    const numbers = Array.from(el.querySelectorAll('.sheet-character-number')).map(n => n.textContent?.trim());
    expect(numbers).toEqual(Array.from({ length: 27 }, (_, i) => String(i + 1)));
    expect(el.querySelector(`#character_sheet_character_${WASHERWOMAN.id} .sheet-character-number`)?.textContent).toBe('1');
    expect(el.querySelector(`#character_sheet_character_${IMP.id} .sheet-character-number`)?.textContent).toBe('22');
    expect(el.querySelector(`#character_sheet_character_${SCAPEGOAT.id} .sheet-character-number`)?.textContent).toBe('23');
  });

  it('numbers every character on the All sheet once, from 1 to the last', () => {
    const numbers = Array.from(el.querySelectorAll('.sheet-character-number')).map(n => n.textContent?.trim());
    expect(numbers).toEqual(ALL_SCRIPT.characters.map((_, i) => String(i + 1)));
  });

  it("renumbers by where the characters fall on the picked script's sheet", () => {
    fixture.componentInstance.selectScript(new Script({ id: 'small', name: 'Small', base: false, teensyville: false, characters: [SCAPEGOAT, IMP, WASHERWOMAN] }));
    fixture.detectChanges();
    const number = (id: string) => el.querySelector(`#character_sheet_character_${id} .sheet-character-number`)?.textContent;
    expect(number(WASHERWOMAN.id)).toBe('1');
    expect(number(IMP.id)).toBe('2');
    expect(number(SCAPEGOAT.id)).toBe('3');
  });

  it('gives every number the width of the longest, so the icons line up', () => {
    const digits = () => (el.querySelector('.sheet-groups') as HTMLElement).style.getPropertyValue('--sheet-number-digits');
    expect(digits()).toBe('3');
    fixture.componentInstance.selectScript(TROUBLE_BREWING);
    fixture.detectChanges();
    expect(digits()).toBe('2');
    fixture.componentInstance.selectScript(new Script({ id: 'small', name: 'Small', base: false, teensyville: false, characters: [WASHERWOMAN, IMP] }));
    fixture.detectChanges();
    expect(digits()).toBe('1');
  });

  it("shows the travelers' icons and abilities like any other character", () => {
    click('#character_sheet_show_abilities');
    const character = el.querySelector(`#character_sheet_character_${SCAPEGOAT.id}`)!;
    expect(character.querySelector('img.sheet-character-icon')?.getAttribute('src')).toBe(SCAPEGOAT.icon);
    expect(character.querySelector('.sheet-character-ability')?.textContent).toBe(SCAPEGOAT.ability);
  });

  it("shows each character's icon beside its name", () => {
    const character = el.querySelector(`#character_sheet_character_${WASHERWOMAN.id}`)!;
    expect(character.querySelector('img.sheet-character-icon')?.getAttribute('src')).toBe(WASHERWOMAN.icon);
    expect(character.querySelector('.sheet-character-name')?.textContent).toBe('Washerwoman');
  });

  it("closes on a click of a character's icon, opening that character's aid", () => {
    const opened: PlayerAid[] = [];
    fixture.componentInstance.openAid.subscribe(aid => opened.push(aid));
    click('#character_sheet_toggle');
    click(`#character_sheet_icon_${WASHERWOMAN.id}`);

    expect(el.querySelector('.sheet-shelf')?.classList).not.toContain('open');
    expect(opened.length).toBe(1);
    expect(opened[0].character).toBe(WASHERWOMAN);
    expect(el.querySelector(`#character_sheet_icon_${WASHERWOMAN.id}`)?.getAttribute('aria-label')).toBe('Open the Washerwoman player aid');
  });

  it('reopens once the aid it opened closes, but not if another aid replaced it', () => {
    let opened: PlayerAid | null = null;
    fixture.componentInstance.openAid.subscribe(aid => opened = aid);
    const setActiveAid = (aid: PlayerAid | null) => {
      fixture.componentRef.setInput('activeAid', aid);
      fixture.detectChanges();
    };
    const isOpen = () => el.querySelector('.sheet-shelf')!.classList.contains('open');

    click('#character_sheet_toggle');
    click(`#character_sheet_icon_${WASHERWOMAN.id}`);
    setActiveAid(opened);
    expect(isOpen()).toBeFalse();
    setActiveAid(null);
    expect(isOpen()).toBeTrue();

    click(`#character_sheet_icon_${IMP.id}`);
    setActiveAid(opened);
    setActiveAid(new PlayerAid({ character: SCAPEGOAT }));
    setActiveAid(null);
    expect(isOpen()).toBeFalse();
  });

  it('stays shut when an aid it never opened closes', () => {
    const other = new PlayerAid({ character: IMP });
    fixture.componentRef.setInput('activeAid', other);
    fixture.detectChanges();
    fixture.componentRef.setInput('activeAid', null);
    fixture.detectChanges();
    expect(el.querySelector('.sheet-shelf')?.classList).not.toContain('open');
  });

  it('colors the good headings apart from the evil ones, and the travelers apart from both', () => {
    expect(el.querySelector('#character_sheet_group_outsiders h2')?.classList).toContain('good');
    expect(el.querySelector('#character_sheet_group_minions h2')?.classList).toContain('evil');
    const travelers = el.querySelector('#character_sheet_group_travelers h2')?.classList;
    expect(travelers).toContain('traveler');
    expect(travelers).not.toContain('good');
    expect(travelers).not.toContain('evil');
    expect(el.querySelector('#character_sheet_group_fabled h2')?.classList).toContain('fabled');
    expect(el.querySelector('#character_sheet_group_loric h2')?.classList).toContain('loric');
  });

  it('steps through three sizes with the buttons beside the Townsfolk heading', () => {
    const shelf = () => el.querySelector('.sheet-shelf')!.classList;
    const up = () => el.querySelector('#character_sheet_size_up') as HTMLButtonElement;
    const down = () => el.querySelector('#character_sheet_size_down') as HTMLButtonElement;
    expect(el.querySelector('#character_sheet_group_townsfolk #character_sheet_size_up')).not.toBeNull();
    expect(el.querySelectorAll('.sheet-controls').length).toBe(1);

    expect(shelf()).toContain('size-small');
    expect(down().disabled).toBeTrue();
    click('#character_sheet_size_up');
    expect(shelf()).toContain('size-medium');
    click('#character_sheet_size_up');
    expect(shelf()).toContain('size-large');
    expect(up().disabled).toBeTrue();

    click('#character_sheet_size_down');
    click('#character_sheet_size_down');
    expect(shelf()).toContain('size-small');
    expect(shelf()).not.toContain('size-large');
  });

  it('shows just the names until the abilities box beside the size buttons is checked', () => {
    const ability = () => el.querySelector(`#character_sheet_character_${WASHERWOMAN.id} .sheet-character-ability`);
    const checkbox = () => el.querySelector('#character_sheet_show_abilities') as HTMLInputElement;
    expect(el.querySelector('#character_sheet_group_townsfolk .sheet-controls #character_sheet_show_abilities')).not.toBeNull();
    expect(checkbox().checked).toBeFalse();
    expect(el.querySelector('.sheet-character-ability')).toBeNull();

    click('#character_sheet_show_abilities');
    expect(checkbox().checked).toBeTrue();
    expect(ability()?.textContent).toBe(WASHERWOMAN.ability);
    expect(el.querySelector(`#character_sheet_character_${WASHERWOMAN.id} .sheet-character-name`)?.textContent).toBe('Washerwoman');
    expect(el.querySelectorAll('.sheet-character-ability').length).toBe(el.querySelectorAll('.sheet-character').length);
    expect(el.querySelector('.sheet-shelf')?.classList).toContain('with-abilities');

    click('#character_sheet_show_abilities');
    expect(checkbox().checked).toBeFalse();
    expect(el.querySelector('.sheet-character-ability')).toBeNull();
    expect(el.querySelector('.sheet-shelf')?.classList).not.toContain('with-abilities');
  });

  it('labels the abilities box for screen readers without showing any text', () => {
    expect(el.querySelector('#character_sheet_show_abilities')?.getAttribute('aria-label')).toBe('Show abilities');
    expect(el.querySelector('.sheet-controls')?.textContent?.replace(/[+-]/g, '').trim()).toBe('');
  });

  it('keeps the abilities shown when the script changes', () => {
    click('#character_sheet_show_abilities');
    fixture.componentInstance.selectScript(TROUBLE_BREWING);
    fixture.detectChanges();
    expect((el.querySelector('#character_sheet_show_abilities') as HTMLInputElement).checked).toBeTrue();
    expect(el.querySelector(`#character_sheet_character_${IMP.id} .sheet-character-ability`)?.textContent).toBe(IMP.ability);
  });

  it('keeps the size buttons on the first heading when a script has no Townsfolk', () => {
    fixture.componentInstance.selectScript(new Script({ id: 'evil', name: 'Evil', base: false, teensyville: false, characters: [IMP] }));
    fixture.detectChanges();
    expect(el.querySelector('#character_sheet_group_demons #character_sheet_size_up')).not.toBeNull();
  });

  it('picks the script from a dropdown, starting on All', () => {
    const header = () => el.querySelector('#character_sheet_script_toggle');
    expect(header()?.textContent).toContain('Script: All');
    expect(el.querySelector('.sheet-script-menu')).toBeNull();

    click('#character_sheet_script_toggle');
    const options = Array.from(el.querySelectorAll('.sheet-script-option')).map(o => o.textContent?.trim());
    expect(options).toEqual(['All', 'Trouble Brewing', 'Bad Moon Rising', 'Sects & Violets', 'Experimental', 'Fabled and Loric']);
    expect(el.querySelector('#character_sheet_script_all')?.getAttribute('aria-selected')).toBe('true');

    click('#character_sheet_script_trouble-brewing');
    expect(el.querySelector('.sheet-script-menu')).toBeNull();
    expect(header()?.textContent).toContain('Script: Trouble Brewing');
    expect(names('demons')).toEqual(['Imp']);
  });

  it('lists the Bad Moon Rising and Sects & Violets characters on their own sheets', () => {
    fixture.componentInstance.selectScript(BAD_MOON_RISING);
    fixture.detectChanges();
    expect(headings()).toEqual(['Townsfolk', 'Outsiders', 'Minions', 'Demons', 'Travelers']);
    expect(names('townsfolk')[0]).toBe(GRANDMOTHER.name);
    expect(names('demons')).toEqual(['Zombuul', 'Pukka', 'Shabaloth', 'Po']);
    expect(names('travelers').at(-1)).toBe(VOUDON.name);
    expect(el.querySelector(`#character_sheet_character_${WASHERWOMAN.id}`)).toBeNull();

    fixture.componentInstance.selectScript(SECTS_AND_VIOLETS);
    fixture.detectChanges();
    expect(names('demons')).toEqual(['Fang Gu', 'Vigormortis', 'No Dashii', 'Vortox']);
    expect(names('travelers').at(-1)).toBe(DEVIANT.name);
    expect(el.querySelector(`#character_sheet_character_${GRANDMOTHER.id}`)).toBeNull();
  });

  it("lists the experimental characters, without marking their abilities as experimental", () => {
    fixture.componentInstance.selectScript(EXPERIMENTAL);
    click('#character_sheet_show_abilities');
    expect(names('townsfolk')[0]).toBe(ACROBAT.name);
    expect(names('travelers')).toEqual(['Cacklejack', 'Gangster', 'Gnome']);
    expect(el.querySelector(`#character_sheet_character_${ACROBAT.id} .sheet-character-ability`)?.textContent).toBe(ACROBAT.ability);
  });

  it('lists the Fabled and Loric on a sheet of their own, under their own headings', () => {
    fixture.componentInstance.selectScript(FABLED_AND_LORIC);
    fixture.detectChanges();
    expect(headings()).toEqual(['Fabled', 'Loric']);
    expect(names('fabled')).toEqual([
      'Angel', 'Buddhist', 'Doomsayer', 'Fiddler', "Hell's Librarian", 'Revolutionary', 'Toymaker',
      'Djinn', 'Duchess', 'Fibbin', 'Sentinel', 'Spirit of Ivory',
      'Deus ex Fiasco', 'Ferryman',
    ]);
    expect(names('loric')).toEqual(['Big Wig', 'Bootlegger', 'Gardener', 'God of Ug', 'Hindu', 'Knaves', 'Pope', 'Storm Catcher', 'Tor', 'Ventriloquist', 'Zenomancer']);
    expect(el.querySelector('#character_sheet_group_fabled #character_sheet_size_up')).not.toBeNull();
    expect(el.querySelector(`#character_sheet_character_${ANGEL.id} .sheet-character-number`)?.textContent).toBe('1');
  });

  it('lists the Fabled and Loric after the travelers on the All sheet', () => {
    expect(headings()).toEqual(['Townsfolk', 'Outsiders', 'Minions', 'Demons', 'Travelers', 'Fabled', 'Loric']);
  });

  it("shows only the picked script's characters, and only the types it has", () => {
    const component = fixture.componentInstance;
    component.selectScript(new Script({ id: 'small', name: 'Small', base: false, teensyville: false, characters: [WASHERWOMAN, IMP] }));
    fixture.detectChanges();
    expect(headings()).toEqual(['Townsfolk', 'Demons']);
    expect(names('townsfolk')).toEqual(['Washerwoman']);

    component.selectScript(new Script({ id: 'bare', name: 'Bare', base: false, teensyville: false }));
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
