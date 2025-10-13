import { SelectOption } from '@/components/base/form/Select';

export enum GameMove {
  Null,
  Rock,
  Paper,
  Scissors,
  Spock,
  Lizard,
}

const gameMoveIcons: Record<GameMove, string> = {
  [GameMove.Null]: '❓',
  [GameMove.Rock]: '🪨',
  [GameMove.Paper]: '📄',
  [GameMove.Scissors]: '✂️',
  [GameMove.Spock]: '🖖',
  [GameMove.Lizard]: '🦎',
};

export const gameMoveOptions = (
  Object.entries(GameMove).filter(
    ([key]) => isNaN(Number(key)) && key !== 'Null',
  ) as [string, GameMove][]
).map(
  ([key, value]): SelectOption<GameMove> => ({
    label: `${gameMoveIcons[value]} ${key}`,
    value: value,
  }),
);

export enum GameStatus {
  Created,
  C2Selected,
  Finished,
}

export enum GamePlayer {
  Null,
  Player1,
  Player2,
}
