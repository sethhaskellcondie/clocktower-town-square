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
  ability: 'On your 1st night, you gain a Townsfolk ability (if good), or a Minion ability (if evil).',
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

// Experimental: Townsfolk
export const ACROBAT = new Character({
  id: 'acrobat',
  name: 'Acrobat',
  icon: 'assets/player_aids/icons/experimental/townsfolk/acrobat.png',
  type: 'Townsfolk',
  ability: 'Each night*, choose a player: if they are or become drunk or poisoned tonight, you die.',
  link: 'https://wiki.bloodontheclocktower.com/Acrobat',
  experimental: true,
});

export const ALCHEMIST = new Character({
  id: 'alchemist',
  name: 'Alchemist',
  icon: 'assets/player_aids/icons/experimental/townsfolk/alchemist.png',
  type: 'Townsfolk',
  ability: 'You have a Minion ability. When using this, the Storyteller may prompt you to choose differently.',
  link: 'https://wiki.bloodontheclocktower.com/Alchemist',
  experimental: true,
});

export const ALSAAHIR = new Character({
  id: 'alsaahir',
  name: 'Alsaahir',
  icon: 'assets/player_aids/icons/experimental/townsfolk/alsaahir.png',
  type: 'Townsfolk',
  ability: 'Each day, if you publicly guess which players are Minion(s) and which are Demon(s), good wins.',
  link: 'https://wiki.bloodontheclocktower.com/Alsaahir',
  experimental: true,
});

export const AMNESIAC = new Character({
  id: 'amnesiac',
  name: 'Amnesiac',
  icon: 'assets/player_aids/icons/experimental/townsfolk/amnesiac.png',
  type: 'Townsfolk',
  ability: 'You do not know what your ability is. Each day, privately guess what it is: you learn how accurate you are.',
  link: 'https://wiki.bloodontheclocktower.com/Amnesiac',
  experimental: true,
});

export const ATHEIST = new Character({
  id: 'atheist',
  name: 'Atheist',
  icon: 'assets/player_aids/icons/experimental/townsfolk/atheist.png',
  type: 'Townsfolk',
  ability: 'The Storyteller can break the game rules, and if executed, good wins, even if you are dead. [No evil characters]',
  link: 'https://wiki.bloodontheclocktower.com/Atheist',
  experimental: true,
});

export const BALLOONIST = new Character({
  id: 'balloonist',
  name: 'Balloonist',
  icon: 'assets/player_aids/icons/experimental/townsfolk/balloonist.png',
  type: 'Townsfolk',
  ability: 'Each night, you learn a player of a different character type than last night. [+0 or +1 Outsider]',
  link: 'https://wiki.bloodontheclocktower.com/Balloonist',
  experimental: true,
});

export const BANSHEE = new Character({
  id: 'banshee',
  name: 'Banshee',
  icon: 'assets/player_aids/icons/experimental/townsfolk/banshee.png',
  type: 'Townsfolk',
  ability: 'If the Demon kills you, all players learn this. From now on, you may nominate twice per day and vote twice per nomination.',
  link: 'https://wiki.bloodontheclocktower.com/Banshee',
  experimental: true,
});

export const BOUNTY_HUNTER = new Character({
  id: 'bounty-hunter',
  name: 'Bounty Hunter',
  icon: 'assets/player_aids/icons/experimental/townsfolk/bounty_hunter.png',
  type: 'Townsfolk',
  ability: 'You start knowing 1 evil player. If the player you know dies, you learn another evil player tonight. [1 Townsfolk is evil]',
  link: 'https://wiki.bloodontheclocktower.com/Bounty_Hunter',
  experimental: true,
});

export const CANNIBAL = new Character({
  id: 'cannibal',
  name: 'Cannibal',
  icon: 'assets/player_aids/icons/experimental/townsfolk/cannibal.png',
  type: 'Townsfolk',
  ability: 'You have the ability of the recently killed executee. If they are evil, you are poisoned until a good player dies by execution.',
  link: 'https://wiki.bloodontheclocktower.com/Cannibal',
  experimental: true,
});

export const CHOIRBOY = new Character({
  id: 'choirboy',
  name: 'Choirboy',
  icon: 'assets/player_aids/icons/experimental/townsfolk/choirboy.png',
  type: 'Townsfolk',
  ability: 'If the Demon kills the King, you learn which player is the Demon. [+the King]',
  link: 'https://wiki.bloodontheclocktower.com/Choirboy',
  experimental: true,
});

