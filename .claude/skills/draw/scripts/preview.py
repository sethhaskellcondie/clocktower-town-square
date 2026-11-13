#!/usr/bin/env python3
"""Render pictures drawn for this project to PNGs, to look at while drawing.

  preview.py panel FILE.svg [FILE.svg ...]   player aid pictures on the dark
                                             panel, over a strip of character
                                             icons to compare them against
  preview.py card FILE.svg [FILE.svg ...]    storyteller aid pictures on cards,
                                             large on four colors and small on
                                             every color, as the app draws them
  preview.py export FILE.svg OUT.png         one SVG rendered at its own size,
                                             with any <image> it links loaded,
                                             for a panel that ships as a PNG

Options:
  --out PATH       where to write the preview PNG (panel and card); defaults
                   to a temporary folder
  --no-reference   leave the strip of character icons off a panel preview

Prints the path of each PNG it writes. Needs Google Chrome or Chromium; set
CHROME to its path if it isn't found. Standard library only.
"""

import argparse
import html
import os
import re
import shutil
import subprocess
import sys
import tempfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
ICONS = ROOT / 'assets' / 'player_aids' / 'icons'
AID_SOURCE = ROOT / 'src' / 'app' / 'storyteller-aids' / 'storyteller-aid.ts'
SVG_NS = '{http://www.w3.org/2000/svg}'

# One icon for each paint, to hold a drawing up against
REFERENCE_ICONS = [
    ('good', ICONS / 'trouble_brewing' / 'townsfolk' / 'empath.png'),
    ('evil', ICONS / 'trouble_brewing' / 'minions' / 'baron.png'),
    ('fabled', ICONS / 'fabled' / 'djinn.png'),
    ('loric', ICONS / 'loric' / 'gardener.png'),
    ('traveler', ICONS / 'trouble_brewing' / 'travelers' / 'scapegoat.png'),
]

# The card, as storyteller-aid-card.component.scss and .html draw it. Keep
# this in step with them if they change.
CARD_CSS = """
.card {
  --aid-light: color-mix(in oklab, var(--aid-color) 55%, white);
  --aid-glow: color-mix(in oklab, var(--aid-color) 35%, white);
  position: relative; container-type: inline-size; aspect-ratio: 3 / 5;
  overflow: hidden; isolation: isolate; border-radius: 6px; color: #fff;
  background:
    radial-gradient(ellipse 80% 65% at 50% 45%, transparent 45%, rgba(0, 0, 0, 0.35) 100%),
    var(--aid-color);
}
@supports (color: oklch(from red l c h)) {
  .card {
    --aid-light: oklch(from var(--aid-color) calc(l + (1 - l) * 0.42) c h);
    --aid-glow: oklch(from var(--aid-color) calc(l + (1 - l) * 0.6) calc(c * 0.8) h);
  }
}
.picture { position: absolute; top: 8%; left: 9%; width: 82%; overflow: visible; }
.picture path {
  fill: var(--aid-light); stroke: var(--aid-glow); stroke-width: 0.6;
  stroke-linecap: round; stroke-linejoin: round;
}
.picture path.dark { fill: var(--aid-color); stroke: none; }
.picture path.line { fill: none; stroke: var(--aid-light); stroke-width: 1.5; }
.picture path.dark.line { stroke: var(--aid-color); }
.texture {
  position: absolute; inset: 0; pointer-events: none; opacity: 0.16; mix-blend-mode: overlay;
  background: center / 100% 100% no-repeat url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 500' preserveAspectRatio='none'%3E%3Cfilter id='n' x='0' y='0' width='1' height='1'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.03' numOctaves='5' seed='4'/%3E%3CfeColorMatrix values='2 0 0 0 -0.5 2 0 0 0 -0.5 2 0 0 0 -0.5 0 0 0 0 1'/%3E%3C/filter%3E%3Crect width='300' height='500' filter='url(%23n)'/%3E%3C/svg%3E");
}
.frame { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.75; }
.frame path { fill: none; stroke: var(--aid-light); stroke-width: 1.6; }
.frame .fine { stroke-width: 1.1; }
.frame .leaf { fill: var(--aid-light); stroke: none; }
.text {
  position: absolute; left: 5%; right: 5%; bottom: 9%; margin: 0;
  display: flex; flex-direction: column; align-items: center; text-align: center;
  text-transform: uppercase; font: 11.5cqw/1.12 Georgia, 'Times New Roman', serif;
  text-shadow: 0 0.6cqw 1.4cqw rgba(0, 0, 0, 0.6), 0 0 0.4cqw rgba(0, 0, 0, 0.35);
}
.emphasis { color: #d1b56a; font-size: 1.3em; line-height: 1.05; letter-spacing: 0.04em; }
"""

