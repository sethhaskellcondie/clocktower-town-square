import { STORYTELLER_AID_CATEGORIES, STORYTELLER_AID_COLORS, StorytellerAid, StorytellerAidCategory } from './storyteller-aid';
import { STORYTELLER_AID_PICTURES } from './storyteller-aid-pictures';
import { BARBER, BARISTA, CERENOVUS, EVIL_TWIN, GOOD_TWIN_ICON, LEGION, LUNATIC } from '../character-sheets/character-library';

// Every storyteller aid, each created once

export const YOU_ARE_GOOD = new StorytellerAid({
  id: 'you-are-good',
  category: 'standard',
  color: STORYTELLER_AID_COLORS.blue,
  picture: STORYTELLER_AID_PICTURES.goodMask,
  text: ['You', 'are', { emphasis: 'good' }],
});

export const YOU_ARE_EVIL = new StorytellerAid({
  id: 'you-are-evil',
  category: 'standard',
  color: STORYTELLER_AID_COLORS.red,
  picture: STORYTELLER_AID_PICTURES.evilMask,
  text: ['You', 'are', { emphasis: 'evil' }],
});

export const THIS_IS_THE_DEMON = new StorytellerAid({
  id: 'this-is-the-demon',
  category: 'standard',
  color: STORYTELLER_AID_COLORS.crimson,
  picture: STORYTELLER_AID_PICTURES.staringEye,
  text: ['This', 'is the', { emphasis: 'demon' }],
});

export const THESE_ARE_YOUR_MINIONS = new StorytellerAid({
  id: 'these-are-your-minions',
  category: 'standard',
  color: STORYTELLER_AID_COLORS.plum,
  picture: STORYTELLER_AID_PICTURES.staringEyes,
  text: ['These', 'are your', { emphasis: 'minions' }],
});

export const THESE_CHARACTERS_ARE_NOT_IN_PLAY = new StorytellerAid({
  id: 'these-characters-are-not-in-play',
  category: 'standard',
  color: STORYTELLER_AID_COLORS.navy,
  picture: STORYTELLER_AID_PICTURES.threeCircles,
  text: ['These', 'characters', ['are', { emphasis: 'not' }], { emphasis: 'in play' }],
});

export const THESE_CHARACTERS_ARE_IN_PLAY = new StorytellerAid({
  id: 'these-characters-are-in-play',
  category: 'standard',
  color: STORYTELLER_AID_COLORS.teal,
  picture: STORYTELLER_AID_PICTURES.twoCircles,
  text: ['These', 'characters', 'are', { emphasis: 'in play' }],
});

export const WHICH_CHARACTER_ARE_YOU_BLUFFING_AS = new StorytellerAid({
  id: 'which-character-are-you-bluffing-as',
  category: 'standard',
  color: STORYTELLER_AID_COLORS.rust,
  picture: STORYTELLER_AID_PICTURES.bluffingMask,
  text: ['Which', 'character', 'are you', { emphasis: 'bluffing' }, 'as?'],
});

export const POINT_AT_YOUR_CHARACTER = new StorytellerAid({
  id: 'point-at-your-character',
  category: 'standard',
  color: STORYTELLER_AID_COLORS.azure,
  picture: STORYTELLER_AID_PICTURES.downArrow,
  text: [{ emphasis: 'Point' }, 'at your', 'character', 'on the', 'sheet'],
});

export const USE_YOUR_ABILITY = new StorytellerAid({
  id: 'use-your-ability',
  category: 'standard',
  color: STORYTELLER_AID_COLORS.purple,
  picture: STORYTELLER_AID_PICTURES.questionMark,
  text: [[{ emphasis: 'Use' }, 'your'], 'once per', 'game', 'ability?'],
});

export const PLEASE_CHOOSE_AGAIN = new StorytellerAid({
  id: 'please-choose-again',
  category: 'standard',
  color: STORYTELLER_AID_COLORS.green,
  picture: STORYTELLER_AID_PICTURES.xMark,
  text: ['Please', { emphasis: 'choose' }, 'again'],
});

export const THIS_CHARACTER_SELECTED_YOU = new StorytellerAid({
  id: 'this-character-selected-you',
  category: 'standard',
  color: STORYTELLER_AID_COLORS.pine,
  picture: STORYTELLER_AID_PICTURES.circles,
  text: ['This', 'character', { emphasis: 'selected' }, 'you'],
});

export const DID_YOU_VOTE_TODAY = new StorytellerAid({
  id: 'did-you-vote-today',
  category: 'standard',
  color: STORYTELLER_AID_COLORS.violet,
  picture: STORYTELLER_AID_PICTURES.raisedHand,
  text: ['Did you', { emphasis: 'vote' }, 'today?'],
});

export const DID_YOU_NOMINATE_TODAY = new StorytellerAid({
  id: 'did-you-nominate-today',
  category: 'standard',
  color: STORYTELLER_AID_COLORS.brown,
  picture: STORYTELLER_AID_PICTURES.chatteringMouth,
  text: ['Did you', { emphasis: 'nominate' }, 'today?'],
});