export const CULT_LEADER = new Character({
  id: 'cult-leader',
  name: 'Cult Leader',
  icon: 'assets/player_aids/icons/experimental/townsfolk/cult_leader.png',
  type: 'Townsfolk',
  ability: 'Each night, you become the alignment of an alive neighbor. If all good players choose to join your cult, your team wins.',
  link: 'https://wiki.bloodontheclocktower.com/Cult_Leader',
  experimental: true,
});

export const ENGINEER = new Character({
  id: 'engineer',
  name: 'Engineer',
  icon: 'assets/player_aids/icons/experimental/townsfolk/engineer.png',
  type: 'Townsfolk',
  ability: 'Once per game, at night, choose which Minions or which Demon is in play.',
  link: 'https://wiki.bloodontheclocktower.com/Engineer',
  experimental: true,
});

export const FARMER = new Character({
  id: 'farmer',
  name: 'Farmer',
  icon: 'assets/player_aids/icons/experimental/townsfolk/farmer.png',
  type: 'Townsfolk',
  ability: 'When you die at night, an alive good player becomes a Farmer.',
  link: 'https://wiki.bloodontheclocktower.com/Farmer',
  experimental: true,
});

export const FISHERMAN = new Character({
  id: 'fisherman',
  name: 'Fisherman',
  icon: 'assets/player_aids/icons/experimental/townsfolk/fisherman.png',
  type: 'Townsfolk',
  ability: 'Once per game, during the day, visit the Storyteller for some advice to help your team win.',
  link: 'https://wiki.bloodontheclocktower.com/Fisherman',
  experimental: true,
});

export const GENERAL = new Character({
  id: 'general',
  name: 'General',
  icon: 'assets/player_aids/icons/experimental/townsfolk/general.png',
  type: 'Townsfolk',
  ability: 'Each night, you learn which alignment the Storyteller believes is winning: good, evil, or neither.',
  link: 'https://wiki.bloodontheclocktower.com/General',
  experimental: true,
});

export const HIGH_PRIESTESS = new Character({
  id: 'high-priestess',
  name: 'High Priestess',
  icon: 'assets/player_aids/icons/experimental/townsfolk/high_priestess.png',
  type: 'Townsfolk',
  ability: 'Each night, learn which player the Storyteller believes you should talk to most.',
  link: 'https://wiki.bloodontheclocktower.com/High_Priestess',
  experimental: true,
});

export const HUNTSMAN = new Character({
  id: 'huntsman',
  name: 'Huntsman',
  icon: 'assets/player_aids/icons/experimental/townsfolk/huntsman.png',
  type: 'Townsfolk',
  ability: 'Once per game, at night, choose a living player: the Damsel, if chosen, becomes a not-in-play Townsfolk. [+the Damsel]',
  link: 'https://wiki.bloodontheclocktower.com/Huntsman',
  experimental: true,
});

export const KING = new Character({
  id: 'king',
  name: 'King',
  icon: 'assets/player_aids/icons/experimental/townsfolk/king.png',
  type: 'Townsfolk',
  ability: 'Each night, if the dead equal or outnumber the living, you learn 1 alive character. The Demon knows you are the King.',
  link: 'https://wiki.bloodontheclocktower.com/King',
  experimental: true,
});

export const KNIGHT = new Character({
  id: 'knight',
  name: 'Knight',
  icon: 'assets/player_aids/icons/experimental/townsfolk/knight.png',
  type: 'Townsfolk',
  ability: 'You start knowing 2 players that are not the Demon.',
  link: 'https://wiki.bloodontheclocktower.com/Knight',
  experimental: true,
});

export const LYCANTHROPE = new Character({
  id: 'lycanthrope',
  name: 'Lycanthrope',
  icon: 'assets/player_aids/icons/experimental/townsfolk/lycanthrope.png',
  type: 'Townsfolk',
  ability: "Each night*, choose an alive player. If good, they die & the Demon doesn't kill tonight. One good player registers as evil.",
  link: 'https://wiki.bloodontheclocktower.com/Lycanthrope',
  experimental: true,
});

