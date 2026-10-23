import {
  A_GRIMM_CHORUS,
  ALL_SCRIPT,
  BAD_MOON_RISING,
  EVERYONE_CAN_PLAY,
  EXPERIMENTAL,
  FABLED_AND_LORIC,
  HIDE_AND_SEEK,
  LAISSEZ_UN_FAIRE,
  LUNAR_ECLIPSE,
  NO_GREATER_JOY,
  ONE_IN_ONE_OUT,
  OVER_THE_RIVER,
  RACE_TO_THE_BOTTOM,
  SECTS_AND_VIOLETS,
  TEENSY_TROUBLE_BREWING,
  TROUBLE_BREWING,
} from './script-library';
import { Script } from './script';
import { NightOrderStep } from '../player-aids/player-aid';
import { DJINN, DJINN_A_GRIMM_CHORUS, DJINN_LUNAR_ECLIPSE, DJINN_ONE_IN_ONE_OUT } from '../character-sheets/character-library';

describe('Script library', () => {
  const baseScripts = [TROUBLE_BREWING, BAD_MOON_RISING, SECTS_AND_VIOLETS];
  const customScripts = [EVERYONE_CAN_PLAY, A_GRIMM_CHORUS, HIDE_AND_SEEK, LUNAR_ECLIPSE, ONE_IN_ONE_OUT];
  const teensyvilleScripts = [TEENSY_TROUBLE_BREWING, NO_GREATER_JOY, RACE_TO_THE_BOTTOM, OVER_THE_RIVER, LAISSEZ_UN_FAIRE];
  // The custom and Teensyville scripts, each made from its own PDF
  const pdfScripts = [...customScripts, ...teensyvilleScripts];
  const otherScripts = [...baseScripts, EXPERIMENTAL, FABLED_AND_LORIC, ...pdfScripts];
  const count = (script: Script, type: string) => script.characters.filter(character => character.type === type).length;

  it('marks the official scripts as Base, the custom scripts as Custom, the Teensyville scripts as Teensyville, and "All", Experimental, and Fabled and Loric as Reference', () => {
    for (const script of baseScripts) {
      expect(script.kind).withContext(script.name).toBe('Base');
    }
    for (const script of customScripts) {
      expect(script.kind).withContext(script.name).toBe('Custom');
    }
    for (const script of teensyvilleScripts) {
      expect(script.kind).withContext(script.name).toBe('Teensyville');
    }
    for (const script of [ALL_SCRIPT, EXPERIMENTAL, FABLED_AND_LORIC]) {
      expect(script.kind).withContext(script.name).toBe('Reference');
    }
  });

  it('credits each custom and Teensyville script to its author, and no other script to one', () => {
    expect(EVERYONE_CAN_PLAY.author).toBe('Ben Burns');
    expect(A_GRIMM_CHORUS.author).toBe('Zets');
    expect(HIDE_AND_SEEK.author).toBe('Narninian and Zaba');
    expect(LUNAR_ECLIPSE.author).toBe('Ekin');
    expect(ONE_IN_ONE_OUT.author).toBe('Baron von Klutz');
    expect(NO_GREATER_JOY.author).toBe('Steven Medway');
    expect(RACE_TO_THE_BOTTOM.author).toBe('Evin Donahoe');
    expect(OVER_THE_RIVER.author).toBe('Andrew Nathenson');
    expect(LAISSEZ_UN_FAIRE.author).toBe('Steven Medway');
    expect(TEENSY_TROUBLE_BREWING.author).toBe('Seth Condie');
    for (const script of [ALL_SCRIPT, ...otherScripts].filter(script => !pdfScripts.includes(script))) {
      expect(script.author).withContext(script.name).toBeUndefined();
    }
  });

  it('gives each custom and Teensyville script the night order on its PDF, waking only its own characters, and no other script one', () => {
    const names = (steps: readonly NightOrderStep[]) => steps.map(step => 'character' in step ? step.character.name : step.name);
    const expected: [Script, string[], string[]][] = [
      [
        EVERYONE_CAN_PLAY,
        [
          'Dusk', 'Minion info', 'Demon info', 'Poisoner', "Devil's Advocate", 'Librarian', 'Empath', 'Fortune Teller', 'Grandmother',
          'Clockmaker', 'Spy', 'Dawn',
        ],
        [
          'Dusk', 'Poisoner', 'Gambler', 'Monk', "Devil's Advocate", 'Scarlet Woman', 'Imp', 'Assassin', 'Moonchild', 'Grandmother',
          'Ravenkeeper', 'Empath', 'Fortune Teller', 'Undertaker', 'Spy', 'Dawn',
        ],
      ],
      [
        A_GRIMM_CHORUS,
        [
          'Dusk', 'Yaggababble', 'Minion info', 'Summoner', 'Demon info', 'Godfather', 'Pukka', 'Damsel', 'Amnesiac', 'Village Idiot',
          'Nightwatchman', 'General', 'Dawn',
        ],
        [
          'Dusk', 'Innkeeper', 'Gambler', 'Scarlet Woman', 'Summoner', 'Exorcist', 'Pukka', 'Po', 'Ojo', 'Yaggababble', 'Assassin',
          'Godfather', 'Damsel', 'Amnesiac', 'Town Crier', 'Village Idiot', 'Nightwatchman', 'General', 'Dawn',
        ],
      ],
      [
        HIDE_AND_SEEK,
        [
          'Dusk', 'Minion info', 'Demon info', 'Preacher', 'Poisoner', 'Godfather', 'Cerenovus', 'Mezepheles', 'Pukka', 'Pixie', 'Huntsman',
          'Damsel', 'Librarian', 'Dreamer', 'Seamstress', 'Noble', 'Dawn',
        ],
        [
          'Dusk', 'Preacher', 'Poisoner', 'Cerenovus', 'Mezepheles', 'Imp', 'Pukka', 'Vigormortis', 'Ojo', 'Godfather', 'Huntsman', 'Damsel',
          'Ravenkeeper', 'Undertaker', 'Dreamer', 'Town Crier', 'Oracle', 'Seamstress', 'Dawn',
        ],
      ],
      [
        LUNAR_ECLIPSE,
        [
          'Dusk', 'Magician', 'Minion info', 'Lunatic', 'Demon info', 'Sailor', 'Marionette', 'Godfather', "Devil's Advocate", 'Pixie',
          'Grandmother', 'Spy', 'Chambermaid', 'Mathematician', 'Dawn',
        ],
        [
          'Dusk', 'Sailor', 'Innkeeper', "Devil's Advocate", 'Lunatic', 'Lycanthrope', 'Zombuul', 'No Dashii', 'Vigormortis', 'Assassin',
          'Godfather', 'Barber', 'Grandmother', 'Spy', 'Chambermaid', 'Mathematician', 'Dawn',
        ],
      ],
      [
        ONE_IN_ONE_OUT,
        [
          'Dusk', 'Kazali', 'Minion info', 'Demon info', 'Poisoner', 'Snake Charmer', 'Harpy', 'Mezepheles', 'Amnesiac', 'Fortune Teller',
          'Seamstress', 'Steward', 'Knight', 'Village Idiot', 'Spy', 'Ogre', 'High Priestess', 'Dawn',
        ],
        [
          'Dusk', 'Poisoner', 'Snake Charmer', 'Monk', 'Harpy', 'Mezepheles', 'Imp', 'Fang Gu', 'Ojo', 'Kazali', 'Amnesiac', 'Farmer',
          'Fortune Teller', 'Oracle', 'Seamstress', 'Village Idiot', 'Spy', 'High Priestess', 'Dawn',
        ],
      ],
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
      [
        TEENSY_TROUBLE_BREWING,
        ['Dusk', 'Poisoner', 'Empath', 'Fortune Teller', 'Spy', 'Dawn'],
        ['Dusk', 'Poisoner', 'Monk', 'Imp', 'Empath', 'Fortune Teller', 'Undertaker', 'Spy', 'Dawn'],
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

    for (const script of [ALL_SCRIPT, ...otherScripts].filter(script => !pdfScripts.includes(script))) {
      expect(script.nightOrder).withContext(script.name).toBeUndefined();
    }
  });

  it('lists every Everyone Can Play character once: 13 Townsfolk, 4 Outsiders, 6 Minions, and a Demon', () => {
    expect(count(EVERYONE_CAN_PLAY, 'Townsfolk')).toBe(13);
    expect(count(EVERYONE_CAN_PLAY, 'Outsider')).toBe(4);
    expect(count(EVERYONE_CAN_PLAY, 'Minion')).toBe(6);
    expect(count(EVERYONE_CAN_PLAY, 'Demon')).toBe(1);
    expect(EVERYONE_CAN_PLAY.characters.length).toBe(24);
    expect(new Set(EVERYONE_CAN_PLAY.characters.map(character => character.id)).size).toBe(24);
  });

  it('lists every A Grimm Chorus character once: 13 Townsfolk, 4 Outsiders, 4 Minions, 4 Demons, 5 Travelers, and the Djinn', () => {
    expect(count(A_GRIMM_CHORUS, 'Townsfolk')).toBe(13);
    expect(count(A_GRIMM_CHORUS, 'Outsider')).toBe(4);
    expect(count(A_GRIMM_CHORUS, 'Minion')).toBe(4);
    expect(count(A_GRIMM_CHORUS, 'Demon')).toBe(4);
    expect(count(A_GRIMM_CHORUS, 'Traveler')).toBe(5);
    expect(count(A_GRIMM_CHORUS, 'Fabled')).toBe(1);
    expect(A_GRIMM_CHORUS.characters.length).toBe(31);
    expect(new Set(A_GRIMM_CHORUS.characters.map(character => character.id)).size).toBe(31);
  });

  it('lists every Hide and Seek character once: 13 Townsfolk, 4 Outsiders, 4 Minions, and 4 Demons', () => {
    expect(count(HIDE_AND_SEEK, 'Townsfolk')).toBe(13);
    expect(count(HIDE_AND_SEEK, 'Outsider')).toBe(4);
    expect(count(HIDE_AND_SEEK, 'Minion')).toBe(4);
    expect(count(HIDE_AND_SEEK, 'Demon')).toBe(4);
    expect(HIDE_AND_SEEK.characters.length).toBe(25);
    expect(new Set(HIDE_AND_SEEK.characters.map(character => character.id)).size).toBe(25);
  });

  it('lists every Lunar Eclipse character once: 13 Townsfolk, 4 Outsiders, 5 Minions, 3 Demons, 5 Travelers, and 2 Fabled', () => {
    expect(count(LUNAR_ECLIPSE, 'Townsfolk')).toBe(13);
    expect(count(LUNAR_ECLIPSE, 'Outsider')).toBe(4);
    expect(count(LUNAR_ECLIPSE, 'Minion')).toBe(5);
    expect(count(LUNAR_ECLIPSE, 'Demon')).toBe(3);
    expect(count(LUNAR_ECLIPSE, 'Traveler')).toBe(5);
    expect(count(LUNAR_ECLIPSE, 'Fabled')).toBe(2);
    expect(LUNAR_ECLIPSE.characters.length).toBe(32);
    expect(new Set(LUNAR_ECLIPSE.characters.map(character => character.id)).size).toBe(32);
  });

  it('lists every One in one out character once: 13 Townsfolk, 4 Outsiders, 4 Minions, 4 Demons, and 2 Fabled', () => {
    expect(count(ONE_IN_ONE_OUT, 'Townsfolk')).toBe(13);
    expect(count(ONE_IN_ONE_OUT, 'Outsider')).toBe(4);
    expect(count(ONE_IN_ONE_OUT, 'Minion')).toBe(4);
    expect(count(ONE_IN_ONE_OUT, 'Demon')).toBe(4);
    expect(count(ONE_IN_ONE_OUT, 'Fabled')).toBe(2);
    expect(ONE_IN_ONE_OUT.characters.length).toBe(27);
    expect(new Set(ONE_IN_ONE_OUT.characters.map(character => character.id)).size).toBe(27);
  });

  it('gives each script with jinxes a Djinn of its own, named for it, holding jinxes between characters on the script', () => {
    const expected: [Script, string, number][] = [
      [A_GRIMM_CHORUS, 'Djinn, A Grimm Chorus', 2],
      [LUNAR_ECLIPSE, 'Djinn, Lunar Eclipse', 5],
      [ONE_IN_ONE_OUT, 'Djinn, One in one out', 2],
    ];
    for (const [script, name, jinxes] of expected) {
      const djinn = script.characters.find(character => character.jinxes)!;
      expect(djinn.name).withContext(script.name).toBe(name);
      expect(djinn.id).withContext(script.name).toBe(`djinn-${script.id}`);
      expect(djinn.jinxes!.length).withContext(script.name).toBe(jinxes);
      for (const jinx of djinn.jinxes!) {
        for (const character of jinx.characters) {
          expect(script.characters).withContext(`${script.name}: ${jinx.rule}`).toContain(character);
        }
      }
      expect(script.characters).withContext(script.name).not.toContain(DJINN);
    }
    expect(A_GRIMM_CHORUS.characters).toContain(DJINN_A_GRIMM_CHORUS);
    expect(LUNAR_ECLIPSE.characters).toContain(DJINN_LUNAR_ECLIPSE);
    expect(ONE_IN_ONE_OUT.characters).toContain(DJINN_ONE_IN_ONE_OUT);
    expect(HIDE_AND_SEEK.characters.some(character => character.jinxes)).toBeFalse();
  });

  it("makes each script's Djinn the Djinn in all but its name and jinxes", () => {
    for (const djinn of [DJINN_A_GRIMM_CHORUS, DJINN_LUNAR_ECLIPSE, DJINN_ONE_IN_ONE_OUT]) {
      expect(djinn.icon).withContext(djinn.name).toBe(DJINN.icon);
      expect(djinn.type).withContext(djinn.name).toBe('Fabled');
      expect(djinn.ability).withContext(djinn.name).toBe(DJINN.ability);
      expect(djinn.link).withContext(djinn.name).toBe(DJINN.link);
    }
    expect(DJINN.jinxes).toBeUndefined();
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

  it('lists every Teensy Trouble Brewing character once: 6 Townsfolk, 2 Outsiders, 2 Minions, a Demon, and a Fabled', () => {
    expect(count(TEENSY_TROUBLE_BREWING, 'Townsfolk')).toBe(6);
    expect(count(TEENSY_TROUBLE_BREWING, 'Outsider')).toBe(2);
    expect(count(TEENSY_TROUBLE_BREWING, 'Minion')).toBe(2);
    expect(count(TEENSY_TROUBLE_BREWING, 'Demon')).toBe(1);
    expect(count(TEENSY_TROUBLE_BREWING, 'Fabled')).toBe(1);
    expect(TEENSY_TROUBLE_BREWING.characters.length).toBe(12);
    expect(new Set(TEENSY_TROUBLE_BREWING.characters.map(character => character.id)).size).toBe(12);
  });

  it('lists every character from the other scripts in "All", with the Djinn in place of each script\'s own', () => {
    for (const script of otherScripts) {
      for (const character of script.characters) {
        if (character.jinxes) {
          expect(ALL_SCRIPT.characters).withContext(`${script.name}: ${character.name}`).not.toContain(character);
        } else {
          expect(ALL_SCRIPT.characters).withContext(`${script.name}: ${character.name}`).toContain(character);
        }
      }
    }
    expect(ALL_SCRIPT.characters).toContain(DJINN);
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
