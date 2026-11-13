import { STORYTELLER_AID_PICTURES, pictureFromSvg } from './storyteller-aid-pictures';

describe('pictureFromSvg', () => {
  it('reads each path in order, light unless classed dark, a line if classed one', () => {
    const picture = pictureFromSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <style>path { fill: red; }</style>
        <!-- A square with a hole in it, crossed out -->
        <path class="light" d="M10 10H90V90H10Z"/>
        <path class="dark" d="M30 30H70V70H30Z"/>
        <path class="dark line" stroke-width="3" d="M10 50H90"/>
        <path d="M50 10V90" class="line"/>
      </svg>
    `);
    expect(picture.shapes).toEqual([
      { paint: 'light', d: 'M10 10H90V90H10Z' },
      { paint: 'dark', d: 'M30 30H70V70H30Z' },
      { paint: 'dark', line: true, width: 3, d: 'M10 50H90' },
      { paint: 'light', line: true, d: 'M50 10V90' },
    ]);
  });

  it('refuses a file that is not SVG', () => {
    expect(() => pictureFromSvg('<svg><path></svg>')).toThrowError(/Not a valid SVG picture/);
  });

  it('finds shapes in every standard picture file', () => {
    for (const [name, picture] of Object.entries(STORYTELLER_AID_PICTURES)) {
      expect(picture.shapes.length).withContext(name).toBeGreaterThan(0);
      expect(picture.shapes.every(shape => shape.d.length > 0)).withContext(name).toBeTrue();
    }
  });
});