CARD_FRAME = """
<svg class="frame" viewBox="0 0 300 500"><path d="M50 9H250M50 491H250M9 50V450M291 50V450"/>{corners}</svg>
"""
CARD_CORNER = """
<g transform="{t}"><path d="M9 9H50V50H9Z"/>
<path class="fine" d="M45 14C33 13 25 17 26 26C17 25 13 33 14 45M45 14C47 15 47 18 44 18M14 45C15 47 18 47 18 44"/>
<path class="leaf" d="M14 14C22 15 27 20 28 28C20 27 15 22 14 14Z"/><path class="leaf" d="M30 30C37 32 41 36 44 44C36 41 32 37 30 30Z"/>
<circle class="leaf" cx="40" cy="22" r="1.6"/><circle class="leaf" cx="22" cy="40" r="1.6"/></g>
"""
CORNERS = ['', 'matrix(-1 0 0 1 300 0)', 'matrix(1 0 0 -1 0 500)', 'matrix(-1 0 0 -1 300 500)']
LARGE_COLORS = ['slate', 'red', 'green', 'purple']


def find_chrome():
    candidates = [
        os.environ.get('CHROME'),
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
        *(shutil.which(name) for name in ('google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser', 'chrome')),
    ]
    for candidate in candidates:
        if candidate and Path(candidate).exists():
            return candidate
    sys.exit('Could not find Chrome or Chromium; set CHROME to its path.')


def screenshot(url, out, width, height):
    out.parent.mkdir(parents=True, exist_ok=True)
    if out.exists():
        out.unlink()
    subprocess.run(
        [find_chrome(), '--headless=new', '--disable-gpu', '--hide-scrollbars',
         '--force-device-scale-factor=1', '--allow-file-access-from-files',
         f'--window-size={width},{height}', f'--screenshot={out}', url],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=60,
    )
    if not out.exists():
        sys.exit(f'Chrome did not write {out}')
    print(out)


def svg_size(path):
    root = ET.parse(path).getroot()
    width, height = root.get('width'), root.get('height')
    if width and height and not width.endswith('%'):
        return float(re.sub(r'[a-z]+$', '', width)), float(re.sub(r'[a-z]+$', '', height))
    box = [float(n) for n in re.split(r'[\s,]+', root.get('viewBox', '0 0 100 100').strip())]
    return box[2], box[3]


def card_colors():
    # The named colors from STORYTELLER_AID_COLORS, read from the app so the
    # preview always matches it
    match = re.search(r'export const STORYTELLER_AID_COLORS = \{(.*?)\}', AID_SOURCE.read_text(), re.S)
    colors = dict(re.findall(r"(\w+):\s*'(#[0-9a-fA-F]{3,8})'", match.group(1))) if match else {}
    if not colors:
        sys.exit(f'Could not read STORYTELLER_AID_COLORS from {AID_SOURCE}')
    return colors


def picture_paths(path):
    # The shapes a card draws from a picture file, read the way
    # pictureFromSvg in storyteller-aid-pictures.ts reads them
    root = ET.parse(path).getroot()
    shapes = []
    for element in root.iter(f'{SVG_NS}path'):
        classes = (element.get('class') or '').split()
        width = element.get('stroke-width')
        cls = ' '.join(c for c in ('dark', 'line') if c in classes)
        style = f' style="stroke-width:{width}"' if width is not None else ''
        shapes.append(f'<path d="{html.escape(element.get("d", ""))}" class="{cls}"{style}/>')
    return ''.join(shapes)


