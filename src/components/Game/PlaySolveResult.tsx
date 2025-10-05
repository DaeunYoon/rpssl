import { RSPState } from '@/hooks/useRSPState';
import { GamePlayer, GameStatus } from '@/utils/constants';

interface GamePlaySolveResultProps {
  currentPlayer: GamePlayer;
  state: RSPState;
}
export default function GamePlaySolveResult({
  currentPlayer,
  state,
}: GamePlaySolveResultProps) {
  if (currentPlayer !== GamePlayer.Player1) {
    return null;
  }

  if (state.currentGameStatus !== GameStatus.C2Selected) {
    return (
      <div>
        Waiting for <span className="font-semibold">player 2</span> to make a
      </div>
    );
  }

  return <div>Let's select move</div>;
}
