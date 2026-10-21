import { Character } from './character';

// Every character, each created once and then listed in the scripts it's
// played in. A character's player aid is made by passing it to a PlayerAid.
// Abilities are worded as they are on the Blood on the Clocktower wiki.

// Trouble Brewing: Townsfolk
export const WASHERWOMAN = new Character({
  id: 'washerwoman',
  name: 'Washerwoman',
  icon: 'assets/player_aids/icons/trouble_brewing/townsfolk/washerwoman.png',
  type: 'Townsfolk',
  ability: 'You start knowing that 1 of 2 players is a particular Townsfolk.',
  link: 'https://wiki.bloodontheclocktower.com/Washerwoman',
});

export const LIBRARIAN = new Character({
  id: 'librarian',
  name: 'Librarian',
  icon: 'assets/player_aids/icons/trouble_brewing/townsfolk/librarian.png',
  type: 'Townsfolk',
  ability: 'You start knowing that 1 of 2 players is a particular Outsider. (Or that zero are in play.)',
  link: 'https://wiki.bloodontheclocktower.com/Librarian',
});

export const INVESTIGATOR = new Character({
  id: 'investigator',
  name: 'Investigator',
  icon: 'assets/player_aids/icons/trouble_brewing/townsfolk/investigator.png',
  type: 'Townsfolk',
  ability: 'You start knowing that 1 of 2 players is a particular Minion.',
  link: 'https://wiki.bloodontheclocktower.com/Investigator',
});

export const CHEF = new Character({
  id: 'chef',
  name: 'Chef',
  icon: 'assets/player_aids/icons/trouble_brewing/townsfolk/chef.png',
  type: 'Townsfolk',
  ability: 'You start knowing how many pairs of evil players there are.',
  link: 'https://wiki.bloodontheclocktower.com/Chef',
});

export const EMPATH = new Character({
  id: 'empath',
  name: 'Empath',
  icon: 'assets/player_aids/icons/trouble_brewing/townsfolk/empath.png',
  type: 'Townsfolk',
  ability: 'Each night, you learn how many of your 2 alive neighbors are evil.',
  link: 'https://wiki.bloodontheclocktower.com/Empath',
});

export const FORTUNE_TELLER = new Character({
  id: 'fortune-teller',
  name: 'Fortune Teller',
  icon: 'assets/player_aids/icons/trouble_brewing/townsfolk/fortune_teller.png',
  type: 'Townsfolk',
  ability: 'Each night, choose 2 players: you learn if either is a Demon. There is a good player that registers as a Demon to you.',
  link: 'https://wiki.bloodontheclocktower.com/Fortune_Teller',
});

export const UNDERTAKER = new Character({
  id: 'undertaker',
  name: 'Undertaker',
  icon: 'assets/player_aids/icons/trouble_brewing/townsfolk/undertaker.png',
  type: 'Townsfolk',
  ability: 'Each night*, you learn which character died by execution today.',
  link: 'https://wiki.bloodontheclocktower.com/Undertaker',
});

export const MONK = new Character({
  id: 'monk',
  name: 'Monk',
  icon: 'assets/player_aids/icons/trouble_brewing/townsfolk/monk.png',
  type: 'Townsfolk',
  ability: 'Each night*, choose a player (not yourself): they are safe from the Demon tonight.',
  link: 'https://wiki.bloodontheclocktower.com/Monk',
});

export const RAVENKEEPER = new Character({
  id: 'ravenkeeper',
  name: 'Ravenkeeper',
  icon: 'assets/player_aids/icons/trouble_brewing/townsfolk/ravenkeeper.png',
  type: 'Townsfolk',
  ability: 'If you die at night, you are woken to choose a player: you learn their character.',
  link: 'https://wiki.bloodontheclocktower.com/Ravenkeeper',
});

export const VIRGIN = new Character({
  id: 'virgin',
  name: 'Virgin',
  icon: 'assets/player_aids/icons/trouble_brewing/townsfolk/virgin.png',
  type: 'Townsfolk',
  ability: 'The 1st time you are nominated, if the nominator is a Townsfolk, they are executed immediately.',
  link: 'https://wiki.bloodontheclocktower.com/Virgin',
});

export const SLAYER = new Character({
  id: 'slayer',
  name: 'Slayer',
  icon: 'assets/player_aids/icons/trouble_brewing/townsfolk/slayer.png',
  type: 'Townsfolk',
  ability: 'Once per game, during the day, publicly choose a player: if they are the Demon, they die.',
  link: 'https://wiki.bloodontheclocktower.com/Slayer',
});

