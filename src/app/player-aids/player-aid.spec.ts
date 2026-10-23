import { PlayerAid } from './player-aid';
import { Character } from '../character-sheets/character';
import { CHEF, DJINN, DJINN_A_GRIMM_CHORUS, EXORCIST, PUKKA, SPY, SUMMONER, WIDOW, YAGGABABBLE } from '../character-sheets/character-library';

describe('PlayerAid', () => {
  const character = new Character({
    id: 'plain',
    name: 'Plain',
    icon: 'plain.png',
    type: 'Townsfolk',
    ability: 'Does a thing.',
    link: 'https://example.com/Plain',
  });

  it('takes its id and title from a character, leaving the layout to the character', () => {
    const aid = new PlayerAid({ character, summary: 'A plain character.' });
    expect(aid.id).toBe('plain');
    expect(aid.title).toBe('Plain');
    expect(aid.summary).toBe('A plain character.');
    expect(aid.character).toBe(character);
    expect(aid.blocks).toEqual([]);
  });

  it('shows the pairs example beneath the Chef', () => {
    const aid = new PlayerAid({ character: CHEF });
    expect(aid.blocks).toEqual([jasmine.objectContaining({ type: 'image', src: 'assets/player_aids/pairs_example.png' })]);
  });

  it('shows the example Grimoire beneath the Spy and the Widow', () => {
    for (const character of [SPY, WIDOW]) {
      const aid = new PlayerAid({ character });
      expect(aid.blocks).toEqual([jasmine.objectContaining({ type: 'image', src: 'assets/player_aids/spy_grimoire.jpg' })]);
    }
  });

  it("lists a script's jinxes beneath its Djinn, each after the icons of the characters it's between", () => {
    const aid = new PlayerAid({ character: DJINN_A_GRIMM_CHORUS });
    expect(aid.title).toBe('Djinn, A Grimm Chorus');
    expect(aid.blocks).toEqual([
      { type: 'heading', text: 'Jinxes' },
      {
        type: 'list',
        items: [
          [{ character: SUMMONER }, { character: PUKKA }, ' The Summoner may summon a Pukka on the 2nd night instead of the 3rd.'],
          [{ character: YAGGABABBLE }, { character: EXORCIST }, ' If the Exorcist chooses the Yaggababble, the Yaggababble does not kill tonight.'],
        ],
      },
    ]);
  });

  it('lists no jinxes beneath the Djinn of no script', () => {
    expect(new PlayerAid({ character: DJINN }).blocks).toEqual([]);
  });

  it('is about no character when made of blocks', () => {
    const aid = new PlayerAid({ id: 'blocks', title: 'Blocks', blocks: [{ type: 'text', text: 'Hello.' }] });
    expect(aid.character).toBeUndefined();
  });
});
