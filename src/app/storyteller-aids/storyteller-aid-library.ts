import { STORYTELLER_AID_CATEGORIES, STORYTELLER_AID_COLORS, StorytellerAid, StorytellerAidCategory } from './storyteller-aid';
import { STORYTELLER_AID_PICTURES } from './storyteller-aid-pictures';

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

export const THESE_CHARACTERS_ARE_IN_PLAY = new StorytellerAid({
  id: 'these-characters-are-in-play',
  category: 'standard',
  color: STORYTELLER_AID_COLORS.teal,
  picture: STORYTELLER_AID_PICTURES.crookedHouse,
  text: ['These', 'characters', 'are', { emphasis: 'in play' }],
});

export const WHICH_ROLE_ARE_YOU_BLUFFING_AS = new StorytellerAid({
  id: 'which-role-are-you-bluffing-as',
  category: 'standard',
  color: STORYTELLER_AID_COLORS.rust,
  picture: STORYTELLER_AID_PICTURES.bluffingMask,
  text: ['Which role', 'are you', { emphasis: 'bluffing' }, 'as?'],
});

export const USE_YOUR_ABILITY = new StorytellerAid({
  id: 'use-your-ability',
  category: 'standard',
  color: STORYTELLER_AID_COLORS.purple,
  picture: STORYTELLER_AID_PICTURES.raven,
  text: ['Use your', { emphasis: 'ability?' }, 'You may', 'decline'],
});

export const PLEASE_CHOOSE_AGAIN = new StorytellerAid({
  id: 'please-choose-again',
  category: 'standard',
  color: STORYTELLER_AID_COLORS.green,
  picture: STORYTELLER_AID_PICTURES.pointingHand,
  text: ['Please', { emphasis: 'choose' }, 'again'],
});

export const WE_SHOULD_CHAT_TOMORROW = new StorytellerAid({
  id: 'we-should-chat-tomorrow',
  category: 'standard',
  color: STORYTELLER_AID_COLORS.mauve,
  picture: STORYTELLER_AID_PICTURES.chatteringMouth,
  text: ['We should', { emphasis: 'chat' }, 'tomorrow'],
});

export const THE_LUNATIC_CHOSE_THESE_PLAYERS = new StorytellerAid({
  id: 'the-lunatic-chose-these-players',
  category: 'character',
  color: STORYTELLER_AID_COLORS.slate,
  picture: STORYTELLER_AID_PICTURES.spiral,
  text: ['The Lunatic', { emphasis: 'chose' }, 'these', 'players'],
});

export const THESE_PLAYERS_ARE_NOT_LEGION = new StorytellerAid({
  id: 'these-players-are-not-legion',
  category: 'character',
  color: STORYTELLER_AID_COLORS.brown,
  picture: STORYTELLER_AID_PICTURES.handprint,
  text: ['These', 'players', { emphasis: 'are not' }, 'Legion'],
});

// Every aid, which the groups below sort by category, keeping to this order
// within each one
const AIDS: readonly StorytellerAid[] = [
  YOU_ARE_GOOD,
  YOU_ARE_EVIL,
  THESE_CHARACTERS_ARE_IN_PLAY,
  WHICH_ROLE_ARE_YOU_BLUFFING_AS,
  USE_YOUR_ABILITY,
  PLEASE_CHOOSE_AGAIN,
  WE_SHOULD_CHAT_TOMORROW,
  THE_LUNATIC_CHOSE_THESE_PLAYERS,
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
