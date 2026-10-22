import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PlayerComponent, PlayerState } from './player.component';

describe('PlayerComponent', () => {
  let fixture: ComponentFixture<PlayerComponent>;
  let el: HTMLElement;
  let changes: PlayerState[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(PlayerComponent);
    fixture.componentRef.setInput('initialX', 200);
    fixture.componentRef.setInput('initialY', 150);
    el = fixture.nativeElement;
    changes = [];
    fixture.componentInstance.stateChange.subscribe(state => changes.push(state));
    fixture.detectChanges();
  });

  const circle = () => el.querySelector('.player-circle') as HTMLElement;
  const nameInput = () => el.querySelector('.name-input') as HTMLTextAreaElement | null;

  function press(x = 0, y = 0, button = 0): void {
    circle().dispatchEvent(new MouseEvent('mousedown', { clientX: x, clientY: y, button, cancelable: true }));
  }

  function moveTo(x: number, y: number): void {
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: x, clientY: y }));
    fixture.detectChanges();
  }

  function release(): void {
    document.dispatchEvent(new MouseEvent('mouseup'));
    fixture.detectChanges();
  }

  function clickCircle(): void {
    press();
    release();
  }

  function rightClick(): MouseEvent {
    const event = new MouseEvent('contextmenu', { cancelable: true });
    circle().dispatchEvent(event);
    fixture.detectChanges();
    return event;
  }

  function keydown(key: string, shiftKey = false): KeyboardEvent {
    const event = new KeyboardEvent('keydown', { key, shiftKey, cancelable: true });
    nameInput()!.dispatchEvent(event);
    fixture.detectChanges();
    return event;
  }

  it('starts where it was placed', () => {
    expect(circle().style.left).toBe('200px');
    expect(circle().style.top).toBe('150px');
  });

  it('follows the mouse while dragged, keeping the spot it was grabbed under the mouse', () => {
    press(210, 160);
    moveTo(310, 260);
    expect(circle().style.left).toBe('300px');
    expect(circle().style.top).toBe('250px');

    release();
    moveTo(500, 500);
    expect(circle().style.left).toBe('300px');
    expect(circle().style.top).toBe('250px');
  });

  it('ignores presses of any button but the left', () => {
    press(210, 160, 2);
    moveTo(310, 260);
    release();
    expect(circle().style.left).toBe('200px');
    expect(fixture.componentInstance.state).toBe('alive');
  });

  it('steps through the states on each click at night: killed, dead with a vote, dead without, then alive again', () => {
    const states: [PlayerState, string][] = [
      ['killed during the night', 'killed-during-night'],
      ['dead with vote', 'dead-with-vote'],
      ['dead without vote', 'dead-without-vote'],
      ['alive', 'alive'],
    ];
    for (const [state, cssClass] of states) {
      clickCircle();
      expect(fixture.componentInstance.state).toBe(state);
      expect(circle().classList).toContain(cssClass);
    }
    expect(changes).toEqual(states.map(([state]) => state));
  });

  it('marks a living player for death on a click during the day, then a second click kills them', () => {
    fixture.componentRef.setInput('isDay', true);
    clickCircle();
    expect(fixture.componentInstance.state).toBe('marked for death');
    expect(circle().classList).toContain('marked-for-death');
    clickCircle();
    expect(fixture.componentInstance.state).toBe('dead with vote');
  });

  it('kills a player still marked for death during the night on the next click', () => {
    fixture.componentRef.setInput('isDay', true);
    clickCircle();
    fixture.componentRef.setInput('isDay', false);
    clickCircle();
    expect(fixture.componentInstance.state).toBe('killed during the night');
  });

  it('keeps its state when dragged rather than clicked', () => {
    press(210, 160);
    moveTo(220, 170);
    release();
    expect(fixture.componentInstance.state).toBe('alive');
    expect(changes).toEqual([]);
  });

  it('keeps its state while locked', () => {
    fixture.componentRef.setInput('locked', true);
    clickCircle();
    expect(fixture.componentInstance.state).toBe('alive');
    expect(changes).toEqual([]);
  });

  it('edits the name on a right-click instead of opening the menu, and shows it once a second right-click ends editing', fakeAsync(() => {
    expect(rightClick().defaultPrevented).toBeTrue();
    tick();
    expect(document.activeElement).toBe(nameInput());

    nameInput()!.value = 'Alice';
    nameInput()!.dispatchEvent(new Event('input'));
    rightClick();
    expect(nameInput()).toBeNull();
    expect(el.querySelector('.name-display')?.textContent).toBe('Alice');
  }));

  it('ends editing on Enter, but not on Shift+Enter, which starts a new line', fakeAsync(() => {
    rightClick();
    tick();
    expect(keydown('Enter', true).defaultPrevented).toBeFalse();
    expect(nameInput()).not.toBeNull();
    expect(keydown('Enter').defaultPrevented).toBeTrue();
    expect(nameInput()).toBeNull();
  }));

  it('ends editing when the name box loses focus', fakeAsync(() => {
    rightClick();
    tick();
    nameInput()!.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(nameInput()).toBeNull();
  }));

  it('takes its size and texture from its inputs', () => {
    fixture.componentRef.setInput('size', 'large');
    fixture.componentRef.setInput('texture', 3);
    fixture.detectChanges();
    expect(circle().classList).toContain('size-large');
    expect(circle().classList).toContain('texture-3');
    expect(circle().classList).not.toContain('size-small');
  });
});
