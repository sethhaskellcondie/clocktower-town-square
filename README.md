# Clocktower Town Square

A town square for running in-person games of Blood on the Clocktower. Players, travelers, and landmarks sit on the board as tokens you can drag, name, and mark as they die. Alongside them are a day and night cycle with a day timer, the character sheets for each script, and a shelf of player aids covering the rules and every character.

Built with [Angular](https://angular.dev) 22.

## From Scratch Setup
- I like running a package manager for dependencies, for Mac I prefer homebrew. See https://brew.sh/
- Next install node `brew install node` validate successful install with `node -v` or `npm -v`. Angular 22 needs Node 22.22.3+, 24.15.0+, or 26+.
- Next install the angular cli `npm install -g @angular/cli@latest` validation successful install with `ng version`
- Then install the dependencies with `npm install` in the project directory
- Then you can run the command `ng serve` to start this project
- The project will be running on http://localhost:4200

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Running tests

To run the unit tests once in headless Chrome, run:

```bash
ng test --watch=false --browsers=ChromeHeadless
```

Leave off the flags to keep the tests running in a Chrome window, rerunning as files change.

## Building

To build the project run:

```bash
ng build
```

The build is written to `dist/clocktower-town-square`.
