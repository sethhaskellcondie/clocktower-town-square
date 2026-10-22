import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerAidsComponent } from './player-aids.component';
import { PlayerAidSection } from './player-aid-section';
import { PlayerAidShelf } from './player-aid-shelf';
import { PlayerAid } from './player-aid';
import { HOW_TO_PLAY_VIDEO } from './player-aid-library';
import { ACROBAT } from '../character-sheets/character-library';
import { PlayerAidGroup } from './player-aid-group';
import { Character } from '../character-sheets/character';

describe('PlayerAidsComponent', () => {
  let fixture: ComponentFixture<PlayerAidsComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerAidsComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(PlayerAidsComponent);
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  function click(selector: string): void {
    (el.querySelector(selector) as HTMLElement).click();
    fixture.detectChanges();
  }

  it('toggles the shelf from the top-left button', () => {
    expect(el.querySelector('.aids-shelf')?.classList).not.toContain('open');
    click('#player_aids_toggle');
    expect(el.querySelector('.aids-shelf')?.classList).toContain('open');
    click('#player_aids_toggle');
    expect(el.querySelector('.aids-shelf')?.classList).not.toContain('open');
  });

  it('groups aids on the shelf under their section titles', () => {
    const titles = Array.from(el.querySelectorAll('.aid-section-title')).map(t => t.textContent?.trim());
    expect(titles).toEqual(['Introduction', 'The First Night', 'The First Day', 'Tips', 'Character FAQ (TB)', 'Character FAQ (BMR)', 'Character FAQ (S&V)', 'Fabled', 'Loric', 'Storyteller Tips']);
    expect(el.querySelector('#player_aid_section_tips #player_aid_tips_how-to-play-video')).not.toBeNull();
    expect(el.querySelector('#player_aid_section_character-faq #player_aid_character-faq_spy-grimoire')).not.toBeNull();
    expect(el.querySelector('#player_aid_section_storyteller-tips #player_aid_storyteller-tips_attract-mode-hotkeys')).not.toBeNull();
    expect(el.querySelector('#player_aid_section_storyteller-tips #player_aid_storyteller-tips_day-timer-hotkeys')).not.toBeNull();
  });

  it('picks the group from a dropdown under the group header, starting on All', () => {
    const titles = () => Array.from(el.querySelectorAll('.aid-section-title')).map(t => t.textContent?.trim());
    const header = () => el.querySelector('#player_aid_group_toggle');
    expect(header()?.textContent).toContain('Group: All');
    expect(header()?.getAttribute('aria-expanded')).toBe('false');
    expect(el.querySelector('.aid-group-menu')).toBeNull();

    click('#player_aid_group_toggle');
    const options = Array.from(el.querySelectorAll('.aid-group-option')).map(o => o.textContent?.trim());
    expect(options).toEqual(['All', 'Introduction', 'Learning', 'Veteran']);
    expect(el.querySelector('#player_aid_group_all')?.getAttribute('aria-selected')).toBe('true');

    click('#player_aid_section_toggle_tips');
    click('#player_aid_group_toggle');
    click('#player_aid_group_introduction');
    expect(el.querySelector('.aid-group-menu')).toBeNull();
    expect(header()?.textContent).toContain('Group: Introduction');
    expect(titles()).toEqual([]);

    click('#player_aid_group_toggle');
    expect(el.querySelector('#player_aid_group_introduction')?.classList).toContain('selected');
    expect(el.querySelector('#player_aid_group_all')?.classList).not.toContain('selected');

    // Switching groups starts the sections collapsed
    click('#player_aid_group_all');
    expect(header()?.textContent).toContain('Group: All');
    expect(titles()).toContain('Tips');
    expect(el.querySelector('#player_aid_section_tips')?.classList).not.toContain('expanded');
  });

  it('marks a group with no sections as empty', () => {
    fixture.componentInstance.shelf = new PlayerAidShelf([new PlayerAidGroup({ id: 'bare', name: 'Bare' })]);
    fixture.detectChanges();
    expect(el.querySelector('.aids-shelf-sections > .aid-empty')?.textContent).toContain('No sections yet.');
  });

  it('closes the group dropdown on a click elsewhere, then on Escape before the shelf', () => {
    click('#player_aids_toggle');
    click('#player_aid_group_toggle');
    click('#player_aid_section_toggle_tips');
    expect(el.querySelector('.aid-group-menu')).toBeNull();
    expect(el.querySelector('.aids-shelf')?.classList).toContain('open');

    click('#player_aid_group_toggle');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(el.querySelector('.aid-group-menu')).toBeNull();
    expect(el.querySelector('.aids-shelf')?.classList).toContain('open');
  });

  it('closes the shelf on a click outside it, but not on one inside it', () => {
    click('#player_aids_toggle');
    click('#player_aid_section_toggle_tips');
    expect(el.querySelector('.aids-shelf')?.classList).toContain('open');

    click('#player_aid_tips_how-to-play-video');
    click('.aid-backdrop');
    expect(el.querySelector('.aids-shelf')?.classList).toContain('open');

    document.body.click();
    fixture.detectChanges();
    expect(el.querySelector('.aids-shelf')?.classList).not.toContain('open');
  });

  it('collapses each section until its header is clicked', () => {
    const section = () => el.querySelector('#player_aid_section_introduction');
    const toggle = () => el.querySelector('#player_aid_section_toggle_introduction');
    expect(section()?.classList).not.toContain('expanded');
    expect(toggle()?.getAttribute('aria-expanded')).toBe('false');

    click('#player_aid_section_toggle_introduction');
    expect(section()?.classList).toContain('expanded');
    expect(toggle()?.getAttribute('aria-expanded')).toBe('true');
    expect(el.querySelector('#player_aid_section_character-faq')?.classList).not.toContain('expanded');

    click('#player_aid_section_toggle_introduction');
    expect(section()?.classList).not.toContain('expanded');
  });

  it('closes the open section when another one is opened', () => {
    click('#player_aid_section_toggle_introduction');
    click('#player_aid_section_toggle_character-faq');
    expect(el.querySelector('#player_aid_section_character-faq')?.classList).toContain('expanded');
    expect(el.querySelector('#player_aid_section_introduction')?.classList).not.toContain('expanded');
    expect(el.querySelectorAll('.aid-section.expanded').length).toBe(1);
  });

  it('marks a section with no aids as empty', () => {
    fixture.componentInstance.shelf = new PlayerAidShelf([new PlayerAidGroup({
      id: 'group',
      name: 'Group',
      sections: [
        new PlayerAidSection({ id: 'filled', title: 'Filled', aids: [HOW_TO_PLAY_VIDEO] }),
        new PlayerAidSection({ id: 'empty', title: 'Empty' }),
      ],
    })]);
    fixture.detectChanges();
    expect(el.querySelector('#player_aid_section_empty .aid-empty')?.textContent).toContain('No player aids yet.');
    expect(el.querySelector('#player_aid_section_filled .aid-empty')).toBeNull();
  });

  it('opens an aid in a modal with its text and picture', () => {
    click('#player_aids_toggle');
    click('#player_aid_tips_how-to-play-video');
    const modal = el.querySelector('.aid-modal');
    expect(modal?.querySelector('h2')?.textContent).toContain('How to Play');
    expect(modal?.textContent).toContain('Scan this to watch a video on how to play Blood on the Clocktower.');
    expect(modal?.querySelector('img')?.getAttribute('src')).toBe('assets/player_aids/qr_how_to_play_video.png');
  });

  it('renders inline icons inside paragraph text', () => {
    click('#player_aid_character-faq_spy-grimoire');
    const paragraph = el.querySelector('.aid-modal-body p');
    expect(paragraph?.textContent).toContain('The Spy');
    expect(paragraph?.querySelector('img.inline-icon')?.getAttribute('src')).toBe('assets/player_aids/icons/trouble_brewing/minions/spy.png');
  });

  it('lays out a character aid with its icon beside its ability, notes beneath, and a wiki link by the close button', () => {
    click('#player_aid_character-faq_butler');
    const modal = el.querySelector('.aid-modal')!;
    expect(modal.querySelector('h2')?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Butler (Outsider)');
    const link = modal.querySelector('.aid-modal-header > a.aid-wiki-link');
    expect(link?.textContent).toBe('Wiki Page');
    expect(link?.getAttribute('href')).toBe('https://wiki.bloodontheclocktower.com/Butler');
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.nextElementSibling?.id).toBe('player_aid_close');

    const row = modal.querySelector('.aid-modal-body > .aid-character')!;
    expect(row.querySelector('img.aid-character-icon')?.getAttribute('src')).toBe('assets/player_aids/icons/trouble_brewing/outsiders/butler.png');
    expect(row.querySelector('.aid-character-ability')?.textContent).toBe('Each night, choose a player (not yourself): tomorrow, you may only vote if they are voting too.');
    expect(row.nextElementSibling?.textContent).toContain('the Butler may only have their hand raised to vote');
  });

  it("starts an experimental character's ability with (Experimental)", () => {
    fixture.componentInstance.shelf.show(new PlayerAid({ character: ACROBAT }));
    fixture.detectChanges();
    expect(el.querySelector('.aid-character-ability')?.textContent).toBe(`(Experimental) ${ACROBAT.ability}`);
  });

  it('leaves out the notes of a character aid when the character has none', () => {
    fixture.componentInstance.shelf.show(new PlayerAid({
      character: new Character({ id: 'plain', name: 'Plain', icon: 'plain.png', type: 'Townsfolk', ability: 'Does a thing.', link: 'https://example.com/Plain' }),
    }));
    fixture.detectChanges();
    expect(el.querySelectorAll('.aid-modal-body > *').length).toBe(1);
  });

  it('renders bold and struck-through runs inside paragraph text', () => {
    fixture.componentInstance.shelf.show(new PlayerAid({
      id: 'styled-text',
      title: 'Styled Text',
      blocks: [{
        type: 'text',
        text: ['Plain, ', { text: 'a townsfolk', style: 'strike' }, ', ', { text: 'another player', style: 'bold' }],
      }],
    }));
    fixture.detectChanges();
    const paragraph = el.querySelector('.aid-modal-body p');
    expect(paragraph?.querySelector('s')?.textContent).toBe('a townsfolk');
    expect(paragraph?.querySelector('strong')?.textContent).toBe('another player');
  });

  it('renders a list block as a bulleted list', () => {
    fixture.componentInstance.shelf.show(new PlayerAid({
      id: 'listed',
      title: 'Listed',
      blocks: [{ type: 'list', items: ['Eyes Open', 'Eyes Closed'] }],
    }));
    fixture.detectChanges();
    const items = Array.from(el.querySelectorAll('.aid-modal-body ul li')).map(li => li.textContent);
    expect(items).toEqual(['Eyes Open', 'Eyes Closed']);
  });

  it('renders an ordered list block as a numbered list with styled text', () => {
    fixture.componentInstance.shelf.show(new PlayerAid({
      id: 'numbered',
      title: 'Numbered',
      blocks: [{ type: 'list', ordered: true, items: [[{ text: 'No peeking.', style: 'bold' }, ' Keep it secret.'], 'Play nice.'] }],
    }));
    fixture.detectChanges();
    const items = el.querySelectorAll('.aid-modal-body ol li');
    expect(el.querySelector('.aid-modal-body ul')).toBeNull();
    expect(items.length).toBe(2);
    expect(items[0].querySelector('strong')?.textContent).toBe('No peeking.');
    expect(items[1].textContent).toBe('Play nice.');
  });

  it('moves between the aids of a section with the arrow buttons and keys', () => {
    const title = () => el.querySelector('.aid-modal h2')?.textContent?.trim();
    const button = (id: string) => el.querySelector(id) as HTMLButtonElement;

    click('#player_aid_introduction_social-deduction');
    expect(button('#player_aid_previous').disabled).toBeTrue();
    click('#player_aid_next');
    expect(title()).toBe('The Setting');
    expect(el.querySelector('.aid-modal')).not.toBeNull();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();
    expect(title()).toBe('Player Traits');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    fixture.detectChanges();
    click('#player_aid_previous');
    expect(title()).toBe('Social Deduction');

    click('#player_aid_first-night_good-team-first-night');
    expect(button('#player_aid_next').disabled).toBeTrue();
  });

  it('closes the modal from the close button and the backdrop, but not from inside the modal', () => {
    click('#player_aid_tips_how-to-play-video');
    click('.aid-modal-body');
    expect(el.querySelector('.aid-modal')).not.toBeNull();
    click('#player_aid_close');
    expect(el.querySelector('.aid-modal')).toBeNull();

    click('#player_aid_tips_how-to-play-video');
    click('.aid-backdrop');
    expect(el.querySelector('.aid-modal')).toBeNull();
  });

  it('closes the modal, then the shelf, on Escape', () => {
    click('#player_aids_toggle');
    click('#player_aid_tips_how-to-play-video');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(el.querySelector('.aid-modal')).toBeNull();
    expect(el.querySelector('.aids-shelf')?.classList).toContain('open');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(el.querySelector('.aids-shelf')?.classList).not.toContain('open');
  });
});
