import { ALL_GROUP, INTRODUCTION_GROUP, LEARNING_GROUP, VETERAN_GROUP } from './player-aid-groups';

describe('Player aid groups', () => {
  it('lists every section from the other groups in "All"', () => {
    const missing = [INTRODUCTION_GROUP, LEARNING_GROUP, VETERAN_GROUP]
      .flatMap(group => group.sections.filter(section => !ALL_GROUP.sections.includes(section)).map(section => `${group.name}: ${section.title}`));
    expect(missing).toEqual([]);
  });
});