export const MAGICIAN = new Character({
  id: 'magician',
  name: 'Magician',
  icon: 'assets/player_aids/icons/experimental/townsfolk/magician.png',
  type: 'Townsfolk',
  ability: 'The Demon thinks you are a Minion. Minions think you are a Demon.',
  link: 'https://wiki.bloodontheclocktower.com/Magician',
  experimental: true,
});

export const NIGHTWATCHMAN = new Character({
  id: 'nightwatchman',
  name: 'Nightwatchman',
  icon: 'assets/player_aids/icons/experimental/townsfolk/nightwatchman.png',
  type: 'Townsfolk',
  ability: 'Once per game, at night, choose a player: they learn you are the Nightwatchman.',
  link: 'https://wiki.bloodontheclocktower.com/Nightwatchman',
  experimental: true,
});

export const NOBLE = new Character({
  id: 'noble',
  name: 'Noble',
  icon: 'assets/player_aids/icons/experimental/townsfolk/noble.png',
  type: 'Townsfolk',
  ability: 'You start knowing 3 players, 1 and only 1 of which is evil.',
  link: 'https://wiki.bloodontheclocktower.com/Noble',
  experimental: true,
});

export const PIXIE = new Character({
  id: 'pixie',
  name: 'Pixie',
  icon: 'assets/player_aids/icons/experimental/townsfolk/pixie.png',
  type: 'Townsfolk',
  ability: 'You start knowing 1 in-play Townsfolk. If you were mad that you were this character, you gain their ability when they die.',
  link: 'https://wiki.bloodontheclocktower.com/Pixie',
  experimental: true,
});

export const POPPY_GROWER = new Character({
  id: 'poppy-grower',
  name: 'Poppy Grower',
  icon: 'assets/player_aids/icons/experimental/townsfolk/poppy_grower.png',
  type: 'Townsfolk',
  ability: 'Minions & Demons do not know each other. If you die, they learn who each other are that night.',
  link: 'https://wiki.bloodontheclocktower.com/Poppy_Grower',
  experimental: true,
});

export const PREACHER = new Character({
  id: 'preacher',
  name: 'Preacher',
  icon: 'assets/player_aids/icons/experimental/townsfolk/preacher.png',
  type: 'Townsfolk',
  ability: 'Each night, choose a player: a Minion, if chosen, learns this. All chosen Minions have no ability.',
  link: 'https://wiki.bloodontheclocktower.com/Preacher',
  experimental: true,
});

export const PRINCESS = new Character({
  id: 'princess',
  name: 'Princess',
  icon: 'assets/player_aids/icons/experimental/townsfolk/princess.png',
  type: 'Townsfolk',
  ability: "On your 1st day, if you nominated & executed a player, the Demon doesn't kill tonight.",
  link: 'https://wiki.bloodontheclocktower.com/Princess',
  experimental: true,
});

export const SHUGENJA = new Character({
  id: 'shugenja',
  name: 'Shugenja',
  icon: 'assets/player_aids/icons/experimental/townsfolk/shugenja.png',
  type: 'Townsfolk',
  ability: 'You start knowing if your closest evil player is clockwise or anti-clockwise. If equidistant, this info is arbitrary.',
  link: 'https://wiki.bloodontheclocktower.com/Shugenja',
  experimental: true,
});

export const STEWARD = new Character({
  id: 'steward',
  name: 'Steward',
  icon: 'assets/player_aids/icons/experimental/townsfolk/steward.png',
  type: 'Townsfolk',
  ability: 'You start knowing 1 good player.',
  link: 'https://wiki.bloodontheclocktower.com/Steward',
  experimental: true,
});

export const VILLAGE_IDIOT = new Character({
  id: 'village-idiot',
  name: 'Village Idiot',
  icon: 'assets/player_aids/icons/experimental/townsfolk/village_idiot.png',
  type: 'Townsfolk',
  ability: 'Each night, choose a player: you learn their alignment. [+0 to +2 Village Idiots. 1 of the extras is drunk]',
  link: 'https://wiki.bloodontheclocktower.com/Village_Idiot',
  experimental: true,
});

// Experimental: Outsiders
export const DAMSEL = new Character({
  id: 'damsel',
  name: 'Damsel',
  icon: 'assets/player_aids/icons/experimental/outsiders/damsel.png',
  type: 'Outsider',
  ability: 'All Minions know a Damsel is in play. If a Minion publicly guesses you (once), your team loses.',
  link: 'https://wiki.bloodontheclocktower.com/Damsel',
  experimental: true,
});

