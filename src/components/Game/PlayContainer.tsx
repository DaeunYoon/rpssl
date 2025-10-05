import type { RSPState } from '@/hooks/useRSPState';
import { GamePlayer, GameStatus } from '@/utils/constants';
import { checkGamePlayer, checkGameStatus } from '@/utils/game';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import Button from '../base/Button';
import GamePlayTimeOut from './PlayTimeOut';

export default function GamePlayContainer({ state }: { state: RSPState }) {
  const { address: userAddress } = useAccount();
  const currentPlayer: GamePlayer = checkGamePlayer(state, userAddress);
  const router = useRouter();

  if (userAddress === undefined) {
    return (
      <p className="text-red-500">
        You need to connect your wallet to play RPSSL!
      </p>
    );
  }

  if (currentPlayer === GamePlayer.Null) {
    return (
      <div className="flex flex-col gap-4">
        You are not a player in this game 👀 Do you want to create a new game?
        <Button
          variant="primary"
          className="ml-2 w-64"
          onClick={() => router.push('/')}
        >
          Create Game ✏️
        </Button>
      </div>
    );
  }

  const currentGameStatus: GameStatus = checkGameStatus(state);
  const isStakeEmpty = state.stake === BigInt(0);

  return (
    <div className="flex flex-col gap-2">
      {isStakeEmpty && (
        <div className="p-2 text-neutral-800 border rounded-lg border-neutral-500">
          ⚠️ There is no stake in this game. This usually means the game has
          already finished, or it was created without any ETH at stake.
          <br /> Please note{' '}
          <span className="font-semibold">
            winning this game will not reward you with any ETH.
          </span>
        </div>
      )}

      <GamePlayTimeOut
        state={state}
        currentPlayer={currentPlayer}
        currentGameStatus={currentGameStatus}
      />

      <h4 className="font-semibold">Next action waiting for you!</h4>
      {currentPlayer === GamePlayer.Player1 ? (
        currentGameStatus === GameStatus.C2Selected ? (
          <p>Solve</p>
        ) : (
          'Waiting for player 2 to make a move ...'
        )
      ) : currentGameStatus === GameStatus.Created ? (
        <p>Join</p>
      ) : (
        'Waiting for player 1 to make a move ...'
      )}
    </div>
  );
}
