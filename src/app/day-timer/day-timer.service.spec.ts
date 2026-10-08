import { DayTimerService } from './day-timer.service';

describe('DayTimerService', () => {
  let service: DayTimerService;
  let play: jasmine.Spy;
  let pause: jasmine.Spy;

  function key(code: string, init: KeyboardEventInit = {}): boolean {
    return service.handleKey(new KeyboardEvent('keydown', { code, ...init }));
  }

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2026, 9, 2, 18, 0, 0));
    service = new DayTimerService();
    play = spyOn(service.bell, 'play').and.resolveTo();
    pause = spyOn(service.bell, 'pause');
  });

  afterEach(() => {
    service.ngOnDestroy();
    jasmine.clock().uninstall();
  });

  it('starts stopped, with no time left and no bell', () => {
    expect(service.remainingMs()).toBe(0);
    expect(service.timesUp()).toBeFalse();
    expect(play).not.toHaveBeenCalled();
  });

  it('nudges a stopped timer from now, and stops quietly when nudged past 0', () => {
    service.nudgeSeconds(60);
    expect(service.clockText()).toBe('1:00');

    service.setMinutes(3);
    service.nudgeSeconds(-300);
    expect(service.endsAt()).toBe(0);
    jasmine.clock().tick(1000);
    expect(service.timesUp()).toBeFalse();
    expect(play).not.toHaveBeenCalled();
  });

  it('keeps counting minutes past an hour', () => {
    service.setMinutes(75);
    expect(service.clockText()).toBe('75:00');
  });

  it('counts down, then tolls for 10 seconds and fades the bell out', () => {
    service.setMinutes(1);
    jasmine.clock().tick(1000);
    expect(service.clockText()).toBe('0:59');

    jasmine.clock().tick(59_000);
    expect(service.remainingMs()).toBe(0);
    expect(service.timesUp()).toBeTrue();
    expect(play).toHaveBeenCalledTimes(1);

    jasmine.clock().tick(9_999);
    expect(service.timesUp()).toBeTrue();
    jasmine.clock().tick(1);
    expect(service.timesUp()).toBeFalse();

    // Fading, not cut off
    pause.calls.reset();
    jasmine.clock().tick(1500);
    expect(service.bell.volume).toBeGreaterThan(0);
    expect(service.bell.volume).toBeLessThan(1);
    expect(pause).not.toHaveBeenCalled();

    jasmine.clock().tick(1500);
    expect(pause).toHaveBeenCalled();
    expect(service.bell.volume).toBe(1);
  });

  it('cuts the text short on reset, and stops the countdown', () => {
    service.setMinutes(1);
    jasmine.clock().tick(60_000);
    expect(service.timesUp()).toBeTrue();

    service.reset();
    expect(service.timesUp()).toBeFalse();

    service.setMinutes(2);
    service.reset();
    expect(service.endsAt()).toBe(0);
  });

  it('tolls the bell on demand for 10 seconds, then fades it out', () => {
    service.setMinutes(2);
    service.tollBell();
    expect(play).toHaveBeenCalledTimes(1);
    expect(service.timesUp()).toBeFalse();
    expect(service.clockText()).toBe('2:00');

    pause.calls.reset();
    jasmine.clock().tick(10_000 + 1500);
    expect(service.bell.volume).toBeLessThan(1);
    expect(pause).not.toHaveBeenCalled();

    jasmine.clock().tick(1500);
    expect(pause).toHaveBeenCalled();
    expect(service.bell.volume).toBe(1);
  });

  it('fades a toll out early on reset', () => {
    service.tollBell();
    service.reset();
    jasmine.clock().tick(3000);
    expect(pause).toHaveBeenCalled();
    expect(service.bell.volume).toBe(1);
  });

  it('starts a new countdown over a tolling bell when time is added', () => {
    service.setMinutes(1);
    jasmine.clock().tick(60_000);
    service.nudgeSeconds(60);
    expect(service.timesUp()).toBeFalse();
    expect(service.clockText()).toBe('1:00');
  });

  it('nudges by 30 seconds, or 5 minutes with Shift, and resets on 0', () => {
    expect(key('Equal')).toBeTrue();
    expect(service.clockText()).toBe('0:30');
    expect(key('Equal', { shiftKey: true })).toBeTrue();
    expect(service.clockText()).toBe('5:30');
    expect(key('Minus')).toBeTrue();
    expect(service.clockText()).toBe('5:00');
    expect(key('Minus', { shiftKey: true })).toBeTrue();
    expect(service.endsAt()).toBe(0);

    key('Equal');
    expect(key('Digit0')).toBeTrue();
    expect(service.endsAt()).toBe(0);
  });

  it('ignores other keys, shortcuts, and typing in fields', () => {
    expect(key('KeyA')).toBeFalse();
    expect(key('Equal', { metaKey: true })).toBeFalse();

    const input = document.createElement('input');
    const event = new KeyboardEvent('keydown', { code: 'Equal' });
    Object.defineProperty(event, 'target', { value: input });
    expect(service.handleKey(event)).toBeFalse();
    expect(service.endsAt()).toBe(0);
  });
});