export const GOLEM = new Character({
  id: 'golem',
  name: 'Golem',
  icon: 'assets/player_aids/icons/experimental/outsiders/golem.png',
  type: 'Outsider',
  ability: 'You may only nominate once per game. When you do, if the nominee is not the Demon, they die.',
  link: 'https://wiki.bloodontheclocktower.com/Golem',
  experimental: true,
});

export const HATTER = new Character({
  id: 'hatter',
  name: 'Hatter',
  icon: 'assets/player_aids/icons/experimental/outsiders/hatter.png',
  type: 'Outsider',
  ability: 'If you died today or tonight, the Minion & Demon players may choose new Minion & Demon characters to be.',
  link: 'https://wiki.bloodontheclocktower.com/Hatter',
  experimental: true,
});

export const HERETIC = new Character({
  id: 'heretic',
  name: 'Heretic',
  icon: 'assets/player_aids/icons/experimental/outsiders/heretic.png',
  type: 'Outsider',
  ability: 'Whoever wins, loses & whoever loses, wins, even if you are dead.',
  link: 'https://wiki.bloodontheclocktower.com/Heretic',
  experimental: true,
});

export const HERMIT = new Character({
  id: 'hermit',
  name: 'Hermit',
  icon: 'assets/player_aids/icons/experimental/outsiders/hermit.png',
  type: 'Outsider',
  ability: 'You have all Outsider abilities. [-0 or -1 Outsider]',
  link: 'https://wiki.bloodontheclocktower.com/Hermit',
  experimental: true,
});

export const OGRE = new Character({
  id: 'ogre',
  name: 'Ogre',
  icon: 'assets/player_aids/icons/experimental/outsiders/ogre.png',
  type: 'Outsider',
  ability: "On your 1st night, choose a player (not yourself): you become their alignment (you don't know which) even if drunk or poisoned.",
  link: 'https://wiki.bloodontheclocktower.com/Ogre',
  experimental: true,
});

export const PLAGUE_DOCTOR = new Character({
  id: 'plague-doctor',
  name: 'Plague Doctor',
  icon: 'assets/player_aids/icons/experimental/outsiders/plague_doctor.png',
  type: 'Outsider',
  ability: 'When you die, the Storyteller gains a Minion ability.',
  link: 'https://wiki.bloodontheclocktower.com/Plague_Doctor',
  experimental: true,
});

export const POLITICIAN = new Character({
  id: 'politician',
  name: 'Politician',
  icon: 'assets/player_aids/icons/experimental/outsiders/politician.png',
  type: 'Outsider',
  ability: 'If you were the player most responsible for your team losing, you change alignment & win, even if dead.',
  link: 'https://wiki.bloodontheclocktower.com/Politician',
  experimental: true,
});

export const PUZZLEMASTER = new Character({
  id: 'puzzlemaster',
  name: 'Puzzlemaster',
  icon: 'assets/player_aids/icons/experimental/outsiders/puzzlemaster.png',
  type: 'Outsider',
  ability: '1 player is drunk, even if you die. If you guess (once) who it is, learn the Demon player, but guess wrong & get false info.',
  link: 'https://wiki.bloodontheclocktower.com/Puzzlemaster',
  experimental: true,
});

export const SNITCH = new Character({
  id: 'snitch',
  name: 'Snitch',
  icon: 'assets/player_aids/icons/experimental/outsiders/snitch.png',
  type: 'Outsider',
  ability: 'Each Minion gets 3 bluffs.',
  link: 'https://wiki.bloodontheclocktower.com/Snitch',
  experimental: true,
});

export const ZEALOT = new Character({
  id: 'zealot',
  name: 'Zealot',
  icon: 'assets/player_aids/icons/experimental/outsiders/zealot.png',
  type: 'Outsider',
  ability: 'If there are 5 or more players alive, you must vote for every nomination.',
  link: 'https://wiki.bloodontheclocktower.com/Zealot',
  experimental: true,
});

// Experimental: Minions
export const BOFFIN = new Character({
  id: 'boffin',
  name: 'Boffin',
  icon: 'assets/player_aids/icons/experimental/minions/boffin.png',
  type: 'Minion',
  ability: "The Demon (even if drunk or poisoned) has a not-in-play good character's ability. You both know which.",
  link: 'https://wiki.bloodontheclocktower.com/Boffin',
  experimental: true,
});