def card(color, shapes, width):
    frame = CARD_FRAME.format(corners=''.join(CARD_CORNER.format(t=t) for t in CORNERS))
    return (f'<div class="card" style="--aid-color:{color};width:{width}px">'
            f'<svg class="picture" viewBox="0 0 100 100">{shapes}</svg><div class="texture"></div>{frame}'
            f'<p class="text"><span>The card\'s</span><span class="emphasis">words</span></p></div>')


def preview_cards(files, out):
    colors = card_colors()
    large = [colors[name] for name in LARGE_COLORS if name in colors]
    rows, height = [], 20
    for file in files:
        shapes = picture_paths(file)
        rows.append(f'<h2>{html.escape(file.name)}</h2>')
        rows.append('<div class="row">' + ''.join(card(c, shapes, 240) for c in large) + '</div>')
        rows.append('<div class="row">' + ''.join(card(c, shapes, 110) for c in colors.values()) + '</div>')
        height += 30 + 400 + 12 + 184 + 24
    width = max(4 * 252, len(colors) * 122) + 24
    page = out.with_suffix('.html')
    page.write_text(
        f'<html><head><style>{CARD_CSS}'
        'body{margin:0;padding:12px;background:#111;font-family:sans-serif}'
        'h2{color:#ccc;font-size:14px;margin:6px 0}'
        '.row{display:flex;align-items:flex-start;gap:12px;margin-bottom:12px}.card{flex:none}'
        f'</style></head><body>{"".join(rows)}</body></html>')
    screenshot(page.as_uri(), out, width, height)


def preview_panels(files, out, reference):
    blocks, width, height = [], 0, 0
    for file in files:
        w, h = svg_size(file)
        scale = min(1, 1320 / w)
        w, h = round(w * scale), round(h * scale)
        blocks.append(f'<img src="{file.resolve().as_uri()}" width="{w}" height="{h}">')
        width, height = max(width, w), height + h + 10
    if reference:
        icons = ''.join(
            f'<figure><img src="{path.as_uri()}" width="200"><figcaption>{name}</figcaption></figure>'
            for name, path in REFERENCE_ICONS)
        blocks.append(f'<div class="strip">{icons}</div>')
        width, height = max(width, 1000), height + 240
    page = out.with_suffix('.html')
    page.write_text(
        '<html><head><style>body{margin:0;background:#14101e;font-family:sans-serif}'
        'img{display:block;margin-bottom:10px}.strip{display:flex}figure{margin:0}'
        'figcaption{color:#888;text-align:center;font-size:13px;margin-top:-14px}'
        f'</style></head><body>{"".join(blocks)}</body></html>')
    screenshot(page.as_uri(), out, width, height)


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('mode', choices=['panel', 'card', 'export'])
    parser.add_argument('files', nargs='+', type=Path)
    parser.add_argument('--out', type=Path)
    parser.add_argument('--no-reference', action='store_true')
    args = parser.parse_args()

    if args.mode == 'export':
        if len(args.files) != 2:
            sys.exit('export takes one SVG and the PNG to write: preview.py export FILE.svg OUT.png')
        source, out = args.files
        width, height = svg_size(source)
        screenshot(source.resolve().as_uri(), out.resolve(), round(width), round(height))
        return

    for file in args.files:
        if not file.exists():
            sys.exit(f'No such file: {file}')
    out = (args.out or Path(tempfile.gettempdir()) / 'draw-preview' / f'{args.mode}-{args.files[0].stem}.png').resolve()
    out.parent.mkdir(parents=True, exist_ok=True)
    if args.mode == 'card':
        preview_cards(args.files, out)
    else:
        preview_panels(args.files, out, not args.no_reference)


if __name__ == '__main__':
    main()
