import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StorytellerAid } from './storyteller-aid';

// One storyteller aid drawn as a card: its color behind everything, its
// words across the top, its picture below them and any more words below
// that, inside a thin frame with an ornament in each corner. The card is 3
// wide by 5 tall and fills the width it's given, scaling everything on it
// to match.
//
// The card is held up for a player to read across the room, so the words
// come first: they're set as large as they'll go while the widest line
// still fits across the card, and the picture takes the room that's left.
// An aid with no picture has its words down the middle of the card instead,
// as large as they'll go while they still fit it, across and down.
@Component({
  selector: 'app-storyteller-aid-card',
  imports: [NgTemplateOutlet],
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
// its picture. A very long line stops shrinking at 9 and wraps instead,
// between its words. A single word can't wrap, so a long one, like a secret
// word the storyteller has written in, shrinks the words further to fit.
const TEXT_WIDTH = 86;
const LARGEST_TEXT = 18;
const SMALLEST_TEXT = 9;

// With no picture, the words may run 125 down the card, which leaves them
// clear of the corner ornaments, and be as large as 24, which is as large
// as a short word needs to be to fill the card's middle
const TEXT_HEIGHT = 125;
const LARGEST_TEXT_ALONE = 24;
const SMALLEST_TEXT_ALONE = 3;

// How much larger emphasized words are set, and how far their letters are
// spaced, and the gap between the plain and emphasized words of a line, in
// ems, as .emphasis and .line have them in the stylesheet. Then the height
// of a row of words, plain and emphasized, from their line heights there.
const EMPHASIS_SIZE = 1.3;
const EMPHASIS_SPACING = 0.04;
const WORD_GAP = 0.25;
const ROW_HEIGHT = 1.1;
const EMPHASIS_ROW_HEIGHT = EMPHASIS_SIZE * 1.05;

// Some of a line's words, emphasized or not
type Words = { readonly text: string; readonly emphasis: boolean };

// How wide some words are, in ems of the card's text size
type WidthOf = (words: Words) => number;

const textSizes = new WeakMap<StorytellerAid, number>();

// Measures the aid's lines in the page's font, in capitals as the card
// shows them, to size them to the card, with a picture or without. The
// lines above and below the picture share the one size. The size depends
// only on the words, so it's worked out once for each aid.
function textSizeFor(aid: StorytellerAid): number {
  let size = textSizes.get(aid);
  if (size === undefined) {
    const context = document.createElement('canvas').getContext('2d');
    if (!context) return SMALLEST_TEXT;
    context.font = `100px ${getComputedStyle(document.body).fontFamily}`;
    const widthOf: WidthOf = words => {
      const text = words.text.toUpperCase();
      const width = context.measureText(text).width / 100;
      return words.emphasis ? (width + EMPHASIS_SPACING * text.length) * EMPHASIS_SIZE : width;
    };
    const lines = [...aid.lines, ...aid.linesBelow];
    size = aid.textOnly ? sizeAlone(lines, widthOf) : sizeAbovePicture(lines, widthOf);
    textSizes.set(aid, size);
  }
  return size;
}

// The widest line set across the card, or if that leaves a single word too
// wide for it, the widest word
function sizeAbovePicture(lines: readonly (readonly Words[])[], widthOf: WidthOf): number {
  const widest = Math.max(...lines.map(line => line.reduce((width, words) => width + widthOf(words), WORD_GAP * (line.length - 1))));
  const widestWord = Math.max(...lines.flat().flatMap(words => wordsIn(words).map(widthOf)));
  return Math.min(LARGEST_TEXT, Math.max(SMALLEST_TEXT, TEXT_WIDTH / widest), TEXT_WIDTH / widestWord);
}

// The largest size the words still fit the card at, wrapping wherever they
// have to, found by halving the range of sizes it could be until it's
// pinned down: a larger size wraps the words onto more lines, each of them
// taller, so if a size doesn't fit, nothing larger will
function sizeAlone(lines: readonly (readonly Words[])[], widthOf: WidthOf): number {
  const fits = (size: number) => heightOf(lines, TEXT_WIDTH / size, widthOf) * size <= TEXT_HEIGHT;
  if (fits(LARGEST_TEXT_ALONE)) return LARGEST_TEXT_ALONE;
  let [small, large] = [SMALLEST_TEXT_ALONE, LARGEST_TEXT_ALONE];
  for (let step = 0; step < 16; step++) {
    const size = (small + large) / 2;
    if (fits(size)) small = size;
    else large = size;
  }
  return small;
}

// How tall the lines are, in ems, wrapped to rows this many ems across, as
// the stylesheet wraps them: each line's words side by side while they fit,
// and moving down a row when they don't. Words too wide for a row of their
// own take rows of their own, wrapping between each word. It's endless if a
// single word is too wide for a row, since that can't wrap at all.
function heightOf(lines: readonly (readonly Words[])[], rowWidth: number, widthOf: WidthOf): number {
  let height = 0;
  for (const line of lines) {
    let row = { width: 0, height: 0 };
    const nextRow = () => {
      height += row.height;
      row = { width: 0, height: 0 };
    };
    for (const words of line) {
      const rowHeight = words.emphasis ? EMPHASIS_ROW_HEIGHT : ROW_HEIGHT;
      const width = widthOf(words);
      if (width <= rowWidth) {
        if (row.width && row.width + WORD_GAP + width > rowWidth) nextRow();
        row.width += (row.width ? WORD_GAP : 0) + width;
        row.height = Math.max(row.height, rowHeight);
        continue;
      }
      nextRow();
      const space = widthOf({ text: ' ', emphasis: words.emphasis });
      let rows = 1;
      let across = 0;
      for (const wordWidth of wordsIn(words).map(widthOf)) {
        if (wordWidth > rowWidth) return Infinity;
        if (across && across + space + wordWidth > rowWidth) {
          rows++;
          across = wordWidth;
        } else {
          across += (across ? space : 0) + wordWidth;
        }
      }
      height += rows * rowHeight;
    }
    nextRow();
  }
  return height;
}

// Each word of some words on its own, emphasized as they are
function wordsIn(words: Words): Words[] {
  return words.text.split(' ').map(text => ({ text, emphasis: words.emphasis }));
}
