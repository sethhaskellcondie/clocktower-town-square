import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AttractModeService } from './attract-mode/attract-mode.service';
import { HOW_TO_PLAY_VIDEO, NO_DEATHS } from './player-aids/player-aid-library';

describe('AppComponent', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'clocktower-town-square' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('clocktower-town-square');
  });

  it('should render the banner and the players table', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.project-banner')?.textContent).toContain('A Seth Condie Project');
    expect(compiled.querySelector('#players_table')).not.toBeNull();
  });

  it('enters small attract mode when the project banner is clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    (compiled.querySelector('.project-banner') as HTMLElement).click();
    fixture.detectChanges();

    expect(TestBed.inject(AttractModeService).mode()).toBe('small');
    expect(compiled.querySelector('.attract-banner')?.classList).toContain('mode-small');
    expect(compiled.querySelector('.project-banner')).toBeNull();
  });

  it('steps the attract mode on A, but not while a player aid is open', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const attract = TestBed.inject(AttractModeService);
    const pressA = () => document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA', key: 'a' }));

    pressA();
    expect(attract.mode()).toBe('small');

    const shelf = fixture.componentInstance.playerAids!.shelf;
    shelf.openAid(HOW_TO_PLAY_VIDEO, shelf.sections[0]);
    pressA();
    expect(attract.mode()).toBe('small');

    shelf.closeAid();
    pressA();
    expect(attract.mode()).toBe('large');
  });

  it('shows the no-deaths aid when the reveal finds no one died in the night', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const shelf = app.playerAids!.shelf;

    app.toggleDayNight();
    app.startReveal();
    expect(shelf.activeAid).toBeNull();
    tick(10000);
    expect(shelf.activeAid).toBe(NO_DEATHS);
    expect(app.playerComponents.first.state).toBe('alive');

    app.toggleDayNight();
    document.body.classList.remove('day');
  }));

  it('marks the night\'s deaths dead instead of showing the no-deaths aid', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.playerComponents.first.state = 'killed during the night';

    app.toggleDayNight();
    app.startReveal();
    tick(10000);
    expect(app.playerAids!.shelf.activeAid).toBeNull();
    expect(app.playerComponents.first.state).toBe('dead with vote');

    app.toggleDayNight();
    document.body.classList.remove('day');
  }));

  it('keeps the no-deaths aid off the player aids shelf', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const shelf = fixture.componentInstance.playerAids!.shelf;
    const listed = shelf.sections.flatMap(s => s.withDescendants()).flatMap(s => s.aids);
    expect(listed).not.toContain(NO_DEATHS);
  });
});
