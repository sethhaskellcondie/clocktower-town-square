import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerAidsComponent } from './player-aids.component';

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
    expect(titles).toEqual(['Tutorial', 'Character Examples', 'Traveler']);
    expect(el.querySelector('#player_aid_section_tutorial #player_aid_how-to-play-video')).not.toBeNull();
    expect(el.querySelector('#player_aid_section_character-examples #player_aid_spy-grimoire')).not.toBeNull();
  });

  it('marks a section with no aids as empty', () => {
    expect(el.querySelector('#player_aid_section_traveler .aid-empty')?.textContent).toContain('No player aids yet.');
    expect(el.querySelector('#player_aid_section_tutorial .aid-empty')).toBeNull();
  });

  it('opens an aid in a modal with its text and picture', () => {
    click('#player_aids_toggle');
    click('#player_aid_how-to-play-video');
    const modal = el.querySelector('.aid-modal');
    expect(modal?.querySelector('h2')?.textContent).toContain('How to Play');
    expect(modal?.textContent).toContain('Scan this to watch a video on how to play Blood on the Clocktower.');
    expect(modal?.querySelector('img')?.getAttribute('src')).toBe('assets/player_aids/qr_how_to_play_video.png');
  });

  it('renders inline icons inside paragraph text', () => {
    click('#player_aid_spy-grimoire');
    const paragraph = el.querySelector('.aid-modal-body p');
    expect(paragraph?.textContent).toContain('The Spy');
    expect(paragraph?.querySelector('img.inline-icon')?.getAttribute('src')).toBe('assets/player_aids/icon_spy.png');
  });

  it('renders bold and struck-through runs inside paragraph text', () => {
    click('#player_aid_mayor-ability');
    const paragraph = el.querySelector('.aid-modal-body p');
    expect(paragraph?.querySelector('s')?.textContent).toBe('a townsfolk');
    expect(paragraph?.querySelector('strong')?.textContent).toBe('another player');
  });

  it('closes the modal from the close button and the backdrop, but not from inside the modal', () => {
    click('#player_aid_how-to-play-video');
    click('.aid-modal-body');
    expect(el.querySelector('.aid-modal')).not.toBeNull();
    click('#player_aid_close');
    expect(el.querySelector('.aid-modal')).toBeNull();

    click('#player_aid_how-to-play-video');
    click('.aid-backdrop');
    expect(el.querySelector('.aid-modal')).toBeNull();
  });

  it('closes the modal, then the shelf, on Escape', () => {
    click('#player_aids_toggle');
    click('#player_aid_how-to-play-video');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(el.querySelector('.aid-modal')).toBeNull();
    expect(el.querySelector('.aids-shelf')?.classList).toContain('open');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(el.querySelector('.aids-shelf')?.classList).not.toContain('open');
  });
});
