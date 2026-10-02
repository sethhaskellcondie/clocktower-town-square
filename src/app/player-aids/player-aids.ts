// A player aid is an ordered list of content blocks, so text and pictures
// can be interleaved however the aid needs to read.
export type PlayerAidBlock =
  | { type: 'heading'; text: string }
  | { type: 'text'; text: string | PlayerAidTextPart[] }
  | { type: 'image'; src: string; alt: string; caption?: string };

// A paragraph can mix plain text with small inline icons, e.g. a character
// icon right after the character's name, and with bold or struck-through
// runs of text
export type PlayerAidTextPart =
  | string
  | { icon: string; alt: string }
  | { text: string; style: 'bold' | 'strike' };

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
      { type: 'text', text: 'Scan this to watch a video on how to play Blood on the Clocktower. (10 minutes)' },
      {
        type: 'image',
        src: 'assets/player_aids/qr_how_to_play_video.png',
        alt: 'QR code linking to a how-to-play video',
      },
    ],
  },
  {
    id: 'clocktower-wiki',
    title: 'Clocktower Wiki',
    summary: 'QR code for the Blood on the Clocktower Wiki.',
    blocks: [
      { type: 'text', text: 'Scan this code to visit the Blood on the Clocktower Wiki for more information on the game.' },
      {
        type: 'image',
        src: 'assets/player_aids/qr_clocktower_wiki.png',
        alt: 'QR code linking to the Blood on the Clocktower Wiki',
      },
    ],
  },
  {
    id: 'common-terms',
    title: 'Common Terms',
    summary: 'Character, Type, and Alignment explained.',
    blocks: [
      {
        type: 'text',
        text: [
          'Each player will have a ',
          { text: 'Character', style: 'bold' },
          ', a ',
          { text: 'Type', style: 'bold' },
          ', and an ',
          { text: 'Alignment', style: 'bold' },
          ', this tells you how you should play.',
        ],
      },
      {
        type: 'text',
        text: [
          'Your ',
          { text: 'Character', style: 'bold' },
          ' is determined by what token you pull from the bag. Ex: Butler, Spy, Imp, or Chef.',
        ],
      },
      {
        type: 'image',
        src: 'assets/player_aids/character_sheet_tb.jpg',
        alt: 'The Trouble Brewing character sheet, with Townsfolk, Outsiders, Minions, and Demons labeled down the left side',
      },
      {
        type: 'text',
        text: [
          'Each Character has a ',
          { text: 'Type', style: 'bold' },
          ' found on the left side of your character sheet. The Butler is an Outsider, the Spy is a Minion, the Imp is a Demon, and the Chef is a Townsfolk.',
        ],
      },
      {
        type: 'text',
        text: [
          'Each Character also has a starting ',
          { text: 'Alignment', style: 'bold' },
          ', blue is ',
          { text: 'Good', style: 'bold' },
          ' and red is ',
          { text: 'Evil', style: 'bold' },
          '. This dictates who is on your team and how you win the game. (In advanced games alignment can change during the game.)',
        ],
      },
    ],
  },
  {
    id: 'spy-grimoire',
    title: 'The Spy & the Grimoire',
    summary: 'An example Grimoire setup, as the Spy would see it.',
    blocks: [
      {
        type: 'text',
        text: [
          'The Spy',
          { icon: 'assets/player_aids/icon_spy.png', alt: 'Spy icon' },
          ' can see inside the Grimoire, this is an example setup of the Grimoire.',
        ],
      },
      {
        type: 'image',
        src: 'assets/player_aids/spy_grimoire.jpg',
        alt: 'An open Grimoire with character tokens, reminder tokens, and the first night sheet laid out',
      },
    ],
  },
  {
    id: 'butler-voting',
    title: 'The Butler',
    summary: 'When the Butler may raise their hand to vote.',
    blocks: [
      {
        type: 'image',
        src: 'assets/player_aids/icon_butler.png',
        alt: 'Butler icon: a hand holding a covered serving tray',
      },
      {
        type: 'text',
        text: "During a nomination, the Butler may only have their hand raised to vote if the Master has their hand raised to vote or if the Master's vote has already been counted. The Butler must keep track of their Master. If they vote illegally their vote will be counted like normal, but don't do that, it's not cool.",
      },
    ],
  },
  {
    id: 'mayor-ability',
    title: 'The Mayor',
    summary: 'A correction to the Mayor ability text on the sheet.',
    blocks: [
      {
        type: 'image',
        src: 'assets/player_aids/icon_mayor.png',
        alt: 'Mayor icon: a blue columned town hall',
      },
      {
        type: 'text',
        text: [
          'The Mayor\'s text on the sheet says that "',
          { text: 'a townsfolk', style: 'strike' },
          ' may die instead" it should say "If only 3 players live & no execution occurs, your team wins. If you die at night, ',
          { text: 'another player', style: 'bold' },
          ' might die instead."',
        ],
      },
    ],
  },
  {
    id: 'chef-pairs',
    title: 'The Chef',
    summary: 'How evil pairs are counted, with an example.',
    blocks: [
      {
        type: 'text',
        text: [
          'The Chef',
          { icon: 'assets/player_aids/icon_chef.png', alt: 'Chef icon' },
          ' learns how many EVIL PAIRS there are on the first night. In a 13 player game there are 13 pairs, each player is included in one pair with each of their neighbors. In this example (disregard the colors) there is 1 evil pair, 2 good pairs, and 2 dead pairs.',
        ],
      },
      {
        type: 'image',
        src: 'assets/player_aids/pairs_example.png',
        alt: 'A 13 player town square with evil, good, and dead tokens seated around the circle',
      },
    ],
  },
];