export const BOOMDANDY = new Character({
  id: 'boomdandy',
  name: 'Boomdandy',
  icon: 'assets/player_aids/icons/experimental/minions/boomdandy.png',
  type: 'Minion',
  ability: 'If you are executed, all but 3 players die. After a 10 to 1 countdown, the player with the most players pointing at them, dies.',
  link: 'https://wiki.bloodontheclocktower.com/Boomdandy',
  experimental: true,
});

export const FEARMONGER = new Character({
  id: 'fearmonger',
  name: 'Fearmonger',
  icon: 'assets/player_aids/icons/experimental/minions/fearmonger.png',
  type: 'Minion',
  ability: 'Each night, choose a player: if you nominate & execute them, their team loses. All players know if you choose a new player.',
  link: 'https://wiki.bloodontheclocktower.com/Fearmonger',
  experimental: true,
});

export const GOBLIN = new Character({
  id: 'goblin',
  name: 'Goblin',
  icon: 'assets/player_aids/icons/experimental/minions/goblin.png',
  type: 'Minion',
  ability: 'If you publicly claim to be the Goblin when nominated & are executed that day, your team wins.',
  link: 'https://wiki.bloodontheclocktower.com/Goblin',
  experimental: true,
});

export const HARPY = new Character({
  id: 'harpy',
  name: 'Harpy',
  icon: 'assets/player_aids/icons/experimental/minions/harpy.png',
  type: 'Minion',
  ability: 'Each night, choose 2 players: tomorrow, the 1st player is mad that the 2nd is evil, or one or both might die.',
  link: 'https://wiki.bloodontheclocktower.com/Harpy',
  experimental: true,
});

export const MARIONETTE = new Character({
  id: 'marionette',
  name: 'Marionette',
  icon: 'assets/player_aids/icons/experimental/minions/marionette.png',
  type: 'Minion',
  ability: 'You think you are a good character, but you are not. The Demon knows who you are. [You neighbor the Demon]',
  link: 'https://wiki.bloodontheclocktower.com/Marionette',
  experimental: true,
});

export const MEZEPHELES = new Character({
  id: 'mezepheles',
  name: 'Mezepheles',
  icon: 'assets/player_aids/icons/experimental/minions/mezepheles.png',
  type: 'Minion',
  ability: 'You start knowing a secret word. The 1st good player to say this word becomes evil that night.',
  link: 'https://wiki.bloodontheclocktower.com/Mezepheles',
  experimental: true,
});

export const ORGAN_GRINDER = new Character({
  id: 'organ-grinder',
  name: 'Organ Grinder',
  icon: 'assets/player_aids/icons/experimental/minions/organ_grinder.png',
  type: 'Minion',
  ability: 'All players keep their eyes closed when voting and the vote tally is secret. Each night, choose if you are drunk until dusk.',
  link: 'https://wiki.bloodontheclocktower.com/Organ_Grinder',
  experimental: true,
});

export const PSYCHOPATH = new Character({
  id: 'psychopath',
  name: 'Psychopath',
  icon: 'assets/player_aids/icons/experimental/minions/psychopath.png',
  type: 'Minion',
  ability: 'Each day, before nominations, you may publicly choose a player: they die. If executed, you only die if you lose roshambo.',
  link: 'https://wiki.bloodontheclocktower.com/Psychopath',
  experimental: true,
});

export const SUMMONER = new Character({
  id: 'summoner',
  name: 'Summoner',
  icon: 'assets/player_aids/icons/experimental/minions/summoner.png',
  type: 'Minion',
  ability: 'You get 3 bluffs. On the 3rd night, choose a player: they become an evil Demon of your choice. [No Demon]',
  link: 'https://wiki.bloodontheclocktower.com/Summoner',
  experimental: true,
});

export const VIZIER = new Character({
  id: 'vizier',
  name: 'Vizier',
  icon: 'assets/player_aids/icons/experimental/minions/vizier.png',
  type: 'Minion',
  ability: 'All players know you are the Vizier. You cannot die during the day. If good voted, you may choose to execute immediately.',
  link: 'https://wiki.bloodontheclocktower.com/Vizier',
  experimental: true,
});

