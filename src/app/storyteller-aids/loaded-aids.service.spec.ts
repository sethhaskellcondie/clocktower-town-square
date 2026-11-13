import { LoadedAidsService } from './loaded-aids.service';
import { STORYTELLER_AIDS, YOU_ARE_EVIL, YOU_ARE_GOOD } from './storyteller-aid-library';

describe('LoadedAidsService', () => {
  let service: LoadedAidsService;

  beforeEach(() => {
    localStorage.clear();
    service = new LoadedAidsService();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('starts with every aid loaded, in library order', () => {
    expect(service.aids()).toEqual(STORYTELLER_AIDS);
    expect(STORYTELLER_AIDS.every(aid => service.isLoaded(aid))).toBeTrue();
  });

  it('unloads an aid, and loads it back again', () => {
    service.toggle(YOU_ARE_EVIL);
    expect(service.isLoaded(YOU_ARE_EVIL)).toBeFalse();
    expect(service.aids()).not.toContain(YOU_ARE_EVIL);

    service.toggle(YOU_ARE_EVIL);
    expect(service.isLoaded(YOU_ARE_EVIL)).toBeTrue();
    expect(service.aids()).toEqual(STORYTELLER_AIDS);
  });

  it('remembers which aids are unloaded across a refresh', () => {
    service.toggle(YOU_ARE_GOOD);
    const reloaded = new LoadedAidsService();
    expect(reloaded.isLoaded(YOU_ARE_GOOD)).toBeFalse();
    expect(reloaded.isLoaded(YOU_ARE_EVIL)).toBeTrue();
  });

  it('loads every aid when what was saved is unreadable', () => {
    localStorage.setItem('clocktower-storyteller-aids', '{not json');
    expect(new LoadedAidsService().aids()).toEqual(STORYTELLER_AIDS);
    localStorage.setItem('clocktower-storyteller-aids', '{"unloaded":"you-are-good"}');
    expect(new LoadedAidsService().aids()).toEqual(STORYTELLER_AIDS);
  });
});
