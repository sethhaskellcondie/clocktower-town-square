import { ALL_SCRIPT, BAD_MOON_RISING, EXPERIMENTAL, FABLED_AND_LORIC, NO_GREATER_JOY, SECTS_AND_VIOLETS, TROUBLE_BREWING } from './script-library';
import { NightOrderStep } from '../player-aids/player-aid';

describe('Script library', () => {
  const baseScripts = [TROUBLE_BREWING, BAD_MOON_RISING, SECTS_AND_VIOLETS];
  const otherScripts = [...baseScripts, EXPERIMENTAL, FABLED_AND_LORIC, NO_GREATER_JOY];

  it('marks the official scripts as base, and "All", Experimental, Fabled and Loric, and No Greater Joy as custom', () => {
    for (const script of baseScripts) {
      expect(script.base).withContext(script.name).toBeTrue();
    }
    expect(ALL_SCRIPT.base).toBeFalse();
    expect(EXPERIMENTAL.base).toBeFalse();
    expect(FABLED_AND_LORIC.base).toBeFalse();
    expect(NO_GREATER_JOY.base).toBeFalse();
  });

  it('marks only No Greater Joy as Teensyville', () => {
    for (const script of [ALL_SCRIPT, ...otherScripts]) {
      expect(script.teensyville).withContext(script.name).toBe(script === NO_GREATER_JOY);
    }
  });

  it('credits No Greater Joy to Steven Medway', () => {
    expect(NO_GREATER_JOY.author).toBe('Steven Medway');
  });

  it('gives No Greater Joy a night order from Dusk to Dawn, waking only its own characters, and no other script one', () => {
    const { firstNight, otherNights } = NO_GREATER_JOY.nightOrder!;
    const names = (steps: readonly NightOrderStep[]) => steps.map(step => 'character' in step ? step.character.name : step.name);
    expect(names(firstNight)).toEqual(['Dusk', 'Investigator', 'Empath', 'Clockmaker', 'Chambermaid', 'Dawn']);
    expect(names(otherNights)).toEqual(['Dusk', 'Scarlet Woman', 'Imp', 'Sage', 'Empath', 'Chambermaid', 'Dawn']);
    for (const step of [...firstNight, ...otherNights]) {
      if ('character' in step) {
        expect(NO_GREATER_JOY.characters).withContext(step.character.name).toContain(step.character);
      }
    }

    for (const script of [ALL_SCRIPT, ...otherScripts].filter(script => script !== NO_GREATER_JOY)) {
      expect(script.nightOrder).withContext(script.name).toBeUndefined();
    }
  });

  it('lists every No Greater Joy character once: 6 Townsfolk, 2 Outsiders, 2 Minions, and a Demon', () => {
    const count = (type: string) => NO_GREATER_JOY.characters.filter(character => character.type === type).length;
    expect(count('Townsfolk')).toBe(6);
    expect(count('Outsider')).toBe(2);
    expect(count('Minion')).toBe(2);
    expect(count('Demon')).toBe(1);
    expect(NO_GREATER_JOY.characters.length).toBe(11);
    expect(new Set(NO_GREATER_JOY.characters.map(character => character.id)).size).toBe(11);
  });

  it('lists every character from the other scripts in "All"', () => {
    for (const script of otherScripts) {
      for (const character of script.characters) {
        expect(ALL_SCRIPT.characters).withContext(`${script.name}: ${character.name}`).toContain(character);
      }
    }
  });

  it('lists every character in "All" once', () => {
    const ids = ALL_SCRIPT.characters.map(character => character.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.length).toBe(181);
  });

  it('lists every Trouble Brewing character once: 13 Townsfolk, 4 Outsiders, 4 Minions, a Demon, and 5 Travelers', () => {
    const count = (type: string) => TROUBLE_BREWING.characters.filter(character => character.type === type).length;
    expect(count('Townsfolk')).toBe(13);
    expect(count('Outsider')).toBe(4);
    expect(count('Minion')).toBe(4);
    expect(count('Demon')).toBe(1);
    expect(count('Traveler')).toBe(5);
    expect(TROUBLE_BREWING.characters.length).toBe(27);
    expect(new Set(TROUBLE_BREWING.characters.map(character => character.id)).size).toBe(27);
  });

  for (const script of [BAD_MOON_RISING, SECTS_AND_VIOLETS]) {
    it(`lists every ${script.name} character once: 13 Townsfolk, 4 Outsiders, 4 Minions, 4 Demons, and 5 Travelers`, () => {
      const count = (type: string) => script.characters.filter(character => character.type === type).length;
      expect(count('Townsfolk')).toBe(13);
      expect(count('Outsider')).toBe(4);
      expect(count('Minion')).toBe(4);
      expect(count('Demon')).toBe(4);
      expect(count('Traveler')).toBe(5);
      expect(script.characters.length).toBe(30);
      expect(new Set(script.characters.map(character => character.id)).size).toBe(30);
    });
  }

  it('lists every experimental character once: 30 Townsfolk, 11 Outsiders, 15 Minions, 10 Demons, and 3 Travelers', () => {
    const count = (type: string) => EXPERIMENTAL.characters.filter(character => character.type === type).length;
    expect(count('Townsfolk')).toBe(30);
    expect(count('Outsider')).toBe(11);
    expect(count('Minion')).toBe(15);
    expect(count('Demon')).toBe(10);
    expect(count('Traveler')).toBe(3);
    expect(EXPERIMENTAL.characters.length).toBe(69);
    expect(new Set(EXPERIMENTAL.characters.map(character => character.id)).size).toBe(69);
  });

  it('lists every Fabled and Loric once, 14 Fabled and 11 Loric, and no other types', () => {
    const count = (type: string) => FABLED_AND_LORIC.characters.filter(character => character.type === type).length;
    expect(count('Fabled')).toBe(14);
    expect(count('Loric')).toBe(11);
    expect(FABLED_AND_LORIC.characters.length).toBe(25);
    expect(new Set(FABLED_AND_LORIC.characters.map(character => character.id)).size).toBe(25);
  });

  it('marks the experimental characters as experimental, and no others', () => {
    for (const character of EXPERIMENTAL.characters) {
      expect(character.experimental).withContext(character.name).toBeTrue();
    }
    for (const script of baseScripts) {
      for (const character of script.characters) {
        expect(character.experimental).withContext(character.name).toBeFalse();
      }
    }
  });
});
