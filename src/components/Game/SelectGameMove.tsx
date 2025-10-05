import { RSPState } from '@/hooks/useRSPState';
import { GameMove, GamePlayer, GameStatus } from '@/utils/constants';
import { useForm } from '@tanstack/react-form';

interface GameSelectGameMoveProps {
  currentPlayer: GamePlayer;
  state: RSPState;
}
export default function GameSelectGameMove({
  currentPlayer,
  state,
}: GameSelectGameMoveProps) {
  const form = useForm({
    defaultValues: {
      gameMove: GameMove.Rock,
    },
  });

  if (currentPlayer !== GamePlayer.Player2) {
    return null;
  }

  if (state.currentGameStatus !== GameStatus.Created) {
    return <div>Waiting for player 1 to make a move ...</div>;
  }

  return (
    <div>
      <h3 className="font-semibold text-lg">Select your move:</h3>
    </div>
  );
}
