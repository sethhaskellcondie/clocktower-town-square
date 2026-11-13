import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// The shell every page renders inside: the home page, the town square on the
// host screen, or the storyteller aids on a phone. See app.routes.ts.
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class AppComponent {}
