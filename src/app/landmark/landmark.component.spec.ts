import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LandmarkComponent } from './landmark.component';

describe('LandmarkComponent', () => {
  let fixture: ComponentFixture<LandmarkComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandmarkComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(LandmarkComponent);
    fixture.componentRef.setInput('initialX', 200);
    fixture.componentRef.setInput('initialY', 150);
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  const square = () => el.querySelector('.landmark-square') as HTMLElement;
  const nameInput = () => el.querySelector('.name-input') as HTMLTextAreaElement | null;

  function press(x = 0, y = 0, button = 0): void {
    square().dispatchEvent(new MouseEvent('mousedown', { clientX: x, clientY: y, button, cancelable: true }));
  }

  function moveTo(x: number, y: number): void {
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: x, clientY: y }));
    fixture.detectChanges();
  }

  function release(): void {
    document.dispatchEvent(new MouseEvent('mouseup'));
    fixture.detectChanges();
  }

  function rightClick(): MouseEvent {
    const event = new MouseEvent('contextmenu', { cancelable: true });
    square().dispatchEvent(event);
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
    expect(square().style.left).toBe('200px');
    expect(square().style.top).toBe('150px');
  });

  it('follows the mouse while dragged, keeping the spot it was grabbed under the mouse', () => {
    press(210, 160);
    moveTo(310, 260);
    expect(square().style.left).toBe('300px');
    expect(square().style.top).toBe('250px');

    release();
    moveTo(500, 500);
    expect(square().style.left).toBe('300px');
    expect(square().style.top).toBe('250px');
  });

  it('ignores presses of any button but the left', () => {
    press(210, 160, 2);
    moveTo(310, 260);
    release();
    expect(square().style.left).toBe('200px');
    expect(square().style.top).toBe('150px');
  });

  it('edits the name on a right-click instead of opening the menu, and shows it once a second right-click ends editing', fakeAsync(() => {
    expect(rightClick().defaultPrevented).toBeTrue();
    tick();
    expect(document.activeElement).toBe(nameInput());

    nameInput()!.value = 'Town Square';
    nameInput()!.dispatchEvent(new Event('input'));
    rightClick();
    expect(nameInput()).toBeNull();
    expect(el.querySelector('.name-display')?.textContent).toBe('Town Square');
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
    expect(square().classList).toContain('size-large');
    expect(square().classList).toContain('texture-3');
    expect(square().classList).not.toContain('size-small');
  });
});
