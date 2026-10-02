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
});

export const TOWN_SQUARE = new PlayerAid({
  id: 'town-square',
  title: 'Reading the Town Square',
  summary: 'What the tokens and the table in the middle tell you.',
  blocks: [
    {
      type: 'text',
      text: 'We are midway through a 10 player game. For a 10 player game the player spread (Townsfolk, Outsiders, Minions, Demons) can be found on the table in the middle.',
    },
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
        ').',
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
    {
      type: 'text',
      text: [
        'We are in the middle of a vote and player D has gotten 3 votes, they are ',
        { text: '"marked for death"', style: 'bold' },
        '.',
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
        'This is a team game, the ',
        { text: 'Good', style: 'bold' },
        ' team needs to find and execute the demon(s), the ',
        { text: 'Evil', style: 'bold' },
        ' team needs to kill everyone, to the point where they outnumber the good team.',
      ],
    },
  ],
});

export const PLAYER_STATES = new PlayerAid({
  id: 'player-states',
  title: 'Player States',
  summary: 'Alive or dead, drunk or sober, poisoned or healthy.',
  blocks: [
    { type: 'text', text: 'Players have different states.' },
    {
      type: 'image',
      src: 'assets/player_aids/player_state.png',
      alt: 'A 6 player town square: A, E, and F alive, B alive and marked for death in red, C dead with a ghost vote, and D dead without one',
    },
    {
      type: 'text',
      text: ['Player A is ', { text: '"Alive"', style: 'bold' }, '.'],
    },
    {
      type: 'text',
      text: [
        'Player B is also alive, but has enough votes to be executed so they are ',
        { text: '"marked for death"', style: 'bold' },
        '.',
      ],
    },
    {
      type: 'text',
      text: [
        'Player C is ',
        { text: 'dead', style: 'bold' },
        ' but still has their ghost vote. Player D is ',
        { text: 'dead', style: 'bold' },
        ' and has used their ghost vote.',
      ],
    },
    {
      type: 'text',
      text: [
        'Player E is ',
        { text: 'drunk', style: 'bold' },
        ", they don't know it but any information they receive may be false information, all of the other players are ",
        { text: 'sober', style: 'bold' },
        '.',
      ],
    },
    {
      type: 'text',
      text: [
        'Player F is ',
        { text: 'poisoned', style: 'bold' },
        ', being poisoned works just like being drunk, all of the other players are ',
        { text: 'healthy', style: 'bold' },
        '.',
      ],
    },
    {
      type: 'text',
      text: [
        "So player A's state is ",
        { text: 'Alive, Sober, and Healthy', style: 'bold' },
        ", while player E's state is ",
        { text: 'Alive, Drunk, and Healthy', style: 'bold' },
        '.',
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

export const MAYOR_ABILITY = new PlayerAid({
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