export const SOLDIER = new Character({
  id: 'soldier',
  name: 'Soldier',
  icon: 'assets/player_aids/icons/trouble_brewing/townsfolk/soldier.png',
  type: 'Townsfolk',
  ability: 'You are safe from the Demon.',
  link: 'https://wiki.bloodontheclocktower.com/Soldier',
});

export const MAYOR = new Character({
  id: 'mayor',
  name: 'Mayor',
  icon: 'assets/player_aids/icons/trouble_brewing/townsfolk/mayor.png',
  type: 'Townsfolk',
  ability: 'If only 3 players live & no execution occurs, your team wins. If you die at night, another player might die instead.',
  link: 'https://wiki.bloodontheclocktower.com/Mayor',
});

// Trouble Brewing: Outsiders
export const BUTLER = new Character({
  id: 'butler',
  name: 'Butler',
  icon: 'assets/player_aids/icons/trouble_brewing/outsiders/butler.png',
  type: 'Outsider',
  ability: 'Each night, choose a player (not yourself): tomorrow, you may only vote if they are voting too.',
  additionalText: "During a nomination, the Butler may only have their hand raised to vote if the Master has their hand raised to vote or if the Master's vote has already been counted. The Butler must keep track of their Master. If they vote illegally their vote will be counted like normal, but don't do that, it's not cool.",
  link: 'https://wiki.bloodontheclocktower.com/Butler',
});

export const DRUNK = new Character({
  id: 'drunk',
  name: 'Drunk',
  icon: 'assets/player_aids/icons/trouble_brewing/outsiders/drunk.png',
  type: 'Outsider',
  ability: 'You do not know you are the Drunk. You think you are a Townsfolk character, but you are not.',
  link: 'https://wiki.bloodontheclocktower.com/Drunk',
});

export const RECLUSE = new Character({
  id: 'recluse',
  name: 'Recluse',
  icon: 'assets/player_aids/icons/trouble_brewing/outsiders/recluse.png',
  type: 'Outsider',
  ability: 'You might register as evil & as a Minion or Demon, even if dead.',
  link: 'https://wiki.bloodontheclocktower.com/Recluse',
});

export const SAINT = new Character({
  id: 'saint',
  name: 'Saint',
  icon: 'assets/player_aids/icons/trouble_brewing/outsiders/saint.png',
  type: 'Outsider',
  ability: 'If you die by execution, your team loses.',
  link: 'https://wiki.bloodontheclocktower.com/Saint',
});

// Trouble Brewing: Minions
export const POISONER = new Character({
  id: 'poisoner',
  name: 'Poisoner',
  icon: 'assets/player_aids/icons/trouble_brewing/minions/poisoner.png',
  type: 'Minion',
  ability: 'Each night, choose a player: they are poisoned tonight and tomorrow day.',
  link: 'https://wiki.bloodontheclocktower.com/Poisoner',
});

export const SPY = new Character({
  id: 'spy',
  name: 'Spy',
  icon: 'assets/player_aids/icons/trouble_brewing/minions/spy.png',
  type: 'Minion',
  ability: 'Each night, you see the Grimoire. You might register as good & as a Townsfolk or Outsider, even if dead.',
  link: 'https://wiki.bloodontheclocktower.com/Spy',
});

export const SCARLET_WOMAN = new Character({
  id: 'scarlet-woman',
  name: 'Scarlet Woman',
  icon: 'assets/player_aids/icons/trouble_brewing/minions/scarlet_woman.png',
  type: 'Minion',
  ability: "If there are 5 or more players alive & the Demon dies, you become the Demon. (Travellers don't count.)",
  link: 'https://wiki.bloodontheclocktower.com/Scarlet_Woman',
});

export const BARON = new Character({
  id: 'baron',
  name: 'Baron',
  icon: 'assets/player_aids/icons/trouble_brewing/minions/baron.png',
  type: 'Minion',
  ability: 'There are extra Outsiders in play. [+2 Outsiders]',
  link: 'https://wiki.bloodontheclocktower.com/Baron',
});

// Trouble Brewing: Demons
export const IMP = new Character({
  id: 'imp',
  name: 'Imp',
  icon: 'assets/player_aids/icons/trouble_brewing/demons/imp.png',
  type: 'Demon',
  ability: 'Each night*, choose a player: they die. If you kill yourself this way, a Minion becomes the Imp.',
  link: 'https://wiki.bloodontheclocktower.com/Imp',
});

// Trouble Brewing: Travelers
export const SCAPEGOAT = new Character({
  id: 'scapegoat',
  name: 'Scapegoat',
  icon: 'assets/player_aids/icons/trouble_brewing/travelers/scapegoat.png',
  type: 'Traveler',
  ability: 'If a player of your alignment is executed, you might be executed instead.',
  link: 'https://wiki.bloodontheclocktower.com/Scapegoat',
});

