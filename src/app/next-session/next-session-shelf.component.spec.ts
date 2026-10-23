import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NextSessionShelfComponent } from './next-session-shelf.component';
import { NextSessionService } from './next-session.service';

describe('NextSessionShelfComponent', () => {
  let fixture: ComponentFixture<NextSessionShelfComponent>;
  let el: HTMLElement;
  let nextSession: NextSessionService;

  const shelf = () => el.querySelector('.next-session-shelf') as HTMLElement;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [NextSessionShelfComponent],
    }).compileComponents();
    nextSession = TestBed.inject(NextSessionService);
    fixture = TestBed.createComponent(NextSessionShelfComponent);
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    localStorage.clear();
  });

  it('applies the class for the current mode', () => {
    expect(shelf().classList).toContain('next-session-shelf');
    expect(shelf().classList).toContain('mode-off');
    expect(shelf().getAttribute('aria-hidden')).toBe('true');

    nextSession.setMode('small');
    fixture.detectChanges();
    expect(shelf().classList).toContain('mode-small');
    expect(shelf().classList).not.toContain('mode-off');
    expect(shelf().getAttribute('aria-hidden')).toBe('false');

    nextSession.setMode('large');
    fixture.detectChanges();
    expect(shelf().classList).toContain('mode-large');
  });

  it('shows the sign-up text and QR code in the footer', () => {
    nextSession.setMode('small');
    fixture.detectChanges();
    expect(el.querySelector('.small-content .small-text')?.textContent).toContain("Sign up for next month's session!");
    expect(el.querySelector('.small-content .small-qr')?.getAttribute('src')).toBe('assets/qr_next_session.png');
  });

  it('shows the thanks, invite, and QR code only in full screen', () => {
    nextSession.setMode('small');
    fixture.detectChanges();
    expect(el.querySelector('.large-content')).toBeNull();

    nextSession.setMode('large');
    fixture.detectChanges();
    const large = el.querySelector('.large-content');
    expect(large?.querySelector('.large-thanks')?.textContent).toContain('Thanks to We Geek Together Provo for hosting this session!');
    expect(large?.querySelector('.large-invite')?.textContent).toContain('Use this link to sign up for the next session and bring a friend!');
    expect(large?.querySelector('.large-qr')?.getAttribute('src')).toBe('assets/qr_next_session.png');
  });

  it('expands with the chevron, shrinks back with it, and closes with the X', () => {
    const button = (id: string) => el.querySelector(id) as HTMLButtonElement | null;
    nextSession.setMode('small');
    fixture.detectChanges();

    button('#next_session_resize')!.click();
    fixture.detectChanges();
    expect(nextSession.mode()).toBe('large');
    // Large never goes straight to off
    expect(button('#next_session_close')).toBeNull();

    button('#next_session_resize')!.click();
    fixture.detectChanges();
    expect(nextSession.mode()).toBe('small');

    button('#next_session_close')!.click();
    expect(nextSession.mode()).toBe('off');
  });
});
