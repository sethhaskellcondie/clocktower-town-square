import { TestBed } from '@angular/core/testing';
import { StorytellerAidCardComponent } from './storyteller-aid-card.component';
import { StorytellerAid } from './storyteller-aid';
import { YOU_ARE_EVIL } from './storyteller-aid-library';

describe('StorytellerAidCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorytellerAidCardComponent],
    }).compileComponents();
  });

  function render(aid: StorytellerAid): HTMLElement {
    const fixture = TestBed.createComponent(StorytellerAidCardComponent);
    fixture.componentInstance.aid = aid;
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows each line of text, setting the emphasized one apart', () => {
    const card = render(YOU_ARE_EVIL);
    const lines = Array.from(card.querySelectorAll('.text .line'));
    expect(lines.map(line => line.textContent)).toEqual(['You', 'are', 'evil']);
    expect(lines.map(line => line.classList.contains('emphasis'))).toEqual([false, false, true]);
  });

  it('reads as one sentence to screen readers', () => {
    const card = render(YOU_ARE_EVIL);
    expect(card.querySelector('.card')?.getAttribute('aria-label')).toBe('You are evil');
  });

  it("is washed in the aid's color", () => {
    const card = render(YOU_ARE_EVIL);
    const style = (card.querySelector('.card') as HTMLElement).style;
    expect(style.getPropertyValue('--aid-color')).toBe(YOU_ARE_EVIL.color);
  });

  it('draws a custom picture shape by shape, light or dark, filled or as a line', () => {
    const card = render(
      new StorytellerAid({
        id: 'custom',
        color: '#123456',
        picture: {
          shapes: [
            { paint: 'light', d: 'M10 10H90V90H10Z' },
            { paint: 'dark', d: 'M30 30H70V70H30Z' },
            { paint: 'dark', line: true, width: 3, d: 'M10 50H90' },
          ],
        },
        text: ['A', { emphasis: 'custom' }, 'aid'],
      }),
    );
    const paths = Array.from(card.querySelectorAll('.picture path')) as SVGPathElement[];
    expect(paths.map(path => path.getAttribute('d'))).toEqual(['M10 10H90V90H10Z', 'M30 30H70V70H30Z', 'M10 50H90']);
    expect(paths.map(path => path.classList.contains('dark'))).toEqual([false, true, true]);
    expect(paths.map(path => path.classList.contains('line'))).toEqual([false, false, true]);
    expect(paths[2].style.strokeWidth).toBe('3');
  });
});