export const GUNSLINGER = new Character({
  id: 'gunslinger',
  name: 'Gunslinger',
  icon: 'assets/player_aids/icons/trouble_brewing/travelers/gunslinger.png',
  type: 'Traveler',
  ability: 'Each day, after the 1st vote has been tallied, you may choose a player that voted: they die.',
  link: 'https://wiki.bloodontheclocktower.com/Gunslinger',
});

export const BEGGAR = new Character({
  id: 'beggar',
  name: 'Beggar',
  icon: 'assets/player_aids/icons/trouble_brewing/travelers/beggar.png',
  type: 'Traveler',
  ability: 'You must use a vote token to vote. If a dead player gives you theirs, you learn their alignment. You are sober and healthy.',
  link: 'https://wiki.bloodontheclocktower.com/Beggar',
});

export const BUREAUCRAT = new Character({
  id: 'bureaucrat',
  name: 'Bureaucrat',
  icon: 'assets/player_aids/icons/trouble_brewing/travelers/bureaucrat.png',
  type: 'Traveler',
  ability: 'Each night, choose a player (not yourself): their vote counts as 3 votes tomorrow.',
  link: 'https://wiki.bloodontheclocktower.com/Bureaucrat',
});

export const THIEF = new Character({
  id: 'thief',
  name: 'Thief',
  icon: 'assets/player_aids/icons/trouble_brewing/travelers/thief.png',
  type: 'Traveler',
  ability: 'Each night, choose a player (not yourself): their vote counts negatively tomorrow.',
  link: 'https://wiki.bloodontheclocktower.com/Thief',
});

// Every Trouble Brewing character, in the order of its character sheet,
// with the travelers after
export const TROUBLE_BREWING_CHARACTERS: readonly Character[] = [
  WASHERWOMAN,
  LIBRARIAN,
  INVESTIGATOR,
  CHEF,
  EMPATH,
  FORTUNE_TELLER,
  UNDERTAKER,
  MONK,
  RAVENKEEPER,
  VIRGIN,
  SLAYER,
  SOLDIER,
  MAYOR,
  BUTLER,
  DRUNK,
  RECLUSE,
  SAINT,
  POISONER,
  SPY,
  SCARLET_WOMAN,
  BARON,
  IMP,
  SCAPEGOAT,
  GUNSLINGER,
  BEGGAR,
  BUREAUCRAT,
  THIEF,
];

// Bad Moon Rising: Townsfolk
export const GRANDMOTHER = new Character({
  id: 'grandmother',
  name: 'Grandmother',
  icon: 'assets/player_aids/icons/bad_moon_rising/townsfolk/grandmother.png',
  type: 'Townsfolk',
  ability: 'You start knowing a good player & their character. If the Demon kills them, you die too.',
  link: 'https://wiki.bloodontheclocktower.com/Grandmother',
});

export const SAILOR = new Character({
  id: 'sailor',
  name: 'Sailor',
  icon: 'assets/player_aids/icons/bad_moon_rising/townsfolk/sailor.png',
  type: 'Townsfolk',
  ability: "Each night, choose an alive player: either you or they are drunk until dusk. You can't die.",
  link: 'https://wiki.bloodontheclocktower.com/Sailor',
});

export const CHAMBERMAID = new Character({
  id: 'chambermaid',
  name: 'Chambermaid',
  icon: 'assets/player_aids/icons/bad_moon_rising/townsfolk/chambermaid.png',
  type: 'Townsfolk',
  ability: 'Each night, choose 2 alive players (not yourself): you learn how many woke tonight due to their ability.',
  link: 'https://wiki.bloodontheclocktower.com/Chambermaid',
});

export const EXORCIST = new Character({
  id: 'exorcist',
  name: 'Exorcist',
  icon: 'assets/player_aids/icons/bad_moon_rising/townsfolk/exorcist.png',
  type: 'Townsfolk',
  ability: "Each night*, choose a player (different to last night): the Demon, if chosen, learns who you are then doesn't wake tonight.",
  link: 'https://wiki.bloodontheclocktower.com/Exorcist',
});

export const INNKEEPER = new Character({
  id: 'innkeeper',
  name: 'Innkeeper',
  icon: 'assets/player_aids/icons/bad_moon_rising/townsfolk/innkeeper.png',
  type: 'Townsfolk',
  ability: "Each night*, choose 2 players: they can't die tonight, but 1 is drunk until dusk.",
  link: 'https://wiki.bloodontheclocktower.com/Innkeeper',
});

