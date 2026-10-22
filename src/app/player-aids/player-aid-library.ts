import { PlayerAid } from './player-aid';

// Every player aid, each created once. The shelf decides which sections
// they appear in.

export const HOW_TO_PLAY_VIDEO = new PlayerAid({
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
});

export const CLOCKTOWER_WIKI = new PlayerAid({
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
});

export const PLAYER_TRAITS = new PlayerAid({
  id: 'player-traits',
  title: 'Player Traits',
  summary: 'Character, Type, and Alignment explained.',
  blocks: [
    {
      type: 'text',
      text: [
        'You are about to receive a random character token from the character sheet, this will give you a ',
        { text: 'character', style: 'bold' },
        ', ',
        { text: 'type', style: 'bold' },
        ', and ',
        { text: 'alignment', style: 'bold' },
        '.',
      ],
    },
    {
      type: 'image',
      src: 'assets/player_aids/character_sheet_tb.jpg',
      alt: 'The Trouble Brewing character sheet, with Townsfolk, Outsiders, Minions, and Demons labeled down the left side',
    },
    {
      type: 'text',
      text: 'Your character will be the token you draw, like Washerwoman, or Monk, different characters have different abilities, you will need to use these abilities to help your team.',
    },
    {
      type: 'text',
      text: [
        'Teams are assigned by color, blue is ',
        { text: 'good', style: 'bold' },
        ', and red is ',
        { text: 'evil', style: 'bold' },
        '.',
      ],
    },
  ],
});

export const TOWN_SQUARE = new PlayerAid({
  id: 'town-square',
  title: 'Reading the Town Square',
  summary: 'What the tokens and the table in the middle tell you.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/town_square_example.png',
      alt: 'A 12 seat town square: five alive players, five dead players in black, and two Travelers in orange, around a table showing 10 players, 5 alive, 4 ghost votes, 2 Travelers, and 7 Townsfolk, 0 Outsiders, 2 Minions, 1 Demon',
    },
    {
      type: 'text',
      text: [
        'There are 5 players still alive and 5 players that are dead, but 4 of those dead players can still vote (',
        { text: 'Ghost Votes, B, C, F, and H', style: 'bold' },
        '). Player I has used their ghost vote.',
      ],
    },
    {
      type: 'text',
      text: [
        '2 additional players came late, they enter the game as ',
        { text: 'Travelers', style: 'bold' },
        ', but this is still considered a 10 player game.',
      ],
    },
  ],
});

export const CHARACTER_SHEET = new PlayerAid({
  id: 'character-sheet',
  title: 'Your Character Sheet',
  summary: 'Keep it for reference, and point at it to talk silently.',
  blocks: [
    {
      type: 'text',
      text: 'Keep your character sheet with you for reference, you can also communicate with others silently by pointing at it, to make sure you are not overheard by those around you.',
    },
    {
      type: 'image',
      src: 'assets/player_aids/character_sheet_tb.jpg',
      alt: 'The Trouble Brewing character sheet, listing every Townsfolk, Outsider, Minion, and Demon with their abilities',
    },
  ],
});

export const SOCIAL_DEDUCTION = new PlayerAid({
  id: 'social-deduction',
  title: 'Social Deduction',
  summary: 'Games similar this one.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/icons/botc.png',
      alt: 'Blood on the Clocktower icon: a horned demon face door knocker in purple',
    },
    {
      type: 'text',
      text: 'Blood on the Clocktower is a social deduction game, if you have played games like Werewolf, Mafia, Among Us, or Secret Hitler (or watched The Traitors) this game is similar to those.',
    },
  ],
});

