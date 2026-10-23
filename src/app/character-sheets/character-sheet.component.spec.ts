import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterSheetComponent, sectionScripts } from './character-sheet.component';
import { PlayerAid } from '../player-aids/player-aid';
import { Script } from '../scripts/script';
import {
  A_GRIMM_CHORUS,
  ALL_SCRIPT,
  BAD_MOON_RISING,
  EVERYONE_CAN_PLAY,
  EXPERIMENTAL,
  FABLED_AND_LORIC,
  HIDE_AND_SEEK,
  LAISSEZ_UN_FAIRE,
  LUNAR_ECLIPSE,
  NO_GREATER_JOY,
  ONE_IN_ONE_OUT,
  OVER_THE_RIVER,
  RACE_TO_THE_BOTTOM,
  SECTS_AND_VIOLETS,
  TEENSY_TROUBLE_BREWING,
  TROUBLE_BREWING,
} from '../scripts/script-library';
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
  // The sheet fills its two columns a row at a time, so its left column is
  // every other name from the first, and its right column the rest
  const columns = (group: string) => {
    const all = names(group);
    return [all.filter((_, i) => i % 2 === 0), all.filter((_, i) => i % 2 === 1)];
  };

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
    expect(names('townsfolk')).toEqual(['Washerwoman', 'Monk', 'Librarian', 'Ravenkeeper', 'Investigator', 'Virgin', 'Chef', 'Slayer', 'Empath', 'Soldier', 'Fortune Teller', 'Mayor', 'Undertaker']);
    expect(names('outsiders')).toEqual(['Butler', 'Recluse', 'Drunk', 'Saint']);
    expect(names('minions')).toEqual(['Poisoner', 'Scarlet Woman', 'Spy', 'Baron']);
    expect(names('demons')).toEqual(['Imp']);
    expect(names('travelers')).toEqual(['Scapegoat', 'Bureaucrat', 'Gunslinger', 'Thief', 'Beggar']);
  });

  it("lays out the base scripts' characters in the columns of their PDFs, the left column taking the odd one out", () => {
    fixture.componentInstance.selectScript(TROUBLE_BREWING);
    fixture.detectChanges();
    expect(columns('townsfolk')).toEqual([
      ['Washerwoman', 'Librarian', 'Investigator', 'Chef', 'Empath', 'Fortune Teller', 'Undertaker'],
      ['Monk', 'Ravenkeeper', 'Virgin', 'Slayer', 'Soldier', 'Mayor'],
    ]);
    expect(columns('outsiders')).toEqual([['Butler', 'Drunk'], ['Recluse', 'Saint']]);
    expect(columns('minions')).toEqual([['Poisoner', 'Spy'], ['Scarlet Woman', 'Baron']]);
    expect(columns('demons')).toEqual([['Imp'], []]);

    fixture.componentInstance.selectScript(BAD_MOON_RISING);
    fixture.detectChanges();
    expect(columns('townsfolk')).toEqual([
      ['Grandmother', 'Sailor', 'Chambermaid', 'Exorcist', 'Innkeeper', 'Gambler', 'Gossip'],
      ['Courtier', 'Professor', 'Minstrel', 'Tea Lady', 'Pacifist', 'Fool'],
    ]);
    expect(columns('demons')).toEqual([['Zombuul', 'Pukka'], ['Shabaloth', 'Po']]);

    fixture.componentInstance.selectScript(SECTS_AND_VIOLETS);
    fixture.detectChanges();
    expect(columns('townsfolk')).toEqual([
      ['Clockmaker', 'Dreamer', 'Snake Charmer', 'Mathematician', 'Flowergirl', 'Town Crier', 'Oracle'],
      ['Savant', 'Seamstress', 'Philosopher', 'Artist', 'Juggler', 'Sage'],
    ]);
    expect(columns('demons')).toEqual([['Fang Gu', 'Vigormortis'], ['No Dashii', 'Vortox']]);
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
    fixture.componentInstance.selectScript(ALL_SCRIPT);
    fixture.detectChanges();
    const numbers = Array.from(el.querySelectorAll('.sheet-character-number')).map(n => n.textContent?.trim());
    expect(numbers).toEqual(ALL_SCRIPT.characters.map((_, i) => String(i + 1)));
  });

  it("renumbers by where the characters fall on the picked script's sheet", () => {
    fixture.componentInstance.selectScript(new Script({ id: 'small', name: 'Small', kind: 'Custom', characters: [SCAPEGOAT, IMP, WASHERWOMAN] }));
    fixture.detectChanges();
    const number = (id: string) => el.querySelector(`#character_sheet_character_${id} .sheet-character-number`)?.textContent;
    expect(number(WASHERWOMAN.id)).toBe('1');
    expect(number(IMP.id)).toBe('2');
    expect(number(SCAPEGOAT.id)).toBe('3');
  });

  it('gives every number the width of the longest, so the icons line up', () => {
    const digits = () => (el.querySelector('.sheet-groups') as HTMLElement).style.getPropertyValue('--sheet-number-digits');
    expect(digits()).toBe('2');
    fixture.componentInstance.selectScript(ALL_SCRIPT);
    fixture.detectChanges();
    expect(digits()).toBe('3');
    fixture.componentInstance.selectScript(new Script({ id: 'small', name: 'Small', kind: 'Custom', characters: [WASHERWOMAN, IMP] }));
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
    fixture.componentInstance.selectScript(ALL_SCRIPT);
    fixture.detectChanges();
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
    fixture.componentInstance.selectScript(new Script({ id: 'evil', name: 'Evil', kind: 'Custom', characters: [IMP] }));
    fixture.detectChanges();
    expect(el.querySelector('#character_sheet_group_demons #character_sheet_size_up')).not.toBeNull();
  });

  it('picks the script from a dropdown, starting on Trouble Brewing', () => {
    const header = () => el.querySelector('#character_sheet_script_toggle');
    expect(header()?.textContent).toContain('Script: Trouble Brewing');
    expect(el.querySelector('.sheet-script-menu')).toBeNull();

    click('#character_sheet_script_toggle');
    const sections = Array.from(el.querySelectorAll('.sheet-script-section')).map(section => [
      section.querySelector('.sheet-script-section-title')?.textContent?.trim(),
      Array.from(section.querySelectorAll('.sheet-script-option')).map(o => o.textContent?.trim()),
    ]);
    expect(sections).toEqual([
      ['Base', ['Trouble Brewing', 'Bad Moon Rising', 'Sects & Violets']],
      ['Custom', ['Everyone Can Play', 'A Grimm Chorus', 'Hide and Seek', 'Lunar Eclipse', 'One in one out']],
      ['Teensyville', ['Teensy Trouble Brewing', 'No Greater Joy', 'Race to the Bottom', 'Over the River', 'Laissez Un Faire']],
      ['Reference', ['All', 'Experimental', 'Fabled and Loric']],
    ]);
    expect(el.querySelector('#character_sheet_script_trouble-brewing')?.getAttribute('aria-selected')).toBe('true');

    click('#character_sheet_script_bad-moon-rising');
    expect(el.querySelector('.sheet-script-menu')).toBeNull();
    expect(header()?.textContent).toContain('Script: Bad Moon Rising');
    expect(names('demons')).toEqual(['Zombuul', 'Shabaloth', 'Pukka', 'Po']);
  });

  it('lists the Bad Moon Rising and Sects & Violets characters on their own sheets', () => {
    fixture.componentInstance.selectScript(BAD_MOON_RISING);
    fixture.detectChanges();
    expect(headings()).toEqual(['Townsfolk', 'Outsiders', 'Minions', 'Demons', 'Travelers']);
    expect(names('townsfolk')[0]).toBe(GRANDMOTHER.name);
    expect(names('demons')).toEqual(['Zombuul', 'Shabaloth', 'Pukka', 'Po']);
    expect(names('travelers')).toContain(VOUDON.name);
    expect(el.querySelector(`#character_sheet_character_${WASHERWOMAN.id}`)).toBeNull();

    fixture.componentInstance.selectScript(SECTS_AND_VIOLETS);
    fixture.detectChanges();
    expect(names('demons')).toEqual(['Fang Gu', 'No Dashii', 'Vigormortis', 'Vortox']);
    expect(names('travelers')).toContain(DEVIANT.name);
    expect(el.querySelector(`#character_sheet_character_${GRANDMOTHER.id}`)).toBeNull();
  });

  it("lists the experimental characters, without marking their abilities as experimental", () => {
    fixture.componentInstance.selectScript(EXPERIMENTAL);
    click('#character_sheet_show_abilities');
    expect(names('townsfolk')[0]).toBe(ACROBAT.name);
    expect(names('travelers')).toEqual(['Cacklejack', 'Gangster', 'Gnome']);
    expect(el.querySelector(`#character_sheet_character_${ACROBAT.id} .sheet-character-ability`)?.textContent).toBe(ACROBAT.ability);
  });

  it('lays out the Everyone Can Play characters as on its PDF, with the Mayor at the foot of the left column, and no travelers', () => {
    fixture.componentInstance.selectScript(EVERYONE_CAN_PLAY);
    fixture.detectChanges();
    expect(headings()).toEqual(['Townsfolk', 'Outsiders', 'Minions', 'Demons']);
    expect(columns('townsfolk')).toEqual([
      ['Librarian', 'Clockmaker', 'Grandmother', 'Fortune Teller', 'Empath', 'Monk', 'Mayor'],
      ['Undertaker', 'Gambler', 'Artist', 'Slayer', 'Fool', 'Ravenkeeper'],
    ]);
    expect(columns('outsiders')).toEqual([['Drunk', 'Recluse'], ['Saint', 'Moonchild']]);
    expect(columns('minions')).toEqual([['Baron', 'Poisoner', 'Assassin'], ["Devil's Advocate", 'Spy', 'Scarlet Woman']]);
    expect(columns('demons')).toEqual([['Imp'], []]);
  });

  it('lays out the A Grimm Chorus characters as on its PDF, with its travelers and its Djinn', () => {
    fixture.componentInstance.selectScript(A_GRIMM_CHORUS);
    fixture.detectChanges();
    expect(headings()).toEqual(['Townsfolk', 'Outsiders', 'Minions', 'Demons', 'Travelers', 'Fabled']);
    expect(columns('townsfolk')).toEqual([
      ['General', 'Village Idiot', 'Town Crier', 'Innkeeper', 'Gambler', 'Exorcist', 'Amnesiac'],
      ['Nightwatchman', 'Slayer', 'Fisherman', 'Soldier', 'Minstrel', 'Cannibal'],
    ]);
    expect(columns('outsiders')).toEqual([['Damsel', 'Drunk'], ['Golem', 'Politician']]);
    expect(columns('minions')).toEqual([['Godfather', 'Summoner'], ['Assassin', 'Scarlet Woman']]);
    expect(columns('demons')).toEqual([['Yaggababble', 'Pukka'], ['Ojo', 'Po']]);
    expect(names('travelers')).toEqual(['Thief', 'Harlot', 'Judge', 'Beggar', 'Scapegoat']);
    expect(names('fabled')).toEqual(['Djinn, A Grimm Chorus']);
  });

  it('lays out the Hide and Seek characters as on its PDF, with no travelers or Fabled', () => {
    fixture.componentInstance.selectScript(HIDE_AND_SEEK);
    fixture.detectChanges();
    expect(headings()).toEqual(['Townsfolk', 'Outsiders', 'Minions', 'Demons']);
    expect(columns('townsfolk')).toEqual([
      ['Noble', 'Librarian', 'Pixie', 'Preacher', 'Town Crier', 'Oracle', 'Undertaker'],
      ['Dreamer', 'Seamstress', 'Artist', 'Huntsman', 'Ravenkeeper', 'Virgin'],
    ]);
    expect(columns('outsiders')).toEqual([['Damsel', 'Drunk'], ['Mutant', 'Goon']]);
    expect(columns('minions')).toEqual([['Godfather', 'Mezepheles'], ['Poisoner', 'Cerenovus']]);
    expect(columns('demons')).toEqual([['Pukka', 'Vigormortis'], ['Imp', 'Ojo']]);
  });

  it('lays out the Lunar Eclipse characters as on its PDF, with the Cannibal at the foot of the left column, its travelers, and its Fabled', () => {
    fixture.componentInstance.selectScript(LUNAR_ECLIPSE);
    fixture.detectChanges();
    expect(headings()).toEqual(['Townsfolk', 'Outsiders', 'Minions', 'Demons', 'Travelers', 'Fabled']);
    expect(columns('townsfolk')).toEqual([
      ['Grandmother', 'Pixie', 'Sailor', 'Chambermaid', 'Mathematician', 'Innkeeper', 'Cannibal'],
      ['Lycanthrope', 'Savant', 'Artist', 'Tea Lady', 'Magician', 'Mayor'],
    ]);
    expect(columns('outsiders')).toEqual([['Goon', 'Barber'], ['Lunatic', 'Puzzlemaster']]);
    expect(columns('minions')).toEqual([['Godfather', "Devil's Advocate", 'Spy'], ['Assassin', 'Marionette']]);
    expect(columns('demons')).toEqual([['No Dashii', 'Zombuul'], ['Vigormortis']]);
    expect(names('travelers')).toEqual(['Barista', 'Harlot', 'Apprentice', 'Beggar', 'Voudon']);
    expect(names('fabled')).toEqual(['Djinn, Lunar Eclipse', 'Spirit of Ivory']);
  });

  it('lays out the One in one out characters as on its PDF, with its Fabled and no travelers', () => {
    fixture.componentInstance.selectScript(ONE_IN_ONE_OUT);
    fixture.detectChanges();
    expect(headings()).toEqual(['Townsfolk', 'Outsiders', 'Minions', 'Demons', 'Fabled']);
    expect(columns('townsfolk')).toEqual([
      ['Steward', 'Knight', 'High Priestess', 'Village Idiot', 'Snake Charmer', 'Fortune Teller', 'Oracle'],
      ['Monk', 'Amnesiac', 'Fisherman', 'Seamstress', 'Farmer', 'Cannibal'],
    ]);
    expect(columns('outsiders')).toEqual([['Ogre', 'Goon'], ['Recluse', 'Drunk']]);
    expect(columns('minions')).toEqual([['Poisoner', 'Harpy'], ['Spy', 'Mezepheles']]);
    expect(columns('demons')).toEqual([['Kazali', 'Imp'], ['Ojo', 'Fang Gu']]);
    expect(names('fabled')).toEqual(['Djinn, One in one out', 'Spirit of Ivory']);
  });

  it('lays out the No Greater Joy characters as on its PDF, with the Toymaker and no travelers', () => {
    fixture.componentInstance.selectScript(NO_GREATER_JOY);
    fixture.detectChanges();
    expect(headings()).toEqual(['Townsfolk', 'Outsiders', 'Minions', 'Demons', 'Fabled']);
    expect(columns('townsfolk')).toEqual([['Clockmaker', 'Investigator', 'Empath'], ['Chambermaid', 'Artist', 'Sage']]);
    expect(columns('outsiders')).toEqual([['Drunk'], ['Klutz']]);
    expect(columns('minions')).toEqual([['Scarlet Woman'], ['Baron']]);
    expect(columns('demons')).toEqual([['Imp'], []]);
    expect(names('fabled')).toEqual(['Toymaker']);
  });

  it('lists the Race to the Bottom characters in the order of its single-column PDF, with its travelers, its Fabled, and the Toymaker', () => {
    fixture.componentInstance.selectScript(RACE_TO_THE_BOTTOM);
    fixture.detectChanges();
    expect(headings()).toEqual(['Townsfolk', 'Outsiders', 'Minions', 'Demons', 'Travelers', 'Fabled']);
    expect(names('townsfolk')).toEqual(['Clockmaker', 'Empath', 'Dreamer', 'Courtier', 'Slayer', 'Mayor']);
    expect(names('outsiders')).toEqual(['Lunatic', 'Klutz']);
    expect(names('minions')).toEqual(['Spy', 'Scarlet Woman']);
    expect(names('demons')).toEqual(['Vortox']);
    expect(names('travelers')).toEqual(['Barista', 'Harlot', 'Beggar', 'Scapegoat', 'Bishop']);
    expect(names('fabled')).toEqual(['Doomsayer', 'Sentinel', 'Toymaker']);
  });

  it('lays out the Over the River characters as on its PDF, with the Toymaker and no travelers, and Laissez Un Faire with neither', () => {
    fixture.componentInstance.selectScript(OVER_THE_RIVER);
    fixture.detectChanges();
    expect(headings()).toEqual(['Townsfolk', 'Outsiders', 'Minions', 'Demons', 'Fabled']);
    expect(columns('townsfolk')).toEqual([['Grandmother', 'Clockmaker', 'Innkeeper'], ['Snake Charmer', 'Professor', 'Slayer']]);
    expect(columns('outsiders')).toEqual([['Lunatic'], ['Recluse']]);
    expect(columns('minions')).toEqual([['Godfather'], ['Spy']]);
    expect(columns('demons')).toEqual([['Imp'], []]);
    expect(names('fabled')).toEqual(['Toymaker']);

    fixture.componentInstance.selectScript(LAISSEZ_UN_FAIRE);
    fixture.detectChanges();
    expect(headings()).toEqual(['Townsfolk', 'Outsiders', 'Minions', 'Demons']);
    expect(columns('townsfolk')).toEqual([['Balloonist', 'Savant', 'Amnesiac'], ['Fisherman', 'Artist', 'Cannibal']]);
    expect(columns('outsiders')).toEqual([['Mutant'], ['Lunatic']]);
    expect(columns('minions')).toEqual([['Widow'], ['Goblin']]);
    expect(columns('demons')).toEqual([['Leviathan'], []]);
  });

  it('lays out the Teensy Trouble Brewing characters as on its PDF, with its Fabled, the Toymaker, and no travelers', () => {
    fixture.componentInstance.selectScript(TEENSY_TROUBLE_BREWING);
    fixture.detectChanges();
    expect(headings()).toEqual(['Townsfolk', 'Outsiders', 'Minions', 'Demons', 'Fabled']);
    expect(columns('townsfolk')).toEqual([['Empath', 'Fortune Teller', 'Undertaker'], ['Monk', 'Slayer', 'Mayor']]);
    expect(columns('outsiders')).toEqual([['Drunk'], ['Recluse']]);
    expect(columns('minions')).toEqual([['Poisoner'], ['Spy']]);
    expect(columns('demons')).toEqual([['Imp'], []]);
    expect(names('fabled')).toEqual(['Sentinel', 'Toymaker']);
  });

  it("links to the script's night order beneath its last group, only when it has one", () => {
    expect(el.querySelector('.sheet-night-order')).toBeNull();

    fixture.componentInstance.selectScript(NO_GREATER_JOY);
    fixture.detectChanges();
    const footer = el.querySelector('.sheet-groups')?.lastElementChild;
    expect(footer?.classList).toContain('sheet-footer');
    const nightOrder = footer!.querySelector('.sheet-night-order')!;
    expect(Array.from(nightOrder.querySelectorAll('a')).map(a => a.textContent?.trim())).toEqual(['First Night', 'Other Nights']);
    expect(nightOrder.querySelector('button')).toBeNull();

    fixture.componentInstance.selectScript(TROUBLE_BREWING);
    fixture.detectChanges();
    expect(el.querySelector('.sheet-night-order')).toBeNull();
  });

  it("credits the script's author on the night order's row, after its links, only when it has one", () => {
    expect(el.querySelector('.sheet-footer')).toBeNull();

    fixture.componentInstance.selectScript(NO_GREATER_JOY);
    fixture.detectChanges();
    const footer = el.querySelector('.sheet-footer')!;
    expect(Array.from(footer.children).map(child => child.className)).toEqual(['sheet-night-order', 'sheet-author']);
    expect(footer.querySelector('#character_sheet_author')?.textContent?.trim()).toBe('by Steven Medway');

    // A script with an author but no night order still gets the row
    fixture.componentInstance.selectScript(new Script({ id: 'authored', name: 'Authored', author: 'Someone', kind: 'Custom' }));
    fixture.detectChanges();
    expect(el.querySelector('.sheet-night-order')).toBeNull();
    expect(el.querySelector('#character_sheet_author')?.textContent?.trim()).toBe('by Someone');

    fixture.componentInstance.selectScript(TROUBLE_BREWING);
    fixture.detectChanges();
    expect(el.querySelector('.sheet-footer')).toBeNull();
  });

  it('opens each night of the night order as an aid, stepping aside until it closes', () => {
    let opened: PlayerAid | null = null;
    fixture.componentInstance.openAid.subscribe(aid => opened = aid);
    const isOpen = () => el.querySelector('.sheet-shelf')!.classList.contains('open');
    const nightOrder = NO_GREATER_JOY.nightOrder!;
    fixture.componentInstance.selectScript(NO_GREATER_JOY);

    click('#character_sheet_toggle');
    click('#character_sheet_first_night');
    expect(isOpen()).toBeFalse();
    expect(opened!.title).toBe('First Night');
    expect(opened!.blocks).toEqual([{ type: 'night-order', steps: nightOrder.firstNight }]);

    fixture.componentRef.setInput('activeAid', opened);
    fixture.detectChanges();
    fixture.componentRef.setInput('activeAid', null);
    fixture.detectChanges();
    expect(isOpen()).toBeTrue();

    click('#character_sheet_other_nights');
    expect(opened!.title).toBe('Other Nights');
    expect(opened!.blocks).toEqual([{ type: 'night-order', steps: nightOrder.otherNights }]);
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
    fixture.componentInstance.selectScript(ALL_SCRIPT);
    fixture.detectChanges();
    expect(headings()).toEqual(['Townsfolk', 'Outsiders', 'Minions', 'Demons', 'Travelers', 'Fabled', 'Loric']);
  });

  it("shows only the picked script's characters, and only the types it has", () => {
    const component = fixture.componentInstance;
    component.selectScript(new Script({ id: 'small', name: 'Small', kind: 'Custom', characters: [WASHERWOMAN, IMP] }));
    fixture.detectChanges();
    expect(headings()).toEqual(['Townsfolk', 'Demons']);
    expect(names('townsfolk')).toEqual(['Washerwoman']);

    component.selectScript(new Script({ id: 'bare', name: 'Bare', kind: 'Custom' }));
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

  it('lists custom scripts that are neither Teensyville nor reference under Custom, between Base and Teensyville', () => {
    const custom = new Script({ id: 'custom', name: 'Custom', kind: 'Custom' });
    const sections = sectionScripts([ALL_SCRIPT, NO_GREATER_JOY, custom, TROUBLE_BREWING, FABLED_AND_LORIC]);
    expect(sections.map(section => [section.title, section.scripts])).toEqual([
      ['Base', [TROUBLE_BREWING]],
      ['Custom', [custom]],
      ['Teensyville', [NO_GREATER_JOY]],
      ['Reference', [ALL_SCRIPT, FABLED_AND_LORIC]],
    ]);
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
