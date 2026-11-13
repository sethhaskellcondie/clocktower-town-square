---
name: draw
description: The one art style for every picture in this project (hand-cut silhouettes in mottled, team-colored paint with a cream outline, matching the official character icons) and how to draw in it as SVG. Use whenever drawing, redrawing, or reviewing a picture, icon, or illustration for the app, including storyteller aid pictures in assets/storyteller_aids and player aid pictures in assets/player_aids.
---

# Drawing for Clocktower Town Square

Every picture in the project should look like it came from the same hand as the official character icons in `assets/player_aids/icons/`. Those icons are the style guide. This skill describes what they do and gives the kit for doing it in SVG.

## Look first

Before drawing, open a few icons with Read (they're PNGs, and Read shows them), including any near your subject. These four cover the style between them:

- `assets/player_aids/icons/trouble_brewing/townsfolk/empath.png`: cream cuts and flicked edges
- `assets/player_aids/icons/trouble_brewing/minions/baron.png`: bands and glints on a simple form
- `assets/player_aids/icons/fabled/djinn.png`: a complicated object kept readable
- `assets/player_aids/icons/trouble_brewing/townsfolk/ravenkeeper.png`: a creature as pure silhouette against a cream disc

`assets/player_aids/minions.png` and `good_team.png` show how the icons sit on a player aid panel.

## The style

**Subject.** One object or emblem that stands for the idea: a top hat for the Baron, a heart for the Empath, a tankard for the Drunk. There is no scene, background, or horizon, though a small mound or puddle under the figure is fine. People appear only as a part (a hand, a mask, a shadow), never as a whole figure with a drawn face. A few small extras bring a figure to life: bubbles over a tankard, stars round a planet, drips off a blade.

**Silhouette first.** The figure must be recognizable as a solid shape at 40px. If the silhouette alone doesn't say what it is, change the angle or the subject before adding any detail. Show objects at a three-quarter angle or tipped 3 to 12 degrees off straight. Nothing sits dead level or perfectly mirrored.

**Two materials, nothing else.**
- **Paint** is the team's color (see the table below), mottled like sponged, grungy ink: a mid-tone with darker blotches and a fine grain through it. It covers most of the figure.
- **Cream** (`#efe6d6`) does several jobs:
  - a firm outline round the whole figure, about 2% of its height, with a soft cream glow outside it
  - the gaps between one part and the next
  - the highlights
  - whole parts made of a pale material, like the chef's hat, the spy's mask, or the moon behind the raven

Never use black, dark outlines, gradients, drop shadows, or a third color. Shading comes from the paint's own darker blotches, not from drawn lines.

**The cut.** Detail is carved, as in a woodcut or linocut. The marks are cream and *tapered*: crescents, spindles, commas, and flicks that are thick in the middle or at one end and run out to a point. They follow the form: down the side of a cylinder, round a rim, along a fold. Strokes of even width look like a diagram, so avoid them. Bands (hat bands, cuffs, rims) are broad cream shapes with a sliver of paint creasing them.

**Hand-cut edges.** Edges are a little uneven, corners are not quite round, and strokes end in a point or a small flick. Repeated things vary: fingers have different lengths, drips fall to different depths, feathers sit at different angles. Pick one direction for the light and keep the glints on that side.

**Sparse.** An icon has a handful of cuts, not dozens. If the figure looks busy at icon size, take cuts away until it doesn't.

### Paints

| Paint | For | Dark, mid, light |
|---|---|---|
| good | Townsfolk, Outsiders, the good team | `#00459c` `#037ab8` `#00b5d9` |
| evil | Minions, Demons, the evil team | `#450508` `#870d12` `#b82126` |
| fabled | Fabled, and the gold of the game itself (nominations, votes) | `#7a2900` `#b06300` `#dbb021` |
| loric | Loric | `#2e3d29` `#668040` `#a8bf4a` |
| neutral | Rules, ghosts, the town: anything on no team | `#3b3354` `#6e638f` `#a69cbd` |

Travelers are split down the middle, good paint on one side and evil on the other (see the Scapegoat). These are the colors the kit's paint filters produce. Each filter's `tableValues` are the same five stops from dark to light, in sRGB from 0 to 1.

### Panel colors

- Page `#261f45`, panel `#14101e`
- Accent for the border and title: good `#3f8fd6`, evil `#c84650`, gold `#d1b56a`, neutral `#a59cbd`
- Caption text in cream `#ebe4d2`. Every font is Georgia, the app's font.

## Drawing for each place

### Player aid pictures: `assets/player_aids`

Start from `templates/panel.svg` in this skill. It is a working picture at 1320×560: the panel with its border and title, and one figure drawn with the kit. The kit lives in its `<defs>` and is used unchanged in every picture:

- `#outline`: the cream outline and its glow
- `#paint-good`, `#paint-evil`, `#paint-fabled`, `#paint-loric`, `#paint-neutral`: the mottled paint, clipped to whatever it's put on
- `#rough`: nudges everything by a pixel or two, for the hand-cut edge

A figure is two groups: its silhouette (`#figure`, shapes only) and the cream laid over it (`#figure-cream`). Stack them inside one group that carries `#rough` and a slight rotation, in this order:

1. The silhouette with `#outline`
2. The silhouette with a paint
3. The cream on top

Leave a 4 to 8px gap between two parts, and the outline fills it with cream for free.

- **Size.** Draw the figure at the size it's shown, about 180 to 320px tall on a 1320×560 panel. The grain and the outline are measured in the figure's own units, so scaling a `<use>` scales them too. Keep any scaling between 0.75 and 1.5 so the grain matches across pictures.
- **Title.** Georgia italic bold, size 58, in capitals, centered, in the accent color, with its baseline at about y=120.
- **Rows.** Up to four figures across, in equal columns, each about 170px wide.
- **Captions.** Georgia italic, about size 36, in cream, with the baseline at about y=465.
- **Comparisons.** Good vs Evil and Drunk vs Poisoned are two panels side by side, with an italic cream "vs" or "or" between them.
- **Characters.** A panel that shows characters uses their official icons, never redrawings. An SVG shown through an `<img>` can't load other images, so such a panel ships as a PNG. Draw it as an SVG that links the icons with `<image href="...">` (relative links resolve from the SVG's own folder), then render it with `preview.py export`.
- **Older pictures.** A hand-built SVG whose paint filter lacks `color-interpolation-filters="sRGB"` predates this kit, and its paint comes out pale and pastel. Don't copy its values; use the kit.

