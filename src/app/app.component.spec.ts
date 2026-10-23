import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AttractModeService } from './attract-mode/attract-mode.service';
import { DayTimerService } from './day-timer/day-timer.service';
import { NextSessionService } from './next-session/next-session.service';
import { HOW_TO_PLAY_VIDEO, NO_DEATHS } from './player-aids/player-aid-library';
import { BAD_MOON_RISING } from './scripts/script-library';
import { travelerRows } from './character-icon/character-options';
import { WASHERWOMAN } from './character-sheets/character-library';

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

  it('should render the banner and the players table', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.project-banner')?.textContent).toContain('Attract Mode');
    expect(compiled.querySelector('.project-footer')?.textContent).toContain('A Seth Condie Project');
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

  it('shows the next session footer when the project footer is clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    (compiled.querySelector('.project-footer') as HTMLElement).click();
    fixture.detectChanges();

    expect(TestBed.inject(NextSessionService).mode()).toBe('small');
    expect(compiled.querySelector('.next-session-shelf')?.classList).toContain('mode-small');
    expect(compiled.querySelector('.project-footer')).toBeNull();
  });

  it("offers travelers from the script picked on the character sheet", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    app.addTraveler();
    fixture.detectChanges();
    const traveler = app.travelerComponents.first;

    (compiled.querySelector('#character_sheet_script_toggle') as HTMLElement).click();
    fixture.detectChanges();
    (compiled.querySelector('#character_sheet_script_' + BAD_MOON_RISING.id) as HTMLElement).click();
    fixture.detectChanges();
    expect(traveler.characterRows).toEqual(travelerRows(BAD_MOON_RISING));
  });

  it("opens a character's aid from the character sheet, then returns to the sheet once it closes", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const shelf = fixture.componentInstance.playerAids!.shelf;
    const sheetOpen = () => compiled.querySelector('.sheet-shelf')!.classList.contains('open');
    const click = (selector: string) => {
      (compiled.querySelector(selector) as HTMLElement).click();
      fixture.detectChanges();
    };

    click('#character_sheet_toggle');
    click(`#character_sheet_icon_${WASHERWOMAN.id}`);
    expect(sheetOpen()).toBeFalse();
    expect(shelf.activeAid?.character).toBe(WASHERWOMAN);
    expect(compiled.querySelector('.aid-modal h2')?.textContent).toContain('Washerwoman');

    // The close click lands outside the sheet, which mustn't shut it again
    click('#player_aid_close');
    expect(shelf.activeAid).toBeNull();
    expect(sheetOpen()).toBeTrue();

    // Likewise for the Escape that closes the aid
    click(`#character_sheet_icon_${WASHERWOMAN.id}`);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(shelf.activeAid).toBeNull();
    expect(sheetOpen()).toBeTrue();
  });

  it("leaves the character sheet shut when an aid opened elsewhere closes", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const shelf = fixture.componentInstance.playerAids!.shelf;

    shelf.openAid(HOW_TO_PLAY_VIDEO, shelf.sections[0]);
    fixture.detectChanges();
    (compiled.querySelector('#player_aid_close') as HTMLElement).click();
    fixture.detectChanges();
    expect(compiled.querySelector('.sheet-shelf')!.classList).not.toContain('open');
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

  it('only takes day timer hotkeys during the day, and clears the timer at night', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const timer = TestBed.inject(DayTimerService);
    const compiled = fixture.nativeElement as HTMLElement;
    const pressPlus = () => document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Equal', key: '=' }));

    pressPlus();
    expect(timer.endsAt()).toBe(0);
    expect(compiled.querySelector('app-day-timer')).toBeNull();

    app.toggleDayNight();
    fixture.detectChanges();
    expect(compiled.querySelector('app-day-timer')).not.toBeNull();
    pressPlus();
    expect(timer.clockText()).toBe('0:30');

    app.toggleDayNight();
    fixture.detectChanges();
    expect(timer.endsAt()).toBe(0);
    expect(compiled.querySelector('app-day-timer')).toBeNull();
    document.body.classList.remove('day');
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
