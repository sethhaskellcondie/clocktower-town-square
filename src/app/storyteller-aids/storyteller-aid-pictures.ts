import { StorytellerAidPicture } from './storyteller-aid';

// The standard pictures, each drawn on the 100 x 100 canvas described in
// storyteller-aid.ts. Light shapes come first and the dark details carved
// into them after, so the details sit on top.

// A smiling comedy mask with its eyes closed, for the good team
const GOOD_MASK: StorytellerAidPicture = {
  shapes: [
    // The face
    { paint: 'light', d: 'M14 14C30 8 40 16 50 14C60 16 70 8 86 14C92 34 88 56 74 76C66 88 58 94 50 94C42 94 34 88 26 76C12 56 8 34 14 14Z' },
    // Closed, smiling eyes
    { paint: 'dark', d: 'M21 40C25 31 39 31 44 39C38 35.5 27 35.5 21 40Z' },
    { paint: 'dark', d: 'M79 40C75 31 61 31 56 39C62 35.5 73 35.5 79 40Z' },
    // Raised brows
    { paint: 'dark', line: true, width: 1.2, d: 'M20 27Q32 21 43 27' },
    { paint: 'dark', line: true, width: 1.2, d: 'M80 27Q68 21 57 27' },
    // The nose and the smile lines either side of it
    { paint: 'dark', line: true, d: 'M46 54Q50 58 54 54' },
    { paint: 'dark', line: true, d: 'M31 49Q24 55 25 61' },
    { paint: 'dark', line: true, d: 'M69 49Q76 55 75 61' },
    // A wide grin, with the top teeth showing
    { paint: 'dark', d: 'M24 60C36 66 64 66 76 60C72 78 62 86 50 86C38 86 28 78 24 60Z' },
    { paint: 'light', d: 'M29 63.5C40 68 60 68 71 63.5C69 67 63 70.5 50 71C37 70.5 31 67 29 63.5Z' },
  ],
};

// A horned mask with a sly, fanged grin, for the evil team
const EVIL_MASK: StorytellerAidPicture = {
  shapes: [
    // The horns, curling up from the brow
    { paint: 'light', d: 'M22 23C10 22 3 13 7 4C8 1 12 0 14 2C11 8 15 15 34 19Z' },
    { paint: 'light', d: 'M78 23C90 22 97 13 93 4C92 1 88 0 86 2C89 8 85 15 66 19Z' },
    // The face, tapering to a point, and the ring hanging from its chin
    { paint: 'light', d: 'M16 20C32 16 42 23 50 21C58 23 68 16 84 20C92 40 88 60 70 78C62 85 56 88 50 90C44 88 38 85 30 78C12 60 8 40 16 20Z' },
    { paint: 'light', line: true, width: 1.8, d: 'M46.5 94.5A3.5 3.5 0 1 0 53.5 94.5A3.5 3.5 0 1 0 46.5 94.5Z' },
    // Brows drawn down into a scowl over closed, smug eyes
    { paint: 'dark', line: true, width: 1.4, d: 'M22 31L42 37' },
    { paint: 'dark', line: true, width: 1.4, d: 'M78 31L58 37' },
    { paint: 'dark', d: 'M24 41C28 36 38 37 44 44C38 41 30 40 24 41Z' },
    { paint: 'dark', d: 'M76 41C72 36 62 37 56 44C62 41 70 40 76 41Z' },
    // The nose
    { paint: 'dark', line: true, d: 'M46 52Q50 55 54 52' },
    // A grin from ear to ear, its top teeth showing and two of them fangs
    { paint: 'dark', d: 'M24 56C36 64 64 64 76 56C72 72 62 81 50 81C38 81 28 72 24 56Z' },
    { paint: 'light', d: 'M29 59.5C40 65 60 65 71 59.5C69 63.5 62 67 50 67.5C38 67 31 63.5 29 59.5Z' },
    { paint: 'light', d: 'M35.5 65.5L39 73L42.5 66.8Z' },
    { paint: 'light', d: 'M64.5 65.5L61 73L57.5 66.8Z' },
  ],
};

export const STORYTELLER_AID_PICTURES = {
  goodMask: GOOD_MASK,
  evilMask: EVIL_MASK,
} as const satisfies Record<string, StorytellerAidPicture>;