### Storyteller aid pictures: `assets/storyteller_aids`

The card draws these pictures itself, so they follow the card's format (see `src/app/storyteller-aids/storyteller-aid-pictures.ts`). A picture is a 100×100 canvas of `<path>`s painted in order. Each path is one of these:

- `light`: a pale tint of the card's color, with a paler rim
- `dark`: the card's own color
- a `line`, traced rather than filled

A path's `stroke-width` sets the thickness of its rim or line. There are no filters and no colors, only paths, because every picture has to work on every card color. Start from `templates/card-picture.svg`, a goblet drawn this way.

Each part of the style has a counterpart on the card:

| On an icon | On a card picture |
|---|---|
| The painted silhouette | One solid `light` shape, or a few, for the whole figure |
| The cream outline | The silhouette's rim: give it `stroke-width="2"` (1.5 to 2.5). The default of 0.6 is a hairline. |
| Cream cuts and gaps | `dark` shapes carved into the light: tapered slivers, the gaps between parts, eyes and mouths |
| Glints | Small `light` slivers on top of a dark area. Light on light doesn't show. |
| The mottled paint | The card's own texture provides it, so don't draw it. |
| Rough edges | Drawn into the path itself, since the card has no filters |

- **Solid silhouettes, never outline drawings.** A figure traced in `line`s reads as a diagram and fades into the card. Keep `line` for things that really are thin, like a string, a chain, or steam, and even then prefer a filled, tapered shape.
- **Fill the canvas.** The figure spans 85 to 95 units on its longer side. It sits above the card's words, so keep its weight in the middle.
- **One idea per picture.** An aid can layer several pictures together (its `picture` can be a list), so a picture meant for layering keeps its extras away from the edges.
- **Write the irregularity into the coordinates.** Break long curves into a few segments that change direction slightly, and end cuts in points. When a shape is mirrored, nudge one side by 1 to 3 units and tilt the whole figure.
- **Keep the `<style>` block** exactly as the template has it, so the file looks right when opened on its own.