export const GAMBLER = new Character({
  id: 'gambler',
  name: 'Gambler',
  icon: 'assets/player_aids/icons/bad_moon_rising/townsfolk/gambler.png',
  type: 'Townsfolk',
  ability: 'Each night*, choose a player & guess their character: if you guess wrong, you die.',
  link: 'https://wiki.bloodontheclocktower.com/Gambler',
});

export const GOSSIP = new Character({
  id: 'gossip',
  name: 'Gossip',
  icon: 'assets/player_aids/icons/bad_moon_rising/townsfolk/gossip.png',
  type: 'Townsfolk',
  ability: 'Each day, you may make a public statement. Tonight, if it was true, a player dies.',
  link: 'https://wiki.bloodontheclocktower.com/Gossip',
});

export const COURTIER = new Character({
  id: 'courtier',
  name: 'Courtier',
  icon: 'assets/player_aids/icons/bad_moon_rising/townsfolk/courtier.png',
  type: 'Townsfolk',
  ability: 'Once per game, at night, choose a character: they are drunk for 3 nights & 3 days.',
  link: 'https://wiki.bloodontheclocktower.com/Courtier',
});

export const PROFESSOR = new Character({
  id: 'professor',
  name: 'Professor',
  icon: 'assets/player_aids/icons/bad_moon_rising/townsfolk/professor.png',
  type: 'Townsfolk',
  ability: 'Once per game, at night*, choose a dead player: if they are a Townsfolk, they are resurrected.',
  link: 'https://wiki.bloodontheclocktower.com/Professor',
});

export const MINSTREL = new Character({
  id: 'minstrel',
  name: 'Minstrel',
  icon: 'assets/player_aids/icons/bad_moon_rising/townsfolk/minstrel.png',
  type: 'Townsfolk',
  ability: 'When a Minion dies by execution, all other players (except Travellers) are drunk until dusk tomorrow.',
  link: 'https://wiki.bloodontheclocktower.com/Minstrel',
});

export const TEA_LADY = new Character({
  id: 'tea-lady',
  name: 'Tea Lady',
  icon: 'assets/player_aids/icons/bad_moon_rising/townsfolk/tea_lady.png',
  type: 'Townsfolk',
  ability: "If both your alive neighbors are good, they can't die.",
  link: 'https://wiki.bloodontheclocktower.com/Tea_Lady',
});

export const PACIFIST = new Character({
  id: 'pacifist',
  name: 'Pacifist',
  icon: 'assets/player_aids/icons/bad_moon_rising/townsfolk/pacifist.png',
  type: 'Townsfolk',
  ability: 'Executed good players might not die.',
  link: 'https://wiki.bloodontheclocktower.com/Pacifist',
});

export const FOOL = new Character({
  id: 'fool',
  name: 'Fool',
  icon: 'assets/player_aids/icons/bad_moon_rising/townsfolk/fool.png',
  type: 'Townsfolk',
  ability: "The 1st time you die, you don't.",
  link: 'https://wiki.bloodontheclocktower.com/Fool',
});

// Bad Moon Rising: Outsiders
export const TINKER = new Character({
  id: 'tinker',
  name: 'Tinker',
  icon: 'assets/player_aids/icons/bad_moon_rising/outsiders/tinker.png',
  type: 'Outsider',
  ability: 'You might die at any time.',
  link: 'https://wiki.bloodontheclocktower.com/Tinker',
});

export const MOONCHILD = new Character({
  id: 'moonchild',
  name: 'Moonchild',
  icon: 'assets/player_aids/icons/bad_moon_rising/outsiders/moonchild.png',
  type: 'Outsider',
  ability: 'When you learn that you died, publicly choose 1 alive player. Tonight, if it was a good player, they die.',
  link: 'https://wiki.bloodontheclocktower.com/Moonchild',
});

export const GOON = new Character({
  id: 'goon',
  name: 'Goon',
  icon: 'assets/player_aids/icons/bad_moon_rising/outsiders/goon.png',
  type: 'Outsider',
  ability: 'Each night, the 1st player to choose you with their ability is drunk until dusk. You become their alignment.',
  link: 'https://wiki.bloodontheclocktower.com/Goon',
});

export const LUNATIC = new Character({
  id: 'lunatic',
  name: 'Lunatic',
  icon: 'assets/player_aids/icons/bad_moon_rising/outsiders/lunatic.png',
  type: 'Outsider',
  ability: 'You think you are a Demon, but you are not. The Demon knows who you are & who you choose at night.',
  link: 'https://wiki.bloodontheclocktower.com/Lunatic',
});

// Bad Moon Rising: Minions
export const GODFATHER = new Character({
  id: 'godfather',
  name: 'Godfather',
  icon: 'assets/player_aids/icons/bad_moon_rising/minions/godfather.png',
  type: 'Minion',
  ability: 'You start knowing which Outsiders are in play. If 1 died today, choose a player tonight: they die. [-1 or +1 Outsider]',
  link: 'https://wiki.bloodontheclocktower.com/Godfather',
});

