import { Component } from '@angular/core';
import { DayTimerService } from './day-timer.service';

// The day's countdown, shown above the info tables. Blank until it's given
// time, and blank again once "Time's up" has finished.
@Component({
  selector: 'app-day-timer',
  standalone: true,
  templateUrl: './day-timer.component.html',
  styleUrl: './day-timer.component.scss'
})
export class DayTimerComponent {
  constructor(readonly timer: DayTimerService) {}
}