export const THE_SETTING = new PlayerAid({
  id: 'the-setting',
  title: 'The Setting',
  summary: 'Ravenswood Bluff, and a murdered storyteller.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/clocktower.svg',
      alt: 'Clocktower icon: a red silhouette of a tall clocktower',
    },
    {
      type: 'text',
      text: 'This is not a role playing game but there is a setting and a theme. This game takes place in the town of Ravenswood Bluff and starts with a scream. All of the citizens rush to the town square to find their storyteller has been murdered! Impaled on the hour hand of the clocktower blood dripping on the cobblestones below. The town correctly determines that this is the work of a Demon who will kill at night and take on a human form by day.',
    },
  ],
});

export const GOOD_VS_EVIL = new PlayerAid({
  id: 'good-vs-evil',
  title: 'Good vs Evil',
  summary: 'How each team wins.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/good_vs_evil.png',
      alt: 'The Good team, the Butler and the Chef in blue, versus the Evil team, the Spy and the Imp in red',
    },
    {
      type: 'text',
      text: [
        'Your alignment (Good/Evil) tells you how to win, the ',
        { text: 'Good', style: 'bold' },
        ' team is trying to find and execute the Demon, before the ',
        { text: 'Evil', style: 'bold' },
        ' team kills everyone.',
      ],
    },
    {
      type: 'text',
      text: 'If at any point there are only two players left alive, then the Evil team wins.',
    },
  ],
});

export const DAY_AND_NIGHT = new PlayerAid({
  id: 'day-and-night',
  title: 'Day and Night',
  summary: 'The two phases of the game.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/day_and_night.svg',
      alt: 'A gold sun for the day beside a violet crescent moon and stars for the night',
    },
    {
      type: 'text',
      text: [
        'The game is split up into two phases, ',
        { text: 'Day', style: 'bold' },
        ' and ',
        { text: 'Night', style: 'bold' },
        '.',
      ],
    },
    {
      type: 'text',
      text: 'During the day the town will discuss their options, share information, nominate, and publicly execute different players.',
    },
    {
      type: 'text',
      text: 'At night everyone will close their eyes. I will wake up different players so they can use their ability or gain information. At night you may still talk but I will be silent and will communicate using hand signals.',
    },
  ],
});

export const HAND_SIGNALS = new PlayerAid({
  id: 'hand-signals',
  title: 'Hand Signals',
  summary: 'How the storyteller communicates at night.',
  blocks: [
    {
      type: 'list',
      items: ['Eyes Open = Two taps', 'Eyes Closed', 'Yes/No', 'Good/Evil', 'Numbers (0, 1, 2, 3)', 'Choose a player', 'Are you sure?'],
    },
  ],
});

export const DRUNK_AND_POISONED = new PlayerAid({
  id: 'drunk-and-poisoned',
  title: 'Drunk and Poisoned',
  summary: 'Why some of your information may be false.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/drunk_and_poisoned.png',
      alt: 'The Drunk, a blue tankard, or the Poisoner, a red vial of poison',
    },
    {
      type: 'text',
      text: 'This is a game about using the information provided to find the Demon, but not all of that information is true, the evil players should be lying about their characters and their information. Some of the misinformation comes from me.',
    },
    {
      type: 'text',
      text: [
        'If your character is ',
        { text: 'drunk', style: 'bold' },
        ' or ',
        { text: 'poisoned', style: 'bold' },
        " then you don't have an ability but I will pretend that you do. Any information that I give to a drunk or poisoned player may be false.",
      ],
    },
  ],
});

export const THE_FOUR_RULES = new PlayerAid({
  id: 'the-four-rules',
  title: 'The Four Rules',
  summary: 'All you really need to remember.',
  blocks: [
    {
      type: 'text',
      text: 'This can be a lot of information to take in at once, so to keep things simple, there are only four things you need to remember:',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        [
          { text: 'You may say whatever you want at any time.', style: 'bold' },
          ' - This is a talking game. You can talk publicly with the group or have private conversations, it is up to you.',
        ],
        [
          { text: 'No peeking.', style: 'bold' },
          " - Please keep your character token a secret, and never look into the Grimoire.",
        ],
        [
          { text: 'Ask me any questions you need to.', style: 'bold' },
          " - If you get confused, or don't understand something ask me. Let me know when you have a question, and we can talk in private so that nobody knows what question you asked.",
        ],
        [
          { text: 'Play nice. (Magic Circle)', style: 'bold' },
          ' - This is a game about deception and trickery, so please treat others with respect and consideration. Kill with grace, and die with dignity.',
        ],
      ],
    },
  ],
});

