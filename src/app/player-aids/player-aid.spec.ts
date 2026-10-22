import { PlayerAid } from './player-aid';
import { Character } from '../character-sheets/character';
import { CHEF, SPY, WIDOW } from '../character-sheets/character-library';

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

  it('is about no character when made of blocks', () => {
    const aid = new PlayerAid({ id: 'blocks', title: 'Blocks', blocks: [{ type: 'text', text: 'Hello.' }] });
    expect(aid.character).toBeUndefined();
  });
});
