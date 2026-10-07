import { AttractModeService } from './attract-mode.service';

describe('AttractModeService', () => {
  let service: AttractModeService;

  function key(code: string, init: KeyboardEventInit = {}): boolean {
    return service.handleKey(new KeyboardEvent('keydown', { code, ...init }));
  }

  beforeEach(() => {
    localStorage.clear();
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2026, 9, 2, 18, 0, 0));
    service = new AttractModeService();
  });

  afterEach(() => {
    service.ngOnDestroy();
    jasmine.clock().uninstall();
    localStorage.clear();
  });

  it('starts off, with no seats and an expired countdown', () => {
    expect(service.mode()).toBe('off');
    expect(service.slotsLeft()).toBe(0);
    expect(service.remainingMs()).toBe(0);
    expect(service.slotsText()).toBe('Game full — join the waitlist!');
    expect(service.countdownText()).toBe("It's not too late, join mid game!");
  });

  it('never drops the seats below 0, and says seat for just 1', () => {
    service.removeSlot();
    expect(service.slotsLeft()).toBe(0);
    service.addSlot();
    expect(service.slotsText()).toBe('1 SEAT LEFT');
    service.addSlot();
    expect(service.slotsText()).toBe('2 SEATS LEFT');
  });

  it('nudges an expired countdown from now, and clamps it at 0', () => {
    service.nudgeMinutes(1);
    expect(service.countdownText()).toBe('NEXT GAME IN 1:00');

    service.setMinutes(3);
    expect(service.clockText()).toBe('3:00');
    service.nudgeMinutes(-5);
    expect(service.remainingMs()).toBe(0);
    expect(service.endsAt()).toBe(0);
  });

  it('shows hours once the countdown is an hour or more', () => {
    service.setMinutes(75);
    expect(service.countdownText()).toBe('NEXT GAME IN 1:15:00');
  });

  it('counts down as the clock ticks, then starts now', () => {
    service.setMinutes(1);
    jasmine.clock().tick(1000);
    expect(service.clockText()).toBe('0:59');
    jasmine.clock().tick(59_000);
    expect(service.remainingMs()).toBe(0);
    expect(service.countdownText()).toBe("It's not too late, join mid game!");
  });

  it('resets the countdown to 0', () => {
    service.setMinutes(10);
    service.resetCountdown();
    expect(service.endsAt()).toBe(0);
    expect(service.countdownText()).toBe("It's not too late, join mid game!");
  });

  it('cycles off -> small -> large -> small -> off, then starts over', () => {
    const modes: string[] = [];
    for (let i = 0; i < 5; i++) {
      service.cycleMode();
      modes.push(service.mode());
    }
    expect(modes).toEqual(['small', 'large', 'small', 'off', 'small']);
  });

  it('only steps to a neighboring mode', () => {
    service.setMode('large');
    expect(service.mode()).toBe('off');

    service.setMode('small');
    service.setMode('large');
    service.setMode('off');
    expect(service.mode()).toBe('large');
  });

  it('keeps heading down after a reload in small', () => {
    service.cycleMode();
    service.cycleMode();
    service.cycleMode();
    expect(service.mode()).toBe('small');
    expect(service.direction()).toBe('down');

    const reloaded = new AttractModeService();
    expect(reloaded.direction()).toBe('down');
    reloaded.cycleMode();
    expect(reloaded.mode()).toBe('off');
    reloaded.ngOnDestroy();
  });

  it('loads the state a previous instance saved', () => {
    service.setMode('small');
    service.addSlot();
    service.addSlot();
    service.setMinutes(10);

    const reloaded = new AttractModeService();
    expect(reloaded.mode()).toBe('small');
    expect(reloaded.slotsLeft()).toBe(2);
    expect(reloaded.clockText()).toBe('10:00');
    reloaded.ngOnDestroy();
  });

  it('falls back to the defaults when the saved state is corrupt', () => {
    localStorage.setItem('clocktower-attract-mode', '{not json');
    const reloaded = new AttractModeService();
    expect(reloaded.mode()).toBe('off');
    expect(reloaded.direction()).toBe('up');
    expect(reloaded.slotsLeft()).toBe(0);
    expect(reloaded.endsAt()).toBe(0);
    reloaded.ngOnDestroy();
  });

  it('handles each hotkey', () => {
    expect(key('KeyA')).toBeTrue();
    expect(service.mode()).toBe('small');

    expect(key('ArrowUp')).toBeTrue();
    expect(key('ArrowUp')).toBeTrue();
    expect(key('ArrowDown')).toBeTrue();
    expect(service.slotsLeft()).toBe(1);

    expect(key('BracketRight')).toBeTrue();
    expect(key('BracketRight')).toBeTrue();
    expect(key('BracketLeft')).toBeTrue();
    expect(service.clockText()).toBe('1:00');

    expect(key('KeyR')).toBeTrue();
    expect(service.remainingMs()).toBe(0);

    expect(key('KeyB')).toBeFalse();
  });

  it('nudges by 5 minutes with Shift held', () => {
    key('BracketRight', { shiftKey: true, key: '}' });
    expect(service.clockText()).toBe('5:00');
    key('BracketLeft', { shiftKey: true, key: '{' });
    expect(service.remainingMs()).toBe(0);
  });

  it('ignores keys with Cmd, Ctrl, or Alt held', () => {
    expect(key('KeyA', { metaKey: true })).toBeFalse();
    expect(key('KeyA', { ctrlKey: true })).toBeFalse();
    expect(key('ArrowUp', { altKey: true })).toBeFalse();
    expect(service.mode()).toBe('off');
    expect(service.slotsLeft()).toBe(0);
  });

  it('ignores keys typed into a field', () => {
    const input = document.createElement('input');
    let handled: boolean | undefined;
    input.addEventListener('keydown', event => handled = service.handleKey(event));
    input.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA' }));
    expect(handled).toBeFalse();
    expect(service.mode()).toBe('off');
  });
});
