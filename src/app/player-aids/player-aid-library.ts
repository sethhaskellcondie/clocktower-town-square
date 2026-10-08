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
  summary: 'Games like this one.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/icon_botc.png',
      alt: 'Blood on the Clocktower icon: a horned demon face door knocker in purple',
    },
    {
      type: 'text',
      text: 'Blood on the Clocktower is a social deduction game, if you have played games like Werewolf, Mafia, Among Us, or Secret Hitler this game is similar to those.',
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
      src: 'assets/player_aids/icon_clocktower.svg',
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

export const SPY_GRIMOIRE = new PlayerAid({
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
    {
      type: 'text',
      text: 'Remember that the spy can appear as "Good", "Townsfolk" or an "Outsider" even if they are dead.',
    },
  ],
});

export const BUTLER_VOTING = new PlayerAid({
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
});

export const DEMON_FIRST_NIGHT = new PlayerAid({
  id: 'demon-first-night',
  title: 'The Demon, Night One',
  summary: 'Meeting the minions, and the three bluffs.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/icon_imp.png',
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

export const CHEF_PAIRS = new PlayerAid({
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
});

export const UNDERTAKER_EXECUTIONS = new PlayerAid({
  id: 'undertaker-executions',
  title: 'The Undertaker',
  summary: 'Learns who was executed, not who died at night.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/icon_undertaker.png',
      alt: 'Undertaker icon: a blue shovel',
    },
    {
      type: 'text',
      text: 'The undertaker learns who was killed by execution, not players who die at night. Executions happen via public vote during the day, there is only one execution per day.',
    },
  ],
});

export const SCAPEGOAT_EXECUTION = new PlayerAid({
  id: 'scapegoat-execution',
  title: 'The Scapegoat',
  summary: 'Might be executed in place of a teammate.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/icon_scapegoat.png',
      alt: 'Scapegoat icon: a horned goat head, half blue and half red',
    },
    {
      type: 'text',
      text: 'If a player of your alignment is executed, you might be executed instead.',
    },
  ],
});

export const GUNSLINGER_SHOT = new PlayerAid({
  id: 'gunslinger-shot',
  title: 'The Gunslinger',
  summary: 'Can shoot a player who voted.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/icon_gunslinger.png',
      alt: 'Gunslinger icon: two crossed flintlock pistols, half blue and half red',
    },
    {
      type: 'text',
      text: 'Each day, after the 1st vote has been tallied, you may choose a player that voted: they die.',
    },
  ],
});

export const BEGGAR_VOTING = new PlayerAid({
  id: 'beggar-voting',
  title: 'The Beggar',
  summary: 'Needs a ghost vote token from the dead to vote.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/icon_beggar.png',
      alt: 'Beggar icon: a wooden bowl, half blue and half red',
    },
    {
      type: 'text',
      text: 'You must use a ghost vote token to vote. Dead players may give you their ghost vote, if they do you learn their alignment. You are always sober and healthy.',
    },
  ],
});

export const BUREAUCRAT_VOTES = new PlayerAid({
  id: 'bureaucrat-votes',
  title: 'The Bureaucrat',
  summary: "Makes another player's vote count three times.",
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/icon_bureaucrat.png',
      alt: 'Bureaucrat icon: a sealed stack of papers, half blue and half red',
    },
    {
      type: 'text',
      text: 'Each night, choose a player (not yourself): their vote counts as 3 votes tomorrow.',
    },
  ],
});

export const THIEF_VOTES = new PlayerAid({
  id: 'thief-votes',
  title: 'The Thief',
  summary: "Makes another player's vote count against.",
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/icon_thief.png',
      alt: 'Thief icon: a sparkling gem, half blue and half red',
    },
    {
      type: 'text',
      text: 'Each night, choose a player (not yourself): their vote counts negatively (-1 instead of +1) tomorrow.',
    },
  ],
});

export const ANGEL_PROTECTION = new PlayerAid({
  id: 'angel-protection',
  title: 'The Angel',
  summary: 'Protects new players from being targeted.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/icon_angel.png',
      alt: 'Angel icon: a golden halo',
    },
    {
      type: 'text',
      text: 'Something bad might happen to whoever is most responsible for the death of a new player.',
    },
  ],
});

export const BUDDHIST_SILENCE = new PlayerAid({
  id: 'buddhist-silence',
  title: 'The Buddhist',
  summary: 'Veteran players stay quiet at the start of each day.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/icon_buddhist.png',
      alt: 'Buddhist icon: a golden lotus flower',
    },
    {
      type: 'text',
      text: 'For the first 2 minutes of each day, veteran players may not talk.',
    },
  ],
});

export const DOOMSAYER_SACRIFICE = new PlayerAid({
  id: 'doomsayer-sacrifice',
  title: 'The Doomsayer',
  summary: 'Each player may once call for a death on their own team.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/icon_doomsayer.png',
      alt: 'Doomsayer icon: a golden lightning bolt',
    },
    {
      type: 'text',
      text: 'If 4 or more players live, each living player may publicly choose (once per game) that a player of their own alignment dies.',
    },
  ],
});

export const FIDDLER_CONTEST = new PlayerAid({
  id: 'fiddler-contest',
  title: 'The Fiddler',
  summary: 'The Demon may challenge a player to a vote that decides the game.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/icon_fiddler.png',
      alt: 'Fiddler icon: a golden fiddle and bow',
    },
    {
      type: 'text',
      text: 'Once per game, the Demon secretly chooses an opposing player: all players choose which of these 2 players (and their team) wins.',
    },
  ],
});

export const HELLS_LIBRARIAN_SILENCE = new PlayerAid({
  id: 'hells-librarian-silence',
  title: "Hell's Librarian",
  summary: 'Talking when silence is asked for may be punished.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/icon_hells_librarian.png',
      alt: "Hell's Librarian icon: a golden stack of books",
    },
    {
      type: 'text',
      text: 'Something bad might happen to whoever talks when the Storyteller has asked for silence.',
    },
  ],
});

export const REVOLUTIONARY_NEIGHBORS = new PlayerAid({
  id: 'revolutionary-neighbors',
  title: 'The Revolutionary',
  summary: 'Two neighbors are known to share an alignment.',
  blocks: [
    {
      type: 'image',
      src: 'assets/player_aids/icon_revolutionary.png',
      alt: 'Revolutionary icon: a golden raised fist',
    },
    {
      type: 'text',
      text: '2 neighboring players are known to be the same alignment. Once per game, 1 of them registers falsely.',
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
