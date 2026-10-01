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

  it('opens the Hello World aid in a modal with its text and picture', () => {
    click('#player_aids_toggle');
    click('#player_aid_hello-world');
    const modal = el.querySelector('.aid-modal');
    expect(modal?.querySelector('h2')?.textContent).toContain('Hello World');
    expect(modal?.textContent).toContain('Hello World! This is a test player aid.');
    expect(modal?.querySelector('img')?.getAttribute('src')).toBe('assets/player_aids/hello_world.svg');
  });

  it('closes the modal from the close button and the backdrop, but not from inside the modal', () => {
    click('#player_aid_hello-world');
    click('.aid-modal-body');
    expect(el.querySelector('.aid-modal')).not.toBeNull();
    click('#player_aid_close');
    expect(el.querySelector('.aid-modal')).toBeNull();

    click('#player_aid_hello-world');
    click('.aid-backdrop');
    expect(el.querySelector('.aid-modal')).toBeNull();
  });

  it('closes the modal, then the shelf, on Escape', () => {
    click('#player_aids_toggle');
    click('#player_aid_hello-world');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(el.querySelector('.aid-modal')).toBeNull();
    expect(el.querySelector('.aids-shelf')?.classList).toContain('open');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(el.querySelector('.aids-shelf')?.classList).not.toContain('open');
  });
});