export const WIDOW = new Character({
  id: 'widow',
  name: 'Widow',
  icon: 'assets/player_aids/icons/experimental/minions/widow.png',
  type: 'Minion',
  ability: 'On your 1st night, look at the Grimoire & choose a player: they are poisoned. 1 good player knows a Widow is in play.',
  link: 'https://wiki.bloodontheclocktower.com/Widow',
  experimental: true,
});

export const WIZARD = new Character({
  id: 'wizard',
  name: 'Wizard',
  icon: 'assets/player_aids/icons/experimental/minions/wizard.png',
  type: 'Minion',
  ability: 'Once per game, choose to make a wish. If granted, it might have a price & leave a clue as to its nature.',
  link: 'https://wiki.bloodontheclocktower.com/Wizard',
  experimental: true,
});

export const WRAITH = new Character({
  id: 'wraith',
  name: 'Wraith',
  icon: 'assets/player_aids/icons/experimental/minions/wraith.png',
  type: 'Minion',
  ability: 'You may choose to open your eyes at night. You wake when other evil players do.',
  link: 'https://wiki.bloodontheclocktower.com/Wraith',
  experimental: true,
});

export const XAAN = new Character({
  id: 'xaan',
  name: 'Xaan',
  icon: 'assets/player_aids/icons/experimental/minions/xaan.png',
  type: 'Minion',
  ability: 'On night X, all Townsfolk are poisoned until dusk. [X Outsiders]',
  link: 'https://wiki.bloodontheclocktower.com/Xaan',
  experimental: true,
});

// Experimental: Demons
export const AL_HADIKHIA = new Character({
  id: 'al-hadikhia',
  name: 'Al-Hadikhia',
  icon: 'assets/player_aids/icons/experimental/demons/al_hadikhia.png',
  type: 'Demon',
  ability: 'Each night*, you may choose 3 players (all players learn who): each silently chooses to live or die, but if all live, all die.',
  link: 'https://wiki.bloodontheclocktower.com/Al-Hadikhia',
  experimental: true,
});

export const KAZALI = new Character({
  id: 'kazali',
  name: 'Kazali',
  icon: 'assets/player_aids/icons/experimental/demons/kazali.png',
  type: 'Demon',
  ability: 'Each night*, choose a player: they die. [You choose which players are which Minions. -? to +? Outsiders]',
  link: 'https://wiki.bloodontheclocktower.com/Kazali',
  experimental: true,
});

export const LEGION = new Character({
  id: 'legion',
  name: 'Legion',
  icon: 'assets/player_aids/icons/experimental/demons/legion.png',
  type: 'Demon',
  ability: 'Each night*, a player might die. Executions fail if only evil voted. You register as a Minion too. [Most players are Legion]',
  link: 'https://wiki.bloodontheclocktower.com/Legion',
  experimental: true,
});

export const LEVIATHAN = new Character({
  id: 'leviathan',
  name: 'Leviathan',
  icon: 'assets/player_aids/icons/experimental/demons/leviathan.png',
  type: 'Demon',
  ability: 'If more than 1 good player is executed, evil wins. All players know you are in play. After day 5, evil wins.',
  link: 'https://wiki.bloodontheclocktower.com/Leviathan',
  experimental: true,
});

export const LIL_MONSTA = new Character({
  id: 'lil-monsta',
  name: "Lil' Monsta",
  icon: 'assets/player_aids/icons/experimental/demons/lil_monsta.png',
  type: 'Demon',
  ability: 'Each night, Minions choose who babysits Lil\' Monsta & "is the Demon". Each night*, a player might die. [+1 Minion]',
  link: "https://wiki.bloodontheclocktower.com/Lil'_Monsta",
  experimental: true,
});

export const LLEECH = new Character({
  id: 'lleech',
  name: 'Lleech',
  icon: 'assets/player_aids/icons/experimental/demons/lleech.png',
  type: 'Demon',
  ability: 'Each night*, choose a player: they die. You start by choosing a player: they are poisoned. You die if & only if they are dead.',
  link: 'https://wiki.bloodontheclocktower.com/Lleech',
  experimental: true,
});

export const LORD_OF_TYPHON = new Character({
  id: 'lord-of-typhon',
  name: 'Lord of Typhon',
  icon: 'assets/player_aids/icons/experimental/demons/lord_of_typhon.png',
  type: 'Demon',
  ability: 'Each night*, choose a player: they die. [Evil characters are in a line. You are in the middle. +1 Minion. -? to +? Outsiders]',
  link: 'https://wiki.bloodontheclocktower.com/Lord_of_Typhon',
  experimental: true,
});

