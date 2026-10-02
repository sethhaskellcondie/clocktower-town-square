import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AttractModeService } from './attract-mode/attract-mode.service';
import { HOW_TO_PLAY_VIDEO } from './player-aids/player-aid-library';

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
});