export const DEVILS_ADVOCATE = new Character({
  id: 'devils-advocate',
  name: "Devil's Advocate",
  icon: 'assets/player_aids/icons/bad_moon_rising/minions/devils_advocate.png',
  type: 'Minion',
  ability: "Each night, choose a living player (different to last night): if executed tomorrow, they don't die.",
  link: "https://wiki.bloodontheclocktower.com/Devil's_Advocate",
});

export const ASSASSIN = new Character({
  id: 'assassin',
  name: 'Assassin',
  icon: 'assets/player_aids/icons/bad_moon_rising/minions/assassin.png',
  type: 'Minion',
  ability: 'Once per game, at night*, choose a player: they die, even if for some reason they could not.',
  link: 'https://wiki.bloodontheclocktower.com/Assassin',
});

export const MASTERMIND = new Character({
  id: 'mastermind',
  name: 'Mastermind',
  icon: 'assets/player_aids/icons/bad_moon_rising/minions/mastermind.png',
  type: 'Minion',
  ability: 'If the Demon dies by execution (ending the game), play for 1 more day. If a player is then executed, their team loses.',
  link: 'https://wiki.bloodontheclocktower.com/Mastermind',
});

// Bad Moon Rising: Demons
export const ZOMBUUL = new Character({
  id: 'zombuul',
  name: 'Zombuul',
  icon: 'assets/player_aids/icons/bad_moon_rising/demons/zombuul.png',
  type: 'Demon',
  ability: 'Each night*, if no-one died today, choose a player: they die. The 1st time you die, you live but register as dead.',
  link: 'https://wiki.bloodontheclocktower.com/Zombuul',
});

export const PUKKA = new Character({
  id: 'pukka',
  name: 'Pukka',
  icon: 'assets/player_aids/icons/bad_moon_rising/demons/pukka.png',
  type: 'Demon',
  ability: 'Each night, choose a player: they are poisoned. The previously poisoned player dies then becomes healthy.',
  link: 'https://wiki.bloodontheclocktower.com/Pukka',
});

export const SHABALOTH = new Character({
  id: 'shabaloth',
  name: 'Shabaloth',
  icon: 'assets/player_aids/icons/bad_moon_rising/demons/shabaloth.png',
  type: 'Demon',
  ability: 'Each night*, choose 2 players: they die. A dead player you chose last night might be regurgitated.',
  link: 'https://wiki.bloodontheclocktower.com/Shabaloth',
});

export const PO = new Character({
  id: 'po',
  name: 'Po',
  icon: 'assets/player_aids/icons/bad_moon_rising/demons/po.png',
  type: 'Demon',
  ability: 'Each night*, you may choose a player: they die. If your last choice was no-one, choose 3 players tonight.',
  link: 'https://wiki.bloodontheclocktower.com/Po',
});

// Bad Moon Rising: Travelers
export const APPRENTICE = new Character({
  id: 'apprentice',
  name: 'Apprentice',
  icon: 'assets/player_aids/icons/bad_moon_rising/travelers/apprentice.png',
  type: 'Traveler',
  ability: 'On your 1st night, you gain a Townsfolk ability (if good) or a Minion ability (if evil).',
  link: 'https://wiki.bloodontheclocktower.com/Apprentice',
});

export const MATRON = new Character({
  id: 'matron',
  name: 'Matron',
  icon: 'assets/player_aids/icons/bad_moon_rising/travelers/matron.png',
  type: 'Traveler',
  ability: 'Each day, you may choose up to 3 sets of 2 players to swap seats. Players may not leave their seats to talk in private.',
  link: 'https://wiki.bloodontheclocktower.com/Matron',
});

export const JUDGE = new Character({
  id: 'judge',
  name: 'Judge',
  icon: 'assets/player_aids/icons/bad_moon_rising/travelers/judge.png',
  type: 'Traveler',
  ability: 'Once per game, if another player nominated, you may choose to force the current execution to pass or fail.',
  link: 'https://wiki.bloodontheclocktower.com/Judge',
});

export const BISHOP = new Character({
  id: 'bishop',
  name: 'Bishop',
  icon: 'assets/player_aids/icons/bad_moon_rising/travelers/bishop.png',
  type: 'Traveler',
  ability: 'Only the Storyteller can nominate. At least 1 opposing player must be nominated each day.',
  link: 'https://wiki.bloodontheclocktower.com/Bishop',
});