export const OJO = new Character({
  id: 'ojo',
  name: 'Ojo',
  icon: 'assets/player_aids/icons/experimental/demons/ojo.png',
  type: 'Demon',
  ability: 'Each night*, choose a character: they die. If they are not in play, the Storyteller chooses who dies.',
  link: 'https://wiki.bloodontheclocktower.com/Ojo',
  experimental: true,
});

export const RIOT = new Character({
  id: 'riot',
  name: 'Riot',
  icon: 'assets/player_aids/icons/experimental/demons/riot.png',
  type: 'Demon',
  ability: 'On day 3, Minions become Riot & nominees die but nominate an alive player immediately. This must happen.',
  link: 'https://wiki.bloodontheclocktower.com/Riot',
  experimental: true,
});

export const YAGGABABBLE = new Character({
  id: 'yaggababble',
  name: 'Yaggababble',
  icon: 'assets/player_aids/icons/experimental/demons/yaggababble.png',
  type: 'Demon',
  ability: 'You start knowing a secret phrase. For each time you said it publicly today, a player might die.',
  link: 'https://wiki.bloodontheclocktower.com/Yaggababble',
  experimental: true,
});

// Experimental: Travelers
export const CACKLEJACK = new Character({
  id: 'cacklejack',
  name: 'Cacklejack',
  icon: 'assets/player_aids/icons/experimental/travelers/cacklejack.png',
  type: 'Traveler',
  ability: 'Each day, choose a player: a different player changes character tonight.',
  link: 'https://wiki.bloodontheclocktower.com/Cacklejack',
  experimental: true,
});

export const GANGSTER = new Character({
  id: 'gangster',
  name: 'Gangster',
  icon: 'assets/player_aids/icons/experimental/travelers/gangster.png',
  type: 'Traveler',
  ability: 'Once per day, you may choose to kill an alive neighbor, if your other alive neighbor agrees.',
  link: 'https://wiki.bloodontheclocktower.com/Gangster',
  experimental: true,
});

export const GNOME = new Character({
  id: 'gnome',
  name: 'Gnome',
  icon: 'assets/player_aids/icons/experimental/travelers/gnome.png',
  type: 'Traveler',
  ability: 'All players start knowing a player of your alignment. You may choose to kill anyone who nominates them.',
  link: 'https://wiki.bloodontheclocktower.com/Gnome',
  experimental: true,
});

// Every experimental character. They have no character sheet of their own,
// so each type is in alphabetical order, with the travelers after.
export const EXPERIMENTAL_CHARACTERS: readonly Character[] = [
  ACROBAT,
  ALCHEMIST,
  ALSAAHIR,
  AMNESIAC,
  ATHEIST,
  BALLOONIST,
  BANSHEE,
  BOUNTY_HUNTER,
  CANNIBAL,
  CHOIRBOY,
  CULT_LEADER,
  ENGINEER,
  FARMER,
  FISHERMAN,
  GENERAL,
  HIGH_PRIESTESS,
  HUNTSMAN,
  KING,
  KNIGHT,
  LYCANTHROPE,
  MAGICIAN,
  NIGHTWATCHMAN,
  NOBLE,
  PIXIE,
  POPPY_GROWER,
  PREACHER,
  PRINCESS,
  SHUGENJA,
  STEWARD,
  VILLAGE_IDIOT,
  DAMSEL,
  GOLEM,
  HATTER,
  HERETIC,
  HERMIT,
  OGRE,
  PLAGUE_DOCTOR,
  POLITICIAN,
  PUZZLEMASTER,
  SNITCH,
  ZEALOT,
  BOFFIN,
  BOOMDANDY,
  FEARMONGER,
  GOBLIN,
  HARPY,
  MARIONETTE,
  MEZEPHELES,
  ORGAN_GRINDER,
  PSYCHOPATH,
  SUMMONER,
  VIZIER,
  WIDOW,
  WIZARD,
  WRAITH,
  XAAN,
  AL_HADIKHIA,
  KAZALI,
  LEGION,
  LEVIATHAN,
  LIL_MONSTA,
  LLEECH,
  LORD_OF_TYPHON,
  OJO,
  RIOT,
  YAGGABABBLE,
  CACKLEJACK,
  GANGSTER,
  GNOME,
];
