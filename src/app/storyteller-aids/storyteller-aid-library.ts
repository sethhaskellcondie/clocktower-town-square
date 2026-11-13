import { STORYTELLER_AID_COLORS, StorytellerAid } from './storyteller-aid';
import { STORYTELLER_AID_PICTURES } from './storyteller-aid-pictures';

// Every storyteller aid, each created once, in the order the storyteller
// page shows them

export const YOU_ARE_GOOD = new StorytellerAid({
  id: 'you-are-good',
  color: STORYTELLER_AID_COLORS.blue,
  picture: STORYTELLER_AID_PICTURES.goodMask,
  text: ['You', 'are', { emphasis: 'good' }],
});

export const YOU_ARE_EVIL = new StorytellerAid({
  id: 'you-are-evil',
  color: STORYTELLER_AID_COLORS.red,
  picture: STORYTELLER_AID_PICTURES.evilMask,
  text: ['You', 'are', { emphasis: 'evil' }],
});

export const STORYTELLER_AIDS: readonly StorytellerAid[] = [YOU_ARE_GOOD, YOU_ARE_EVIL];
