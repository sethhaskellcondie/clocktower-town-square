import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StorytellerAid } from './storyteller-aid';

// One storyteller aid drawn as a card: its color behind everything, its
// picture across the top, its text along the bottom, inside a thin frame
// with an ornament in each corner. The card is 3 wide by 5 tall and fills
// the width it's given, scaling everything on it to match.
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
}
