import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../app.routes';
import { HomeComponent } from './home.component';
import { TownSquareComponent } from '../town-square/town-square.component';
import { StorytellerAidsPageComponent } from '../storyteller-aids/storyteller-aids-page.component';

describe('HomeComponent', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/', HomeComponent);
  });

  afterEach(() => {
    localStorage.clear();
  });

  function link(label: string): HTMLAnchorElement {
    const links = Array.from(harness.routeNativeElement!.querySelectorAll<HTMLAnchorElement>('a.page-btn'));
    const found = links.find(a => a.textContent?.trim() === label);
    if (!found) throw new Error(`No link labeled "${label}"`);
    return found;
  }

  it('shows the title', () => {
    expect(harness.routeNativeElement!.querySelector('h1')?.textContent?.trim()).toBe('Blood on the Clocktower Digital Aids');
  });

  it('opens the town square', async () => {
    link('Town Square (Desktop)').click();
    await harness.fixture.whenStable();
    expect(harness.routeDebugElement!.componentInstance).toBeInstanceOf(TownSquareComponent);
  });

  it('opens the night communication aids', async () => {
    link('Night Communication Aids (Mobile)').click();
    await harness.fixture.whenStable();
    expect(harness.routeDebugElement!.componentInstance).toBeInstanceOf(StorytellerAidsPageComponent);
  });
});
