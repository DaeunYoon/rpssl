import { RSPAbi } from '@/contracts/RSP';
import { getRSPStateQueryKey, type RSPState } from '@/hooks/useRSPState';
import { convertSecondsToMinutes } from '@/utils';
import { GamePlayer, GameStatus } from '@/utils/constants';
import { checkGameTimeOut } from '@/utils/game';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Address } from 'viem';
import { Config, useWriteContract } from 'wagmi';
import { WriteContractMutate } from 'wagmi/query';
import Button from '../base/Button';

interface GamePlayTimeOutProps {
  state: RSPState;
  currentPlayer: GamePlayer;
}

export default function GamePlayTimeOut({
  state,
  currentPlayer,
}: GamePlayTimeOutProps) {
  const isStakeEmpty = state.stake === BigInt(0);
  const isTimeOut = checkGameTimeOut(state);
  const timeOutInMinutes = convertSecondsToMinutes(state.TIMEOUT);
  const queryClient = useQueryClient();

  const { writeContract, isPending } = useWriteContract({
    mutation: {
      async onSuccess(data) {
        toast.success(
          `Time out called successfully! Transaction Hash: ${data}`,
          { duration: 5000 },
        );

        await queryClient.invalidateQueries({
          queryKey: getRSPStateQueryKey(state.address),
        });
      },
      onError(error) {
        toast.error(`Failed to call time out: ${error.message}`);
      },
    },
  });

  if (currentPlayer === GamePlayer.Null || isStakeEmpty || !isTimeOut) {
    return null;
  }

  return (
    <div className="p-2 text-neutral-800 border rounded-lg border-neutral-500">
      ⚠️ It's been more than {timeOutInMinutes} minutes since the last action.
      <br />
      {currentPlayer === GamePlayer.Player1 ? (
        <Player1TimeOut
          address={state.address}
          currentGameStatus={state.currentGameStatus}
          writeContract={writeContract}
          isPending={isPending}
        />
      ) : (
        <Player2TimeOut
          address={state.address}
          currentGameStatus={state.currentGameStatus}
          writeContract={writeContract}
          isPending={isPending}
        />
      )}
    </div>
  );
}

interface PlayerTimeOutProps {
  address: Address;
  currentGameStatus: GameStatus;
  writeContract: WriteContractMutate<Config, unknown>;
  isPending: boolean;
}

function Player1TimeOut({
  address,
  currentGameStatus,
  writeContract,
  isPending,
}: PlayerTimeOutProps) {
  if (currentGameStatus === GameStatus.Created) {
    return (
      <div className="flex flex-col gap-2">
        You can withdraw all stake.
        <Button
          className="max-w-62"
          onClick={() =>
            writeContract({
              address,
              abi: RSPAbi,
              functionName: 'j2Timeout',
              args: [],
            })
          }
          disabled={isPending}
        >
          Call time out
        </Button>
      </div>
    );
  }
  return <div>Now, player 2 can withdraw all stake! Please make a move!</div>;
}

function Player2TimeOut({
  address,
  currentGameStatus,
  writeContract,
  isPending,
}: PlayerTimeOutProps) {
  if (currentGameStatus === GameStatus.C2Selected) {
    return (
      <div className="flex gap-2">
        You can withdraw your stake.
        <Button
          className="max-w-62"
          onClick={() =>
            writeContract({
              address,
              abi: RSPAbi,
              functionName: 'j1Timeout',
              args: [],
            })
          }
          disabled={isPending}
        >
          Call time out
        </Button>
      </div>
    );
  }
  return <div>Now, player 1 can withdraw their stake! Please make a move!</div>;
}