export const THE_LUNATIC_CHOSE_THESE_PLAYERS = new StorytellerAid({
  id: 'the-lunatic-chose-these-players',
  category: 'character',
  color: STORYTELLER_AID_COLORS.grey,
  icon: LUNATIC.icon,
  text: ['The Lunatic', { emphasis: 'chose' }, 'these', 'players'],
});

export const THE_BARBER_DIED_SWAP_TWO_CHARACTERS = new StorytellerAid({
  id: 'the-barber-died-swap-two-characters',
  category: 'character',
  color: STORYTELLER_AID_COLORS.grey,
  icon: BARBER.icon,
  text: ['The Barber', 'died,', [{ emphasis: 'swap' }, 'two'], 'characters?'],
});

export const YOU_ARE_MAD_THAT_YOU_ARE = new StorytellerAid({
  id: 'you-are-mad-that-you-are',
  category: 'character',
  color: STORYTELLER_AID_COLORS.grey,
  icon: CERENOVUS.icon,
  text: ['You are', { emphasis: 'mad' }, 'that', 'you are'],
});

export const YOU_ARE_THE_GOOD_TWIN = new StorytellerAid({
  id: 'you-are-the-good-twin',
  category: 'character',
  color: STORYTELLER_AID_COLORS.grey,
  icon: GOOD_TWIN_ICON,
  text: ['You are the', { emphasis: 'good twin' }],
  textBelow: ['The', { emphasis: 'evil twin' }, 'is...'],
});

export const THE_GOOD_TWIN_IS = new StorytellerAid({
  id: 'the-good-twin-is',
  category: 'character',
  color: STORYTELLER_AID_COLORS.grey,
  icon: EVIL_TWIN.icon,
  text: ['The', { emphasis: 'good' }, { emphasis: 'twin' }, 'is...'],
});

export const YOU_ARE_SOBER_AND_HEALTHY = new StorytellerAid({
  id: 'you-are-sober-and-healthy',
  category: 'character',
  color: STORYTELLER_AID_COLORS.grey,
  icon: BARISTA.icon,
  text: ['You are', { emphasis: 'sober' }, 'and', { emphasis: 'healthy' }],
});

export const YOU_ACT_TWICE_TODAY = new StorytellerAid({
  id: 'you-act-twice-today',
  category: 'character',
  color: STORYTELLER_AID_COLORS.grey,
  icon: BARISTA.icon,
  text: ['You act', { emphasis: 'twice' }, 'today'],
});

export const THESE_PLAYERS_ARE_NOT_LEGION = new StorytellerAid({
  id: 'these-players-are-not-legion',
  category: 'character',
  color: STORYTELLER_AID_COLORS.grey,
  icon: LEGION.icon,
  text: ['These', 'players', { emphasis: 'are not' }, 'Legion'],
});

// Every aid, which the groups below sort by category, keeping to this order
// within each one
const AIDS: readonly StorytellerAid[] = [
  POINT_AT_YOUR_CHARACTER,
  THIS_IS_THE_DEMON,
  THESE_ARE_YOUR_MINIONS,
  THESE_CHARACTERS_ARE_NOT_IN_PLAY,
  WHICH_CHARACTER_ARE_YOU_BLUFFING_AS,
  PLEASE_CHOOSE_AGAIN,
  THESE_CHARACTERS_ARE_IN_PLAY,
  USE_YOUR_ABILITY,
  YOU_ARE_GOOD,
  YOU_ARE_EVIL,
  THIS_CHARACTER_SELECTED_YOU,
  DID_YOU_VOTE_TODAY,
  DID_YOU_NOMINATE_TODAY,
  THE_LUNATIC_CHOSE_THESE_PLAYERS,
  THE_BARBER_DIED_SWAP_TWO_CHARACTERS,
  YOU_ARE_MAD_THAT_YOU_ARE,
  YOU_ARE_THE_GOOD_TWIN,
  THE_GOOD_TWIN_IS,
  YOU_ARE_SOBER_AND_HEALTHY,
  YOU_ACT_TWICE_TODAY,
  THESE_PLAYERS_ARE_NOT_LEGION,
];

// One category's aids, under its heading
export interface StorytellerAidGroup {
  readonly category: StorytellerAidCategory;
  readonly title: string;
  readonly aids: readonly StorytellerAid[];
}

// The aids category by category, in the order of STORYTELLER_AID_CATEGORIES,
// and within a category in the order they're listed above. A category with
// no aids yet is left out.
export const STORYTELLER_AID_GROUPS: readonly StorytellerAidGroup[] = (
  Object.keys(STORYTELLER_AID_CATEGORIES) as StorytellerAidCategory[]
)
  .map(category => ({
    category,
    title: STORYTELLER_AID_CATEGORIES[category].title,
    aids: AIDS.filter(aid => aid.category === category),
  }))
  .filter(group => group.aids.length > 0);

// Every aid, in the order the storyteller page shows them: the order of the
// groups, so the aids come round in the same order they're listed in
export const STORYTELLER_AIDS: readonly StorytellerAid[] = STORYTELLER_AID_GROUPS.flatMap(group => group.aids);
