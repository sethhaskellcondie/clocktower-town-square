import { PlayerAid } from './player-aid';
import { PlayerAidSection } from './player-aid-section';
import { PlayerAidShelf } from './player-aid-shelf';

describe('PlayerAidShelf', () => {
  const shared = new PlayerAid({ id: 'shared', title: 'Shared', blocks: [] });
  const nested = new PlayerAidSection({ id: 'nested', title: 'Nested', aids: [shared] });
  const first = new PlayerAidSection({ id: 'first', title: 'First', aids: [shared], subsections: [nested] });
  const second = new PlayerAidSection({ id: 'second', title: 'Second', aids: [shared] });
  let shelf: PlayerAidShelf;

  beforeEach(() => {
    shelf = new PlayerAidShelf([first, second]);
  });

  it('lets the same aid sit in several sections', () => {
    expect(first.aids[0]).toBe(shared);
    expect(nested.aids[0]).toBe(shared);
    expect(second.aids[0]).toBe(shared);
  });

  it('remembers which section the active aid was opened from', () => {
    shelf.openAid(shared, second);
    expect(shelf.activeAid).toBe(shared);
    expect(shelf.activeSection).toBe(second);
    shelf.closeAid();
    expect(shelf.activeAid).toBeNull();
    expect(shelf.activeSection).toBeNull();
  });

  it('keeps only one section open at a time, along with the sections it is nested in', () => {
    shelf.toggleSection(first);
    shelf.toggleSection(nested);
    expect(shelf.isExpanded(first)).toBeTrue();
    expect(shelf.isExpanded(nested)).toBeTrue();

    shelf.toggleSection(second);
    expect(shelf.isExpanded(second)).toBeTrue();
    expect(shelf.isExpanded(first)).toBeFalse();
    expect(shelf.isExpanded(nested)).toBeFalse();

    // Closing a section closes what's nested in it, so it reopens collapsed
    shelf.toggleSection(nested);
    shelf.toggleSection(first);
    expect(shelf.isExpanded(nested)).toBeFalse();
    shelf.toggleSection(first);
    expect(shelf.isExpanded(nested)).toBeFalse();
  });

  it('steps through the aids of the section the aid was opened from', () => {
    const before = new PlayerAid({ id: 'before', title: 'Before', blocks: [] });
    const after = new PlayerAid({ id: 'after', title: 'After', blocks: [] });
    const browsable = new PlayerAidSection({ id: 'browsable', title: 'Browsable', aids: [before, shared, after] });
    shelf = new PlayerAidShelf([browsable, second]);

    shelf.openAid(shared, browsable);
    expect(shelf.canBrowse).toBeTrue();
    shelf.showNext();
    expect(shelf.activeAid).toBe(after);
    expect(shelf.hasNext).toBeFalse();
    shelf.showNext();
    expect(shelf.activeAid).toBe(after);

    shelf.showPrevious();
    shelf.showPrevious();
    expect(shelf.activeAid).toBe(before);
    expect(shelf.hasPrevious).toBeFalse();

    // The same aid opened from a single-aid section has nothing to step to
    shelf.openAid(shared, second);
    expect(shelf.canBrowse).toBeFalse();
  });

  it('shows an aid from outside the shelf within the first section that lists it', () => {
    const onlyNested = new PlayerAid({ id: 'only-nested', title: 'Only nested', blocks: [] });
    const deep = new PlayerAidSection({ id: 'deep', title: 'Deep', aids: [onlyNested] });
    shelf = new PlayerAidShelf([new PlayerAidSection({ id: 'outer', title: 'Outer', subsections: [deep] }), second]);

    shelf.show(onlyNested);
    expect(shelf.activeAid).toBe(onlyNested);
    expect(shelf.activeSection).toBe(deep);

    shelf.show(shared);
    expect(shelf.activeSection).toBe(second);
  });

  it('steps back from the open aid, then the shelf', () => {
    shelf.toggle();
    shelf.openAid(shared, first);
    shelf.back();
    expect(shelf.activeAid).toBeNull();
    expect(shelf.open).toBeTrue();
    shelf.back();
    expect(shelf.open).toBeFalse();
  });
});
