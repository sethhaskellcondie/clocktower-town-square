import { Routes } from '@angular/router';
import { TownSquareComponent } from './town-square/town-square.component';
import { StorytellerAidsPageComponent } from './storyteller-aids/storyteller-aids-page.component';

// The town square is the host page, shown on the big screen. The storyteller
// aids are a page of their own, opened on the storyteller's phone.
export const routes: Routes = [
  { path: '', component: TownSquareComponent, title: 'Clocktower Town Square' },
  { path: 'storyteller', component: StorytellerAidsPageComponent, title: 'Storyteller Aids' },
  { path: '**', redirectTo: '' },
];
