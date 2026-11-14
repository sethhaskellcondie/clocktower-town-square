import { StorytellerAidPicture, StorytellerAidShape } from './storyteller-aid';
import goodMask from '../../../assets/storyteller_aids/good_mask.svg';
import evilMask from '../../../assets/storyteller_aids/evil_mask.svg';
import bluffingMask from '../../../assets/storyteller_aids/bluffing_mask.svg';
import raven from '../../../assets/storyteller_aids/raven.svg';
import xMark from '../../../assets/storyteller_aids/x_mark.svg';
import spiral from '../../../assets/storyteller_aids/spiral.svg';
import handprint from '../../../assets/storyteller_aids/handprint.svg';
import chatteringMouth from '../../../assets/storyteller_aids/chattering_mouth.svg';
import circles from '../../../assets/storyteller_aids/circles.svg';
import threeCircles from '../../../assets/storyteller_aids/three_circles.svg';
import raisedHand from '../../../assets/storyteller_aids/raised_hand.svg';
import staringEye from '../../../assets/storyteller_aids/staring_eye.svg';
import staringEyes from '../../../assets/storyteller_aids/staring_eyes.svg';

// The standard pictures, one SVG file each in assets/storyteller_aids. The
// files are bundled into the app as text, so a card never waits on one.
//
// A picture file is drawn on the 100 x 100 canvas described in
// storyteller-aid.ts, as a list of paths painted in order:
//
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
//     <path class="light" d="..."/>                        filled in light
//     <path class="dark" d="..."/>                         filled in dark
//     <path class="light line" d="..."/>                   traced as a line
//     <path class="dark line" stroke-width="1.2" d="..."/> a line, thinner
//   </svg>
//
// Only the paths and those three attributes count; anything else in the
// file is left out. A path is light unless it's classed dark, and a line is
// 1.5 thick unless it says otherwise. Light shapes usually come first and
// the dark details carved into them after, so the details sit on top. Each
// file also carries a <style> so it looks as it would on a card when opened
// on its own.
//
// To add a picture, put its file in assets/storyteller_aids, import it below
// and give it a name in STORYTELLER_AID_PICTURES.

export const STORYTELLER_AID_PICTURES = {
  goodMask: pictureFromSvg(goodMask),
  evilMask: pictureFromSvg(evilMask),
  bluffingMask: pictureFromSvg(bluffingMask),
  raven: pictureFromSvg(raven),
  xMark: pictureFromSvg(xMark),
  spiral: pictureFromSvg(spiral),
  handprint: pictureFromSvg(handprint),
  chatteringMouth: pictureFromSvg(chatteringMouth),
  circles: pictureFromSvg(circles),
  threeCircles: pictureFromSvg(threeCircles),
  raisedHand: pictureFromSvg(raisedHand),
  staringEye: pictureFromSvg(staringEye),
  staringEyes: pictureFromSvg(staringEyes),
} as const satisfies Record<string, StorytellerAidPicture>;

// Reads a picture file's paths into the shapes a card draws
export function pictureFromSvg(svg: string): StorytellerAidPicture {
  const file = new DOMParser().parseFromString(svg, 'image/svg+xml');
  if (file.querySelector('parsererror')) {
    throw new Error(`Not a valid SVG picture: ${svg.slice(0, 80)}`);
  }
  const shapes = Array.from(file.querySelectorAll('path'), (path): StorytellerAidShape => {
    const width = path.getAttribute('stroke-width');
    return {
      d: path.getAttribute('d') ?? '',
      paint: path.classList.contains('dark') ? 'dark' : 'light',
      ...(path.classList.contains('line') && { line: true }),
      ...(width !== null && { width: Number(width) }),
    };
  });
  return { shapes };
}