export const VOUDON = new Character({
  id: 'voudon',
  name: 'Voudon',
  icon: 'assets/player_aids/icons/bad_moon_rising/travelers/voudon.png',
  type: 'Traveler',
  ability: "Only you & the dead can vote. They don't need a vote token to do so. A 50% majority isn't required.",
  link: 'https://wiki.bloodontheclocktower.com/Voudon',
});

// Every Bad Moon Rising character, in the order of its character sheet,
// with the travelers after
export const BAD_MOON_RISING_CHARACTERS: readonly Character[] = [
  GRANDMOTHER,
  SAILOR,
  CHAMBERMAID,
  EXORCIST,
  INNKEEPER,
  GAMBLER,
  GOSSIP,
  COURTIER,
  PROFESSOR,
  MINSTREL,
  TEA_LADY,
  PACIFIST,
  FOOL,
  TINKER,
  MOONCHILD,
  GOON,
  LUNATIC,
  GODFATHER,
  DEVILS_ADVOCATE,
  ASSASSIN,
  MASTERMIND,
  ZOMBUUL,
  PUKKA,
  SHABALOTH,
  PO,
  APPRENTICE,
  MATRON,
  JUDGE,
  BISHOP,
  VOUDON,
];

// Sects & Violets: Townsfolk
export const CLOCKMAKER = new Character({
  id: 'clockmaker',
  name: 'Clockmaker',
  icon: 'assets/player_aids/icons/sects_and_violets/townsfolk/clockmaker.png',
  type: 'Townsfolk',
  ability: 'You start knowing how many steps from the Demon to its nearest Minion.',
  link: 'https://wiki.bloodontheclocktower.com/Clockmaker',
});

export const DREAMER = new Character({
  id: 'dreamer',
  name: 'Dreamer',
  icon: 'assets/player_aids/icons/sects_and_violets/townsfolk/dreamer.png',
  type: 'Townsfolk',
  ability: 'Each night, choose a player (not yourself or Travellers): you learn 1 good & 1 evil character, 1 of which is correct.',
  link: 'https://wiki.bloodontheclocktower.com/Dreamer',
});

export const SNAKE_CHARMER = new Character({
  id: 'snake-charmer',
  name: 'Snake Charmer',
  icon: 'assets/player_aids/icons/sects_and_violets/townsfolk/snake_charmer.png',
  type: 'Townsfolk',
  ability: 'Each night, choose an alive player: a chosen Demon swaps characters & alignments with you & is then poisoned.',
  link: 'https://wiki.bloodontheclocktower.com/Snake_Charmer',
});

export const MATHEMATICIAN = new Character({
  id: 'mathematician',
  name: 'Mathematician',
  icon: 'assets/player_aids/icons/sects_and_violets/townsfolk/mathematician.png',
  type: 'Townsfolk',
  ability: "Each night, you learn how many players' abilities worked abnormally (since dawn) due to another character's ability.",
  link: 'https://wiki.bloodontheclocktower.com/Mathematician',
});

export const FLOWERGIRL = new Character({
  id: 'flowergirl',
  name: 'Flowergirl',
  icon: 'assets/player_aids/icons/sects_and_violets/townsfolk/flowergirl.png',
  type: 'Townsfolk',
  ability: 'Each night*, you learn if a Demon voted today.',
  link: 'https://wiki.bloodontheclocktower.com/Flowergirl',
});

export const TOWN_CRIER = new Character({
  id: 'town-crier',
  name: 'Town Crier',
  icon: 'assets/player_aids/icons/sects_and_violets/townsfolk/town_crier.png',
  type: 'Townsfolk',
  ability: 'Each night*, you learn if a Minion nominated today.',
  link: 'https://wiki.bloodontheclocktower.com/Town_Crier',
});

export const ORACLE = new Character({
  id: 'oracle',
  name: 'Oracle',
  icon: 'assets/player_aids/icons/sects_and_violets/townsfolk/oracle.png',
  type: 'Townsfolk',
  ability: 'Each night*, you learn how many dead players are evil.',
  link: 'https://wiki.bloodontheclocktower.com/Oracle',
});

export const SAVANT = new Character({
  id: 'savant',
  name: 'Savant',
  icon: 'assets/player_aids/icons/sects_and_violets/townsfolk/savant.png',
  type: 'Townsfolk',
  ability: 'Each day, you may visit the Storyteller to learn 2 things in private: 1 is true & 1 is false.',
  link: 'https://wiki.bloodontheclocktower.com/Savant',
});

export const SEAMSTRESS = new Character({
  id: 'seamstress',
  name: 'Seamstress',
  icon: 'assets/player_aids/icons/sects_and_violets/townsfolk/seamstress.png',
  type: 'Townsfolk',
  ability: 'Once per game, at night, choose 2 players (not yourself): you learn if they are the same alignment.',
  link: 'https://wiki.bloodontheclocktower.com/Seamstress',
});