export const DEMON_FIRST_NIGHT = new PlayerAid({
  id: 'demon-first-night',
  title: 'The Demon, Night One',
  summary: 'Meeting the minions, and the three bluffs.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/icons/trouble_brewing/demons/imp.png',
      alt: 'Imp icon: a red trident',
    },
    {
      type: 'text',
      text: 'On the first night the demon wakes, the storyteller will point out all of the minions, and then the demon is shown three characters that are not in play, these can be used as bluffs for the demon and their minions.',
    },
  ],
});

export const MINIONS_FIRST_NIGHT = new PlayerAid({
  id: 'minions-first-night',
  title: 'The Minions, Night One',
  summary: 'Meeting each other, and learning the demon.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/minions.png',
      alt: 'The Trouble Brewing Minions: the Poisoner, the Spy, the Scarlet Woman, and the Baron',
    },
    {
      type: 'text',
      text: 'The Minions all awake at the same time, they can see one another, then they all learn who the demon is, then they fall back asleep.',
    },
  ],
});

export const GOOD_TEAM_FIRST_NIGHT = new PlayerAid({
  id: 'good-team-first-night',
  title: 'The Good Team',
  summary: 'Who wakes on the first night, and who does not.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/good_team.png',
      alt: 'Some Trouble Brewing Townsfolk and Outsiders: the Mayor, the Undertaker, the Butler, and the Drunk',
    },
    {
      type: 'text',
      text: 'Some good players wake to learn information or use their ability, others do not. Does everyone know what to expect for the first night?',
    },
  ],
});

export const GETTING_STARTED = new PlayerAid({
  id: 'getting-started',
  title: 'Getting Started',
  summary: 'Sharing information, and how many of each player type are in play.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/character_sheet_tb.jpg',
      alt: 'The Trouble Brewing character sheet, with Townsfolk, Outsiders, Minions, and Demons labeled down the left side',
    },
    {
      type: 'text',
      text: 'Now is the time to discuss what people are willing to share, and what leads the town has on finding the demon. I encourage you to keep your character sheet with you so that you can use it to communicate. Also note the character types on the left side of the sheet (Townsfolk, Outsider, Minion, Demon). Reference the table in the center of the town square to know the spread of these types for this game’s player count.',
    },
  ],
});

export const NOMINATIONS = new PlayerAid({
  id: 'nominations',
  title: 'Nominations And Voting',
  summary: 'Getting to the one execution per day.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/nominations.svg',
      alt: 'Four hands raised to vote',
    },
    {
      type: 'text',
      text: 'I am about to call for nominations. To nominate a player say the line “I nominate [player].” When a player is nominated, everyone votes on whether or not to execute them. I will start at the nominated player and spin clockwise. If your hand is up when I pass in front of you, that counts as a vote.',
    },
    {
      type: 'text',
      text: 'Each day, you may vote for as few or as many players as you wish, and whoever has the most votes is executed. This player needs a vote tally of at least 50% of the living players or no execution occurs. On a tie, neither player is executed.',
    },
  ],
});

export const DEATH_IS_NOT_THE_END = new PlayerAid({
  id: 'death-is-not-the-end',
  title: 'Death Is Not The End',
  summary: 'Dead players keep playing, and keep one ghost vote.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/ghost.svg',
      alt: 'A ghost raising its hand to use its ghost vote',
    },
    {
      type: 'text',
      text: 'If you die (nearly all of you will), you are still playing! The storyteller will not reveal your character, so continue to solve the mystery or bluff! You still talk, you still close your eyes at night, and you still win or lose with your team. Dead players cannot use their ability, they cannot nominate, and they get one ghost vote for the rest of the game. The game is usually decided by ghost votes, and how they are used.',
    },
  ],
});

