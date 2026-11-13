import { LoadedAidsService } from './loaded-aids.service';
import {
  STORYTELLER_AIDS,
  THE_LUNATIC_CHOSE_THESE_PLAYERS,
  THESE_PLAYERS_ARE_NOT_LEGION,
  YOU_ARE_EVIL,
  YOU_ARE_GOOD,
} from './storyteller-aid-library';

describe('LoadedAidsService', () => {
  let service: LoadedAidsService;
  const standardAids = STORYTELLER_AIDS.filter(aid => aid.category === 'standard');

  beforeEach(() => {
    localStorage.clear();
    service = new LoadedAidsService();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('starts with the standard aids loaded, in library order, and the character aids unloaded', () => {
    expect(service.aids()).toEqual(standardAids);
    expect(service.isLoaded(THE_LUNATIC_CHOSE_THESE_PLAYERS)).toBeFalse();
    expect(service.isLoaded(THESE_PLAYERS_ARE_NOT_LEGION)).toBeFalse();
  });

  it('unloads an aid, and loads it back again', () => {
    service.toggle(YOU_ARE_EVIL);
    expect(service.isLoaded(YOU_ARE_EVIL)).toBeFalse();
    expect(service.aids()).not.toContain(YOU_ARE_EVIL);

    service.toggle(YOU_ARE_EVIL);
    expect(service.isLoaded(YOU_ARE_EVIL)).toBeTrue();
    expect(service.aids()).toEqual(standardAids);
  });

  it('loads a character aid, in its place after the standard aids', () => {
    service.toggle(THE_LUNATIC_CHOSE_THESE_PLAYERS);
    expect(service.isLoaded(THE_LUNATIC_CHOSE_THESE_PLAYERS)).toBeTrue();
    expect(service.aids()).toEqual([...standardAids, THE_LUNATIC_CHOSE_THESE_PLAYERS]);
  });

  it('remembers which aids are loaded and unloaded across a refresh', () => {
    service.toggle(YOU_ARE_GOOD);
    service.toggle(THESE_PLAYERS_ARE_NOT_LEGION);
    const reloaded = new LoadedAidsService();
    expect(reloaded.isLoaded(YOU_ARE_GOOD)).toBeFalse();
    expect(reloaded.isLoaded(YOU_ARE_EVIL)).toBeTrue();
    expect(reloaded.isLoaded(THESE_PLAYERS_ARE_NOT_LEGION)).toBeTrue();
    expect(reloaded.isLoaded(THE_LUNATIC_CHOSE_THESE_PLAYERS)).toBeFalse();
  });

  it('remembers a character aid unloaded again, after loading it', () => {
    service.toggle(THE_LUNATIC_CHOSE_THESE_PLAYERS);
    service.toggle(THE_LUNATIC_CHOSE_THESE_PLAYERS);
    expect(new LoadedAidsService().isLoaded(THE_LUNATIC_CHOSE_THESE_PLAYERS)).toBeFalse();
  });

  it('starts the aids as their categories say when what was saved is unreadable', () => {
    localStorage.setItem('clocktower-storyteller-aids', '{not json');
    expect(new LoadedAidsService().aids()).toEqual(standardAids);
    localStorage.setItem('clocktower-storyteller-aids', '{"unloaded":"you-are-good","loaded":[7,null]}');
    expect(new LoadedAidsService().aids()).toEqual(standardAids);
  });
});
