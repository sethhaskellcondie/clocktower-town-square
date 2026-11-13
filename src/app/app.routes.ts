import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TownSquareComponent } from './town-square/town-square.component';
import { StorytellerAidsPageComponent } from './storyteller-aids/storyteller-aids-page.component';

// The home page leads to the others. The town square is the host page, shown
// on the big screen. The storyteller aids are a page of their own, opened on
// the storyteller's phone.
export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Blood on the Clocktower Digital Aids' },
  { path: 'town-square', component: TownSquareComponent, title: 'Clocktower Town Square' },
  { path: 'storyteller', component: StorytellerAidsPageComponent, title: 'Storyteller Aids' },
  { path: '**', redirectTo: '' },
];
