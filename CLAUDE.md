# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Angular 19 application for managing a Blood on the Clocktower town square. It provides a visual interface for tracking players, their states (alive, dead with vote, dead without vote), and landmarks. The application is designed to help storytellers manage game sessions by providing drag-and-drop player tokens and game information displays.

## Core Concepts

**Player State Management**: Players have four states that cycle when clicked:
- `alive`: Default state for living players (white background)
- `marked for death`: Players about to die (red background)
- `dead with vote`: Dead players who still have their ghost vote (black background with white border)
- `dead without vote`: Dead players who have used their ghost vote (black background)

The state is cycled via click (left-click without drag), while right-click toggles name editing mode. Players who are `alive` or `marked for death` both count toward the alive player count in `app.component.ts:33`.

**Player Spread System**: The app automatically calculates the correct distribution of roles (Townsfolk, Outsiders, Minions, Demons) based on player count using the lookup table in `app.component.ts:42-54`. This follows official Blood on the Clocktower rules for player counts 5-15.

**Drag-and-Drop Architecture**: Both `PlayerComponent` and `LandmarkComponent` implement custom drag functionality using:
- `onMouseDown`: Initiates drag, tracks offset from mouse to component position
- `@HostListener('document:mousemove')`: Updates position during drag
- `@HostListener('document:mouseup')`: Ends drag; if no movement occurred, it's treated as a click
- The `hasDragged` flag distinguishes between clicks and drags

**Component Spawning**: When adding players/landmarks, new components spawn at the last component's current position (not initial position) plus an offset. This is achieved by reading `positionX` and `positionY` from the component instances via `@ViewChildren`.

## Commands

### Development
```bash
npm start          # Start dev server on http://localhost:4200
ng serve          # Alternative form of npm start
```

### Building
```bash
npm run build     # Production build to dist/
npm run watch     # Development build with watch mode
```

### Testing
```bash
npm test          # Run Karma unit tests with Jasmine
ng test           # Alternative form of npm test
```

### Code Generation
```bash
ng generate component <name>  # Generate new component
ng generate --help             # See all available schematics
```

## Architecture

### Component Structure

- **AppComponent** (`src/app/app.component.ts`): Root component managing the overall application state
  - Maintains arrays of `PlayerData` and `LandmarkData` with initial positions
  - Uses `@ViewChildren` to query child component instances for reading current positions and states
  - Computes live counts: `alive`, `ghostVotes`, and role distribution based on player count
  - Manages UI settings: table size, player size, settings panel visibility

- **PlayerComponent** (`src/app/player/player.component.ts`): Draggable player token
  - Implements three-state cycle: alive → dead with vote → dead without vote → alive
  - Left-click (without drag): Cycle state
  - Right-click: Toggle name editing
  - Drag: Move token position
  - Emits `stateChange` events to trigger parent recalculation

- **LandmarkComponent** (`src/app/landmark/landmark.component.ts`): Draggable landmark token
  - Similar drag implementation to PlayerComponent but without state cycling
  - Used for marking important locations or game elements on the town square

### Data Flow

1. Parent (AppComponent) holds the source of truth for player/landmark lists
2. Child components receive `initialX`, `initialY`, `number`, and `size` as `@Input()`
3. Child components manage their own position state and emit events when state changes
4. Parent uses `@ViewChildren` queries to read child component properties for computed values
5. Parent recalculates counts reactively via getters that access child component states

### Styling

- Component styles use SCSS with class bindings for size variants (small, medium, large)
- Player states are styled with CSS classes: `.alive`, `.dead-with-vote`, `.dead-without-vote`
- Table sizes are controlled via `[ngClass]="'size-' + tableSize"` in the template

## Development Notes

- The project uses Angular standalone components (no NgModule)
- Uses modern Angular template syntax: `@if`, `@else`, `@for` control flow
- Component prefix: `app` (configured in angular.json:15)
- Style language: SCSS (configured in angular.json:10)
- Test framework: Jasmine with Karma