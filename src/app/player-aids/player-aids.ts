// A player aid is an ordered list of content blocks, so text and pictures
// can be interleaved however the aid needs to read.
export type PlayerAidBlock =
  | { type: 'heading'; text: string }
  | { type: 'text'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string };

export interface PlayerAid {
  id: string;
  title: string;
  summary?: string; // one-liner shown under the title on the shelf
  blocks: PlayerAidBlock[];
}

export const PLAYER_AIDS: PlayerAid[] = [
  {
    id: 'how-to-play-video',
    title: 'How to Play',
    summary: 'QR code for a how-to-play video.',
    blocks: [
      { type: 'text', text: 'Scan this to watch a video on how to play Blood on the Clocktower.' },
      {
        type: 'image',
        src: 'assets/player_aids/qr_how_to_play_video.png',
        alt: 'QR code linking to a how-to-play video',
      },
    ],
  },
  // Reference layout showing every block type; not meant for players
  {
    id: 'hello-world',
    title: 'Hello World',
    summary: 'A test aid to check the shelf and modal.',
    blocks: [
      { type: 'text', text: 'Hello World! This is a test player aid.' },
      {
        type: 'image',
        src: 'assets/player_aids/hello_world.svg',
        alt: 'A clock tower under a crescent moon',
        caption: 'Pictures can sit anywhere between paragraphs.',
      },
      { type: 'heading', text: 'Another section' },
      { type: 'text', text: 'Headings and paragraphs can follow, so longer aids can explain rules edge cases step by step.' },
    ],
  },
];
