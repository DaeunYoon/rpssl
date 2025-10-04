import type { RSPState } from '@/hooks/useRSPState';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import Button from '../base/Button';

export default function GamePlayContainer({ state }: { state: RSPState }) {
  const { address: userAddress } = useAccount();
  const isUserPlayer1 = userAddress === state?.player1;
  const isUserPlayer2 = userAddress === state?.player2;
  const router = useRouter();

  if (userAddress === undefined) {
    return (
      <p className="text-red-500">
        You need to connect your wallet to play RPSSL!
      </p>
    );
  }

  if (!isUserPlayer1 && !isUserPlayer2) {
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

  return (
    <div className="flex flex-col gap-2">
      {state.stake !== BigInt(0) && (
        <div className="p-2 text-neutral-800 border rounded-lg border-neutral-500">
          ⚠️ There is no stake in this game. This usually means the game has
          already finished, or it was created without any ETH at stake.
          <br /> Please note{' '}
          <span className="font-semibold">
            winning this game will not reward you with any ETH.
          </span>
        </div>
      )}

      {isUserPlayer1 && <p></p>}
      {isUserPlayer2 && (
        <p>You are Player 2. Please wait for Player 1 to join.</p>
      )}
    </div>
  );
}