export const PHILOSOPHER = new Character({
  id: 'philosopher',
  name: 'Philosopher',
  icon: 'assets/player_aids/icons/sects_and_violets/townsfolk/philosopher.png',
  type: 'Townsfolk',
  ability: 'Once per game, at night, choose a good character: gain that ability. If this character is in play, they are drunk.',
  link: 'https://wiki.bloodontheclocktower.com/Philosopher',
});

export const ARTIST = new Character({
  id: 'artist',
  name: 'Artist',
  icon: 'assets/player_aids/icons/sects_and_violets/townsfolk/artist.png',
  type: 'Townsfolk',
  ability: 'Once per game, during the day, privately ask the Storyteller any yes/no question.',
  link: 'https://wiki.bloodontheclocktower.com/Artist',
});

export const JUGGLER = new Character({
  id: 'juggler',
  name: 'Juggler',
  icon: 'assets/player_aids/icons/sects_and_violets/townsfolk/juggler.png',
  type: 'Townsfolk',
  ability: "On your 1st day, publicly guess up to 5 players' characters. That night, you learn how many you got correct.",
  link: 'https://wiki.bloodontheclocktower.com/Juggler',
});

export const SAGE = new Character({
  id: 'sage',
  name: 'Sage',
  icon: 'assets/player_aids/icons/sects_and_violets/townsfolk/sage.png',
  type: 'Townsfolk',
  ability: 'If the Demon kills you, you learn that it is 1 of 2 players.',
  link: 'https://wiki.bloodontheclocktower.com/Sage',
});

// Sects & Violets: Outsiders
export const MUTANT = new Character({
  id: 'mutant',
  name: 'Mutant',
  icon: 'assets/player_aids/icons/sects_and_violets/outsiders/mutant.png',
  type: 'Outsider',
  ability: 'If you are "mad" about being an Outsider, you might be executed.',
  link: 'https://wiki.bloodontheclocktower.com/Mutant',
});

export const SWEETHEART = new Character({
  id: 'sweetheart',
  name: 'Sweetheart',
  icon: 'assets/player_aids/icons/sects_and_violets/outsiders/sweetheart.png',
  type: 'Outsider',
  ability: 'When you die, 1 player is drunk from now on.',
  link: 'https://wiki.bloodontheclocktower.com/Sweetheart',
});

export const BARBER = new Character({
  id: 'barber',
  name: 'Barber',
  icon: 'assets/player_aids/icons/sects_and_violets/outsiders/barber.png',
  type: 'Outsider',
  ability: 'If you died today or tonight, the Demon may choose 2 players (not another Demon) to swap characters.',
  link: 'https://wiki.bloodontheclocktower.com/Barber',
});

export const KLUTZ = new Character({
  id: 'klutz',
  name: 'Klutz',
  icon: 'assets/player_aids/icons/sects_and_violets/outsiders/klutz.png',
  type: 'Outsider',
  ability: 'When you learn that you died, publicly choose 1 alive player: if they are evil, your team loses.',
  link: 'https://wiki.bloodontheclocktower.com/Klutz',
});

// Sects & Violets: Minions
export const EVIL_TWIN = new Character({
  id: 'evil-twin',
  name: 'Evil Twin',
  icon: 'assets/player_aids/icons/sects_and_violets/minions/evil_twin.png',
  type: 'Minion',
  ability: "You & an opposing player know each other. If the good player is executed, evil wins. Good can't win if you both live.",
  link: 'https://wiki.bloodontheclocktower.com/Evil_Twin',
});

export const WITCH = new Character({
  id: 'witch',
  name: 'Witch',
  icon: 'assets/player_aids/icons/sects_and_violets/minions/witch.png',
  type: 'Minion',
  ability: 'Each night, choose a player: if they nominate tomorrow, they die. If just 3 players live, you lose this ability.',
  link: 'https://wiki.bloodontheclocktower.com/Witch',
});

export const CERENOVUS = new Character({
  id: 'cerenovus',
  name: 'Cerenovus',
  icon: 'assets/player_aids/icons/sects_and_violets/minions/cerenovus.png',
  type: 'Minion',
  ability: 'Each night, choose a player & a good character: they are "mad" they are this character tomorrow, or might be executed.',
  link: 'https://wiki.bloodontheclocktower.com/Cerenovus',
});

export const PIT_HAG = new Character({
  id: 'pit-hag',
  name: 'Pit-Hag',
  icon: 'assets/player_aids/icons/sects_and_violets/minions/pit_hag.png',
  type: 'Minion',
  ability: 'Each night*, choose a player & a character they become (if not in play). If a Demon is made, deaths tonight are arbitrary.',
  link: 'https://wiki.bloodontheclocktower.com/Pit-Hag',
});

