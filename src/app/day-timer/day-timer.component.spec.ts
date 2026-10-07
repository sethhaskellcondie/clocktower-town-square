import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DayTimerComponent } from './day-timer.component';
import { DayTimerService } from './day-timer.service';

describe('DayTimerComponent', () => {
  let fixture: ComponentFixture<DayTimerComponent>;
  let el: HTMLElement;
  let timer: DayTimerService;

  const display = () => el.querySelector('.display') as HTMLElement;
  const button = (id: string) => el.querySelector(id) as HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayTimerComponent],
    }).compileComponents();
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2026, 9, 2, 18, 0, 0));
    timer = TestBed.inject(DayTimerService);
    spyOn(timer.bell, 'play').and.resolveTo();
    fixture = TestBed.createComponent(DayTimerComponent);
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    timer.reset();
    fixture.destroy();
    jasmine.clock().uninstall();
  });

  it('is blank until it has time, then shows only the clock', () => {
    expect(display().textContent?.trim()).toBe('');
    expect(button('#day_timer_down').disabled).toBeTrue();

    timer.setMinutes(5);
    fixture.detectChanges();
    expect(display().textContent?.trim()).toBe('5:00');
  });

  it('adjusts the time by 30 seconds with the + and - buttons', () => {
    button('#day_timer_up').click();
    button('#day_timer_up').click();
    fixture.detectChanges();
    button('#day_timer_down').click();
    fixture.detectChanges();
    expect(display().textContent?.trim()).toBe('0:30');
  });

  it("shows time's up when it runs out, then goes blank", () => {
    timer.setMinutes(1);
    jasmine.clock().tick(60_000);
    fixture.detectChanges();
    expect(el.querySelector('.times-up')?.textContent).toBe("Time's up, return to your seats.");

    jasmine.clock().tick(10_000);
    fixture.detectChanges();
    expect(display().textContent?.trim()).toBe('');
  });
});
