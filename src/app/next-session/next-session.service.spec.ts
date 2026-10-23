import { NextSessionService } from './next-session.service';

describe('NextSessionService', () => {
  let service: NextSessionService;

  function key(code: string, init: KeyboardEventInit = {}): boolean {
    return service.handleKey(new KeyboardEvent('keydown', { code, ...init }));
  }

  beforeEach(() => {
    localStorage.clear();
    service = new NextSessionService();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('starts off', () => {
    expect(service.mode()).toBe('off');
    expect(service.direction()).toBe('up');
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

    const reloaded = new NextSessionService();
    expect(reloaded.direction()).toBe('down');
    reloaded.cycleMode();
    expect(reloaded.mode()).toBe('off');
  });

  it('falls back to the defaults when the saved state is corrupt', () => {
    localStorage.setItem('clocktower-next-session', '{not json');
    const reloaded = new NextSessionService();
    expect(reloaded.mode()).toBe('off');
    expect(reloaded.direction()).toBe('up');
  });

  it('cycles with Q, ignoring held repeats', () => {
    expect(key('KeyQ')).toBeTrue();
    expect(service.mode()).toBe('small');
    expect(key('KeyQ', { repeat: true })).toBeTrue();
    expect(service.mode()).toBe('small');

    expect(key('KeyA')).toBeFalse();
  });

  it('ignores keys with Cmd, Ctrl, or Alt held', () => {
    expect(key('KeyQ', { metaKey: true })).toBeFalse();
    expect(key('KeyQ', { ctrlKey: true })).toBeFalse();
    expect(key('KeyQ', { altKey: true })).toBeFalse();
    expect(service.mode()).toBe('off');
  });

  it('ignores keys typed into a field', () => {
    const input = document.createElement('input');
    let handled: boolean | undefined;
    input.addEventListener('keydown', event => handled = service.handleKey(event));
    input.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyQ' }));
    expect(handled).toBeFalse();
    expect(service.mode()).toBe('off');
  });
});