// Sects & Violets: Demons
export const FANG_GU = new Character({
  id: 'fang-gu',
  name: 'Fang Gu',
  icon: 'assets/player_aids/icons/sects_and_violets/demons/fang_gu.png',
  type: 'Demon',
  ability: 'Each night*, choose a player: they die. The 1st Outsider this kills becomes an evil Fang Gu & you die instead. [+1 Outsider]',
  link: 'https://wiki.bloodontheclocktower.com/Fang_Gu',
});

export const VIGORMORTIS = new Character({
  id: 'vigormortis',
  name: 'Vigormortis',
  icon: 'assets/player_aids/icons/sects_and_violets/demons/vigormortis.png',
  type: 'Demon',
  ability: 'Each night*, choose a player: they die. Minions you kill keep their ability & poison 1 Townsfolk neighbor. [-1 Outsider]',
  link: 'https://wiki.bloodontheclocktower.com/Vigormortis',
});

export const NO_DASHII = new Character({
  id: 'no-dashii',
  name: 'No Dashii',
  icon: 'assets/player_aids/icons/sects_and_violets/demons/no_dashii.png',
  type: 'Demon',
  ability: 'Each night*, choose a player: they die. Your 2 Townsfolk neighbors are poisoned.',
  link: 'https://wiki.bloodontheclocktower.com/No_Dashii',
});

export const VORTOX = new Character({
  id: 'vortox',
  name: 'Vortox',
  icon: 'assets/player_aids/icons/sects_and_violets/demons/vortox.png',
  type: 'Demon',
  ability: 'Each night*, choose a player: they die. Townsfolk abilities yield false info. Each day, if no-one is executed, evil wins.',
  link: 'https://wiki.bloodontheclocktower.com/Vortox',
});

// Sects & Violets: Travelers
export const BARISTA = new Character({
  id: 'barista',
  name: 'Barista',
  icon: 'assets/player_aids/icons/sects_and_violets/travelers/barista.png',
  type: 'Traveler',
  ability: 'Each night, until dusk, 1) a player becomes sober, healthy & gets true info, or 2) their ability works twice. They learn which.',
  link: 'https://wiki.bloodontheclocktower.com/Barista',
});

export const HARLOT = new Character({
  id: 'harlot',
  name: 'Harlot',
  icon: 'assets/player_aids/icons/sects_and_violets/travelers/harlot.png',
  type: 'Traveler',
  ability: 'Each night*, choose a living player: if they agree, you learn their character, but you both might die.',
  link: 'https://wiki.bloodontheclocktower.com/Harlot',
});

export const BUTCHER = new Character({
  id: 'butcher',
  name: 'Butcher',
  icon: 'assets/player_aids/icons/sects_and_violets/travelers/butcher.png',
  type: 'Traveler',
  ability: 'Each day, after the 1st execution, you may nominate again.',
  link: 'https://wiki.bloodontheclocktower.com/Butcher',
});

export const BONE_COLLECTOR = new Character({
  id: 'bone-collector',
  name: 'Bone Collector',
  icon: 'assets/player_aids/icons/sects_and_violets/travelers/bone_collector.png',
  type: 'Traveler',
  ability: 'Once per game, at night*, choose a dead player: they regain their ability until dusk.',
  link: 'https://wiki.bloodontheclocktower.com/Bone_Collector',
});

export const DEVIANT = new Character({
  id: 'deviant',
  name: 'Deviant',
  icon: 'assets/player_aids/icons/sects_and_violets/travelers/deviant.png',
  type: 'Traveler',
  ability: 'If you were funny today, you cannot die by exile.',
  link: 'https://wiki.bloodontheclocktower.com/Deviant',
});

// Every Sects & Violets character, in the order of its character sheet,
// with the travelers after
export const SECTS_AND_VIOLETS_CHARACTERS: readonly Character[] = [
  CLOCKMAKER,
  DREAMER,
  SNAKE_CHARMER,
  MATHEMATICIAN,
  FLOWERGIRL,
  TOWN_CRIER,
  ORACLE,
  SAVANT,
  SEAMSTRESS,
  PHILOSOPHER,
  ARTIST,
  JUGGLER,
  SAGE,
  MUTANT,
  SWEETHEART,
  BARBER,
  KLUTZ,
  EVIL_TWIN,
  WITCH,
  CERENOVUS,
  PIT_HAG,
  FANG_GU,
  VIGORMORTIS,
  NO_DASHII,
  VORTOX,
  BARISTA,
  HARLOT,
  BUTCHER,
  BONE_COLLECTOR,
  DEVIANT,
];
