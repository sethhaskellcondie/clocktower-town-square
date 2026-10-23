import {
  ALL_SCRIPT,
  BAD_MOON_RISING,
  EXPERIMENTAL,
  FABLED_AND_LORIC,
  LAISSEZ_UN_FAIRE,
  NO_GREATER_JOY,
  OVER_THE_RIVER,
  RACE_TO_THE_BOTTOM,
  SECTS_AND_VIOLETS,
  TROUBLE_BREWING,
} from './script-library';
import { Script } from './script';
import { NightOrderStep } from '../player-aids/player-aid';

describe('Script library', () => {
  const baseScripts = [TROUBLE_BREWING, BAD_MOON_RISING, SECTS_AND_VIOLETS];
  const teensyvilleScripts = [NO_GREATER_JOY, RACE_TO_THE_BOTTOM, OVER_THE_RIVER, LAISSEZ_UN_FAIRE];
  const otherScripts = [...baseScripts, EXPERIMENTAL, FABLED_AND_LORIC, ...teensyvilleScripts];
  const count = (script: Script, type: string) => script.characters.filter(character => character.type === type).length;

  it('marks the official scripts as base, and "All", Experimental, Fabled and Loric, and the Teensyville scripts as custom', () => {
    for (const script of baseScripts) {
      expect(script.base).withContext(script.name).toBeTrue();
    }
    for (const script of [ALL_SCRIPT, EXPERIMENTAL, FABLED_AND_LORIC, ...teensyvilleScripts]) {
      expect(script.base).withContext(script.name).toBeFalse();
    }
  });

  it('marks only No Greater Joy, Race to the Bottom, Over the River, and Laissez Un Faire as Teensyville', () => {
    for (const script of [ALL_SCRIPT, ...otherScripts]) {
      expect(script.teensyville).withContext(script.name).toBe(teensyvilleScripts.includes(script));
    }
  });

  it('marks only "All", Experimental, and Fabled and Loric as reference scripts', () => {
    const referenceScripts = [ALL_SCRIPT, EXPERIMENTAL, FABLED_AND_LORIC];
    for (const script of [ALL_SCRIPT, ...otherScripts]) {
      expect(script.reference).withContext(script.name).toBe(referenceScripts.includes(script));
    }
  });

  it('credits each Teensyville script to its author, and no other script to one', () => {
    expect(NO_GREATER_JOY.author).toBe('Steven Medway');
    expect(RACE_TO_THE_BOTTOM.author).toBe('Evin Donahoe');
    expect(OVER_THE_RIVER.author).toBe('Andrew Nathenson');
    expect(LAISSEZ_UN_FAIRE.author).toBe('Steven Medway');
    for (const script of [ALL_SCRIPT, ...otherScripts].filter(script => !teensyvilleScripts.includes(script))) {
      expect(script.author).withContext(script.name).toBeUndefined();
    }
  });

  it('gives each Teensyville script the night order on its PDF, waking only its own characters, and no other script one', () => {
    const names = (steps: readonly NightOrderStep[]) => steps.map(step => 'character' in step ? step.character.name : step.name);
    const expected: [Script, string[], string[]][] = [
      [
        NO_GREATER_JOY,
        ['Dusk', 'Investigator', 'Empath', 'Clockmaker', 'Chambermaid', 'Dawn'],
        ['Dusk', 'Scarlet Woman', 'Imp', 'Sage', 'Empath', 'Chambermaid', 'Dawn'],
      ],
      [
        RACE_TO_THE_BOTTOM,
        ['Dusk', 'Barista', 'Minion info', 'Lunatic', 'Demon info', 'Courtier', 'Empath', 'Clockmaker', 'Dreamer', 'Spy', 'Dawn'],
        ['Dusk', 'Barista', 'Harlot', 'Courtier', 'Scarlet Woman', 'Lunatic', 'Vortox', 'Empath', 'Dreamer', 'Spy', 'Dawn'],
      ],
      [
        OVER_THE_RIVER,
        ['Dusk', 'Lunatic', 'Snake Charmer', 'Godfather', 'Grandmother', 'Clockmaker', 'Spy', 'Dawn'],
        ['Dusk', 'Innkeeper', 'Snake Charmer', 'Lunatic', 'Imp', 'Godfather', 'Professor', 'Grandmother', 'Spy', 'Dawn'],
      ],
      [
        LAISSEZ_UN_FAIRE,
        ['Dusk', 'Lunatic', 'Widow', 'Amnesiac', 'Balloonist', 'Dawn', 'Leviathan'],
        ['Dusk', 'Lunatic', 'Amnesiac', 'Balloonist', 'Dawn', 'Leviathan'],
      ],
    ];
    for (const [script, firstNight, otherNights] of expected) {
      expect(names(script.nightOrder!.firstNight)).withContext(script.name).toEqual(firstNight);
      expect(names(script.nightOrder!.otherNights)).withContext(script.name).toEqual(otherNights);
      for (const step of [...script.nightOrder!.firstNight, ...script.nightOrder!.otherNights]) {
        if ('character' in step) {
          expect(script.characters).withContext(`${script.name}: ${step.character.name}`).toContain(step.character);
        }
      }
    }

    for (const script of [ALL_SCRIPT, ...otherScripts].filter(script => !teensyvilleScripts.includes(script))) {
      expect(script.nightOrder).withContext(script.name).toBeUndefined();
    }
  });

  it('lists every No Greater Joy character once: 6 Townsfolk, 2 Outsiders, 2 Minions, and a Demon', () => {
    expect(count(NO_GREATER_JOY, 'Townsfolk')).toBe(6);
    expect(count(NO_GREATER_JOY, 'Outsider')).toBe(2);
    expect(count(NO_GREATER_JOY, 'Minion')).toBe(2);
    expect(count(NO_GREATER_JOY, 'Demon')).toBe(1);
    expect(NO_GREATER_JOY.characters.length).toBe(11);
    expect(new Set(NO_GREATER_JOY.characters.map(character => character.id)).size).toBe(11);
  });

  it('lists every Race to the Bottom character once: 6 Townsfolk, 2 Outsiders, 2 Minions, a Demon, 5 Travelers, and 2 Fabled', () => {
    expect(count(RACE_TO_THE_BOTTOM, 'Townsfolk')).toBe(6);
    expect(count(RACE_TO_THE_BOTTOM, 'Outsider')).toBe(2);
    expect(count(RACE_TO_THE_BOTTOM, 'Minion')).toBe(2);
    expect(count(RACE_TO_THE_BOTTOM, 'Demon')).toBe(1);
    expect(count(RACE_TO_THE_BOTTOM, 'Traveler')).toBe(5);
    expect(count(RACE_TO_THE_BOTTOM, 'Fabled')).toBe(2);
    expect(RACE_TO_THE_BOTTOM.characters.length).toBe(18);
    expect(new Set(RACE_TO_THE_BOTTOM.characters.map(character => character.id)).size).toBe(18);
  });

  for (const script of [OVER_THE_RIVER, LAISSEZ_UN_FAIRE]) {
    it(`lists every ${script.name} character once: 6 Townsfolk, 2 Outsiders, 2 Minions, and a Demon`, () => {
      expect(count(script, 'Townsfolk')).toBe(6);
      expect(count(script, 'Outsider')).toBe(2);
      expect(count(script, 'Minion')).toBe(2);
      expect(count(script, 'Demon')).toBe(1);
      expect(script.characters.length).toBe(11);
      expect(new Set(script.characters.map(character => character.id)).size).toBe(11);
    });
  }

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
