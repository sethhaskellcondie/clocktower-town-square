import { ALL_SCRIPT, BAD_MOON_RISING, SECTS_AND_VIOLETS, TROUBLE_BREWING } from './script-library';

describe('Script library', () => {
  const baseScripts = [TROUBLE_BREWING, BAD_MOON_RISING, SECTS_AND_VIOLETS];

  it('marks the official scripts as base and "All" as custom', () => {
    for (const script of baseScripts) {
      expect(script.base).withContext(script.name).toBeTrue();
    }
    expect(ALL_SCRIPT.base).toBeFalse();
  });

  it('lists every section from the other scripts in "All"', () => {
    for (const script of baseScripts) {
      for (const section of script.sections) {
        expect(ALL_SCRIPT.sections).withContext(`${script.name}: ${section.title}`).toContain(section);
      }
    }
  });

  it('lists every character from the other scripts in "All"', () => {
    for (const script of baseScripts) {
      for (const character of script.characters) {
        expect(ALL_SCRIPT.characters).withContext(`${script.name}: ${character.name}`).toContain(character);
      }
    }
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
});
