import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerAidsComponent } from './player-aids.component';
import { PlayerAidSection } from './player-aid-section';
import { PlayerAidShelf } from './player-aid-shelf';
import { PlayerAid } from './player-aid';
import { HOW_TO_PLAY_VIDEO } from './player-aid-library';

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
    expect(titles).toEqual(['Tutorial', 'Character FAQ', 'Tips', 'Traveler', 'Fabled', 'Storyteller Tips']);
    expect(el.querySelector('#player_aid_section_tutorial #player_aid_tutorial_how-to-play-video')).not.toBeNull();
    expect(el.querySelector('#player_aid_section_character-faq #player_aid_character-faq_spy-grimoire')).not.toBeNull();
    expect(el.querySelector('#player_aid_section_storyteller-tips #player_aid_storyteller-tips_attract-mode-hotkeys')).not.toBeNull();
  });

  it('closes the shelf on a click outside it, but not on one inside it', () => {
    click('#player_aids_toggle');
    click('#player_aid_section_toggle_tutorial');
    expect(el.querySelector('.aids-shelf')?.classList).toContain('open');

    click('#player_aid_tutorial_how-to-play-video');
    click('.aid-backdrop');
    expect(el.querySelector('.aids-shelf')?.classList).toContain('open');

    document.body.click();
    fixture.detectChanges();
    expect(el.querySelector('.aids-shelf')?.classList).not.toContain('open');
  });

  it('collapses each section until its header is clicked', () => {
    const section = () => el.querySelector('#player_aid_section_tutorial');
    const toggle = () => el.querySelector('#player_aid_section_toggle_tutorial');
    expect(section()?.classList).not.toContain('expanded');
    expect(toggle()?.getAttribute('aria-expanded')).toBe('false');

    click('#player_aid_section_toggle_tutorial');
    expect(section()?.classList).toContain('expanded');
    expect(toggle()?.getAttribute('aria-expanded')).toBe('true');
    expect(el.querySelector('#player_aid_section_character-faq')?.classList).not.toContain('expanded');

    click('#player_aid_section_toggle_tutorial');
    expect(section()?.classList).not.toContain('expanded');
  });

  it('expands and collapses every section from the show all and hide all buttons', () => {
    const expanded = () => el.querySelectorAll('.aid-section.expanded').length;
    const total = el.querySelectorAll('.aid-section').length;

    click('#player_aids_show_all');
    expect(expanded()).toBe(total);

    click('#player_aids_hide_all');
    expect(expanded()).toBe(0);
  });

  it('marks a section with no aids as empty', () => {
    fixture.componentInstance.shelf = new PlayerAidShelf([
      new PlayerAidSection({ id: 'filled', title: 'Filled', aids: [HOW_TO_PLAY_VIDEO] }),
      new PlayerAidSection({ id: 'empty', title: 'Empty' }),
    ]);
    fixture.detectChanges();
    expect(el.querySelector('#player_aid_section_empty .aid-empty')?.textContent).toContain('No player aids yet.');
    expect(el.querySelector('#player_aid_section_filled .aid-empty')).toBeNull();
  });

  it('opens an aid in a modal with its text and picture', () => {
    click('#player_aids_toggle');
    click('#player_aid_tutorial_how-to-play-video');
    const modal = el.querySelector('.aid-modal');
    expect(modal?.querySelector('h2')?.textContent).toContain('How to Play');
    expect(modal?.textContent).toContain('Scan this to watch a video on how to play Blood on the Clocktower.');
    expect(modal?.querySelector('img')?.getAttribute('src')).toBe('assets/player_aids/qr_how_to_play_video.png');
  });

  it('renders inline icons inside paragraph text', () => {
    click('#player_aid_character-faq_spy-grimoire');
    const paragraph = el.querySelector('.aid-modal-body p');
    expect(paragraph?.textContent).toContain('The Spy');
    expect(paragraph?.querySelector('img.inline-icon')?.getAttribute('src')).toBe('assets/player_aids/icon_spy.png');
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

  it('moves between the aids of a section with the arrow buttons and keys', () => {
    const title = () => el.querySelector('.aid-modal h2')?.textContent?.trim();
    const button = (id: string) => el.querySelector(id) as HTMLButtonElement;

    click('#player_aid_tutorial_how-to-play-video');
    expect(button('#player_aid_previous').disabled).toBeTrue();
    click('#player_aid_next');
    expect(title()).toBe('Good vs Evil');
    expect(el.querySelector('.aid-modal')).not.toBeNull();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();
    expect(title()).toBe('Player Traits');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    fixture.detectChanges();
    click('#player_aid_previous');
    expect(title()).toBe('How to Play');

    click('#player_aid_tutorial_minions-first-night');
    expect(button('#player_aid_next').disabled).toBeTrue();
  });

  it('closes the modal from the close button and the backdrop, but not from inside the modal', () => {
    click('#player_aid_tutorial_how-to-play-video');
    click('.aid-modal-body');
    expect(el.querySelector('.aid-modal')).not.toBeNull();
    click('#player_aid_close');
    expect(el.querySelector('.aid-modal')).toBeNull();

    click('#player_aid_tutorial_how-to-play-video');
    click('.aid-backdrop');
    expect(el.querySelector('.aid-modal')).toBeNull();
  });

  it('closes the modal, then the shelf, on Escape', () => {
    click('#player_aids_toggle');
    click('#player_aid_tutorial_how-to-play-video');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(el.querySelector('.aid-modal')).toBeNull();
    expect(el.querySelector('.aids-shelf')?.classList).toContain('open');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(el.querySelector('.aids-shelf')?.classList).not.toContain('open');
  });
});
