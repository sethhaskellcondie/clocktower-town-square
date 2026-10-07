import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttractBannerComponent } from './attract-banner.component';
import { AttractModeService } from './attract-mode.service';
import { ATTRACT_REASONS } from './attract-reasons';

describe('AttractBannerComponent', () => {
  let fixture: ComponentFixture<AttractBannerComponent>;
  let el: HTMLElement;
  let attract: AttractModeService;

  const banner = () => el.querySelector('.attract-banner') as HTMLElement;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [AttractBannerComponent],
    }).compileComponents();
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2026, 9, 2, 18, 0, 0));
    attract = TestBed.inject(AttractModeService);
    fixture = TestBed.createComponent(AttractBannerComponent);
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    jasmine.clock().uninstall();
    localStorage.clear();
  });

  it('applies the class for the current mode', () => {
    expect(banner().classList).toContain('attract-banner');
    expect(banner().classList).toContain('mode-off');
    expect(banner().getAttribute('aria-hidden')).toBe('true');

    attract.setMode('small');
    fixture.detectChanges();
    expect(banner().classList).toContain('mode-small');
    expect(banner().classList).not.toContain('mode-off');
    expect(banner().getAttribute('aria-hidden')).toBe('false');

    attract.setMode('large');
    fixture.detectChanges();
    expect(banner().classList).toContain('mode-large');
  });

  it('shows the logo above the seats and countdown in the small header', () => {
    attract.setMode('small');
    attract.addSlot();
    attract.addSlot();
    attract.setMinutes(12);
    fixture.detectChanges();
    expect(el.querySelector('.small-content .small-logo')?.getAttribute('src')).toBe('assets/attract_mode/blood_on_the_clocktower_text.png');
    const text = el.querySelector('.small-stats')?.textContent;
    expect(text).toContain('2 SEATS LEFT');
    expect(text).toContain('NEXT GAME IN 12:00');
  });

  it('shows the title, seats, countdown, and footer in large mode', () => {
    attract.setMode('small');
    attract.setMode('large');
    fixture.detectChanges();
    const large = el.querySelector('.large-content');
    expect(large?.querySelector('.large-title img')?.getAttribute('alt')).toBe('Blood on the Clocktower');
    expect(large?.querySelector('.large-slots')?.textContent).toContain('Game full — join the waitlist!');
    expect(large?.querySelector('.large-countdown')?.textContent).toContain("It's not too late, join mid game!");
    expect(large?.querySelector('.large-footer')?.textContent).toContain('A Seth Condie Project');
  });

  it('shows reasons only in large mode, rotating every 6 seconds', () => {
    const activeReason = () => el.querySelector('.reason.active')?.textContent?.trim();

    attract.setMode('small');
    fixture.detectChanges();
    expect(el.querySelector('.reason')).toBeNull();

    attract.setMode('large');
    fixture.detectChanges();
    expect(el.querySelectorAll('.reason').length).toBe(ATTRACT_REASONS.length);
    expect(activeReason()).toBe(ATTRACT_REASONS[0]);

    jasmine.clock().tick(6000);
    fixture.detectChanges();
    expect(activeReason()).toBe(ATTRACT_REASONS[1]);
    expect(el.querySelectorAll('.dot.active').length).toBe(1);

    attract.setMode('small');
    fixture.detectChanges();
    expect(el.querySelector('.reason')).toBeNull();
  });

  it('changes the seats and countdown from the header buttons', () => {
    const button = (id: string) => el.querySelector(id) as HTMLButtonElement;
    attract.setMode('small');
    fixture.detectChanges();
    expect(button('#attract_slots_down').disabled).toBeTrue();
    expect(button('#attract_time_down').disabled).toBeTrue();

    button('#attract_slots_up').click();
    button('#attract_slots_up').click();
    fixture.detectChanges();
    button('#attract_slots_down').click();
    expect(attract.slotsLeft()).toBe(1);

    button('#attract_time_up').click();
    button('#attract_time_up').click();
    fixture.detectChanges();
    button('#attract_time_down').click();
    expect(attract.clockText()).toBe('1:00');
  });

  it('expands with the chevron, shrinks back with it, and closes with the X', () => {
    const button = (id: string) => el.querySelector(id) as HTMLButtonElement | null;
    attract.setMode('small');
    fixture.detectChanges();

    button('#attract_resize')!.click();
    fixture.detectChanges();
    expect(attract.mode()).toBe('large');
    // Large never goes straight to off
    expect(button('#attract_close')).toBeNull();

    button('#attract_resize')!.click();
    fixture.detectChanges();
    expect(attract.mode()).toBe('small');

    button('#attract_close')!.click();
    expect(attract.mode()).toBe('off');
  });
});
