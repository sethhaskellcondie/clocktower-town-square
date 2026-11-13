import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { TownSquareComponent } from './town-square/town-square.component';
import { StorytellerAidsPageComponent } from './storyteller-aids/storyteller-aids-page.component';

describe('routes', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
  });

  it('opens the home page at the root', async () => {
    const harness = await RouterTestingHarness.create();
    expect(await harness.navigateByUrl('/')).toBeInstanceOf(HomeComponent);
  });

  it('opens the town square on its own page', async () => {
    const harness = await RouterTestingHarness.create();
    expect(await harness.navigateByUrl('/town-square')).toBeInstanceOf(TownSquareComponent);
  });

  it('opens the storyteller aids on their own page', async () => {
    const harness = await RouterTestingHarness.create();
    expect(await harness.navigateByUrl('/storyteller')).toBeInstanceOf(StorytellerAidsPageComponent);
  });

  it('sends any other address to the home page', async () => {
    const harness = await RouterTestingHarness.create();
    expect(await harness.navigateByUrl('/nowhere')).toBeInstanceOf(HomeComponent);
  });
});
