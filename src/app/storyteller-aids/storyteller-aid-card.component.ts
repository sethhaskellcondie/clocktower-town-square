import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StorytellerAid } from './storyteller-aid';

// One storyteller aid drawn as a card: its color behind everything, its
// words across the top, its picture below them, inside a thin frame with an
// ornament in each corner. The card is 3 wide by 5 tall and fills the width
// it's given, scaling everything on it to match.
//
// The card is held up for a player to read across the room, so the words
// come first: they're set as large as they'll go while the widest line
// still fits across the card, and the picture takes the room that's left.
@Component({
  selector: 'app-storyteller-aid-card',
  templateUrl: './storyteller-aid-card.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './storyteller-aid-card.component.scss'
})
export class StorytellerAidCardComponent {
  @Input({ required: true }) aid!: StorytellerAid;

  // The frame is drawn on a 300 x 500 canvas. The top-left corner ornament
  // is drawn once and mirrored into the other three corners.
  readonly corners = ['', 'matrix(-1 0 0 1 300 0)', 'matrix(1 0 0 -1 0 500)', 'matrix(-1 0 0 -1 300 500)'];

  // The size of the card's words, in cqw
  get textSize(): number {
    return textSizeFor(this.aid);
  }
}

// Sizes are in cqw, hundredths of the card's width. The words may run 86
// across, which keeps them inside the frame with a little to spare, but no
// larger than 18, so a short aid like "You are good" still leaves room for
// its picture. A very long line stops shrinking at 9 and wraps instead.
const TEXT_WIDTH = 86;
const LARGEST_TEXT = 18;
const SMALLEST_TEXT = 9;

// How much larger emphasized words are set, and how far their letters are
// spaced, and the gap between the plain and emphasized words of a line, in
// ems, as .emphasis and .line have them in the stylesheet
const EMPHASIS_SIZE = 1.3;
const EMPHASIS_SPACING = 0.04;
const WORD_GAP = 0.25;

const textSizes = new WeakMap<StorytellerAid, number>();

// Measures the aid's lines in the page's font, in capitals as the card
// shows them, and sets the widest of them across the card. The size depends
// only on the words, so it's worked out once for each aid.
function textSizeFor(aid: StorytellerAid): number {
  let size = textSizes.get(aid);
  if (size === undefined) {
    const context = document.createElement('canvas').getContext('2d');
    if (!context) return SMALLEST_TEXT;
    context.font = `100px ${getComputedStyle(document.body).fontFamily}`;
    const widthOf = (words: { text: string; emphasis: boolean }): number => {
      const text = words.text.toUpperCase();
      const width = context.measureText(text).width / 100;
      return words.emphasis ? (width + EMPHASIS_SPACING * text.length) * EMPHASIS_SIZE : width;
    };
    const widest = Math.max(
      ...aid.lines.map(line => line.reduce((width, words) => width + widthOf(words), WORD_GAP * (line.length - 1))),
    );
    size = Math.min(LARGEST_TEXT, Math.max(SMALLEST_TEXT, TEXT_WIDTH / widest));
    textSizes.set(aid, size);
  }
  return size;
}