### Night-order markers: `assets/player_aids/icons/*.svg`

`dawn`, `dusk`, `minion_info`, and `demon_info` are small, flat tokens modeled on the official night sheet. Each is a disc of radius 27 in one flat color, with a 3px cream (`#f1ebdc`) ring and a cream glyph, on a 100×100 canvas. They are interface markers, not pictures, so new ones keep that flat form rather than the painted style.

## Workflow

1. Look at the reference icons and any icon near your subject.
2. Say the subject in one sentence, the way the file's first comment will: "A raven and a question mark, for asking whether to use an ability". Choose the angle and where the light comes from.
3. Block in the silhouette alone and preview it. Fix the shape until it reads at small size. Most of the quality comes from this step.
4. Carve the cuts, separations first and then the few tapered highlights, and preview again.
5. Compare the result with the reference strip (for a panel) or across the card colors (for a card), and fix what doesn't match. Expect three or four rounds.
6. Go through the checklist below.

To preview, run one of these (each needs only Chrome):

```
python3 .claude/skills/draw/scripts/preview.py panel FILE.svg [FILE.svg ...] --out <scratchpad>/panel.png
python3 .claude/skills/draw/scripts/preview.py card FILE.svg [FILE.svg ...] --out <scratchpad>/card.png
python3 .claude/skills/draw/scripts/preview.py export FILE.svg assets/player_aids/NAME.png
```

Then open the PNG it prints with Read. Without `--out`, the preview goes to a temporary folder.

- `panel` sets the picture above a strip of reference icons, one for each paint.
- `card` draws a storyteller aid picture the way the app does: on four large cards, then small on every card color. Pass the existing pictures alongside a new one to compare them.
- `export` renders an SVG at its own size, loading any images it links. Use it for panels that ship as PNGs.

Coordinates come from reasoning about the shape, then rendering, looking, and adjusting:

- Draw a faint 10-unit grid behind a scratch copy so you can read positions straight off the preview.
- To move, scale, tilt, or mirror a whole shape, write a few lines of Python that transform the path's numbers rather than editing them by hand.

## Writing the file

- Open with a comment that says what the picture is and what it's for, for example `<!-- A crooked house wrapped in question marks, for the characters in play -->`.
- Put a short, plain comment over each part saying what it is, for example `<!-- The horns, curling up from the brow -->`. The existing files read this way, so keep that voice.
- Write tidy SVG by hand: at most one decimal place, no editor metadata, no unused defs, and ids that name the thing (`#hand`, `#hand-detail`).
- A new storyteller aid picture also needs an import and a name in `STORYTELLER_AID_PICTURES` in `storyteller-aid-pictures.ts`. After that, run the tests with `ng test --watch=false --browsers=ChromeHeadless`.

## Checklist

- [ ] Reads as a solid silhouette at small size
- [ ] Tipped or turned, with nothing perfectly level or mirrored
- [ ] Only paint and cream (on a card, only light and dark): no black, no gradients, no lines used as outlines
- [ ] Cuts are tapered, few, and follow the form
- [ ] Edges look cut by hand, and repeated parts vary
- [ ] Panel: the kit's filters are used unchanged, and the grain matches the reference strip
- [ ] Card: the silhouette has a rim of 1.5 to 2.5, and the picture works on every card color in the preview
- [ ] The file's comments are in the project's voice
