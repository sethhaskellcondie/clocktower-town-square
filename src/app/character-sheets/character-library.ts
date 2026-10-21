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