export const ATTRACT_MODE_HOTKEYS = new PlayerAid({
  id: 'attract-mode-hotkeys',
  title: 'Attract Mode Hotkeys',
  summary: 'Keyboard shortcuts for the attract banner.',
  blocks: [
    {
      type: 'text',
      text: ['Click ', { text: 'A Seth Condie Project', style: 'bold' }, ' at the top of the screen to show the small banner.'],
    },
    { type: 'heading', text: 'Banner' },
    {
      type: 'text',
      text: [{ text: 'A', style: 'bold' }, ': step the banner through off → small → large → small → off.'],
    },
    { type: 'heading', text: 'Open Seats' },
    {
      type: 'text',
      text: [{ text: '↑', style: 'bold' }, ': one more seat. ', { text: '↓', style: 'bold' }, ': one less seat.'],
    },
    { type: 'heading', text: 'Countdown' },
    {
      type: 'text',
      text: [{ text: ']', style: 'bold' }, ': add 1 minute. ', { text: '[', style: 'bold' }, ': remove 1 minute.'],
    },
    {
      type: 'text',
      text: [{ text: 'Shift + ]', style: 'bold' }, ' / ', { text: 'Shift + [', style: 'bold' }, ': add or remove 5 minutes.'],
    },
    {
      type: 'text',
      text: [{ text: 'R', style: 'bold' }, ': reset the countdown to 0.'],
    },
    { type: 'text', text: "Hotkeys don't work while a player aid is open or while typing in a field." },
  ],
});

export const DAY_TIMER_HOTKEYS = new PlayerAid({
  id: 'day-timer-hotkeys',
  title: 'Day Timer Hotkeys',
  summary: "Keyboard shortcuts for the day's countdown.",
  blocks: [
    {
      type: 'text',
      text: ['The timer sits above the ', { text: 'Night', style: 'bold' }, " button during the day. When it runs out, \"Time's up\" shows and the bell tolls."],
    },
    { type: 'heading', text: 'Countdown' },
    {
      type: 'text',
      text: [{ text: '=', style: 'bold' }, ': add 30 seconds. ', { text: '-', style: 'bold' }, ': remove 30 seconds.'],
    },
    {
      type: 'text',
      text: [{ text: 'Shift + =', style: 'bold' }, ' / ', { text: 'Shift + -', style: 'bold' }, ': add or remove 5 minutes.'],
    },
    {
      type: 'text',
      text: [{ text: '0', style: 'bold' }, ": reset the timer, and stop a \"Time's up\" that's showing."],
    },
    { type: 'text', text: "Hotkeys only work during the day, and not while a player aid is open or while typing in a field." },
  ],
});

export const PLAYER_AID_HOTKEYS = new PlayerAid({
  id: 'player-aid-hotkeys',
  title: 'Player Aid Hotkeys',
  summary: 'Keyboard shortcuts for browsing player aids.',
  blocks: [
    { type: 'heading', text: 'Browsing' },
    {
      type: 'text',
      text: [{ text: '←', style: 'bold' }, ': the previous aid. ', { text: '→', style: 'bold' }, ': the next aid.'],
    },
    { type: 'text', text: 'Arrows step through the section the aid was opened from.' },
    { type: 'heading', text: 'Closing' },
    {
      type: 'text',
      text: [{ text: 'Esc', style: 'bold' }, ': close the open aid, then the shelf.'],
    },
    { type: 'text', text: 'The arrows only work while a player aid is open.' },
  ],
});

// Not listed on the shelf: only shown by the day's reveal when the night
// had no deaths
export const NO_DEATHS = new PlayerAid({
  id: 'no-deaths',
  title: 'No Deaths',
  blocks: [{ type: 'text', text: 'No one died last night.' }],
});
