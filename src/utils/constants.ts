import { SelectOption } from '@/components/base/form/Select';

export enum GameChoice {
  Null,
  Rock,
  Paper,
  Scissors,
  Spock,
  Lizard,
}

const gameChoiceIcons: Record<GameChoice, string> = {
  [GameChoice.Null]: '❓',
  [GameChoice.Rock]: '🪨',
  [GameChoice.Paper]: '📄',
  [GameChoice.Scissors]: '✂️',
  [GameChoice.Spock]: '🖖',
  [GameChoice.Lizard]: '🦎',
};

export const gameChoiceOptions = (
  Object.entries(GameChoice).filter(
    ([key]) => isNaN(Number(key)) && key !== 'Null',
  ) as [string, GameChoice][]
).map(
  ([key, value]): SelectOption<GameChoice> => ({
    label: `${gameChoiceIcons[value]} ${key}`,
    value: value,
  }),
);

export enum GameStatus {
  Created,
  C2Selected,
}

export enum GamePlayer {
  Null,
  Player1,
  Player2,
}
