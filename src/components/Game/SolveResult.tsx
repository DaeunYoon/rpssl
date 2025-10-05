import { RSPState } from '@/hooks/useRSPState';
import { GamePlayer, GameStatus } from '@/utils/constants';

interface GameSolveResultProps {
  currentPlayer: GamePlayer;
  state: RSPState;
}
export default function GameSolveResult({
  currentPlayer,
  state,
}: GameSolveResultProps) {
  if (currentPlayer !== GamePlayer.Player1) {
    return null;
  }

  if (state.currentGameStatus !== GameStatus.C2Selected) {
    return <div>Waiting for player 2 to make a move ...</div>;
  }

  return <div>Let's select move</div>;
}
