import { RSPAbi } from '@/contracts/RSP';
import { getRSPStateQueryKey, RSPState } from '@/hooks/useRSPState';
import useWriteContract from '@/hooks/useWriteContract';
import {
  GameMove,
  gameMoveOptions,
  GamePlayer,
  GameStatus,
} from '@/utils/constants';
import { getBigIntError } from '@/utils/form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Hash } from 'viem';
import Button from '../base/Button';
import FormInput from '../base/form/Input';
import FormSelect from '../base/form/Select';
import Popup from '../base/Popup';

interface GamePlaySolveResultProps {
  currentPlayer: GamePlayer;
  state: RSPState;
}
export default function GamePlaySolveResult({
  currentPlayer,
  state,
}: GamePlaySolveResultProps) {
  const [solveResultPayload, setSolveResultPayload] = useState<Hash | null>(
    null,
  );

  const queryClient = useQueryClient();

  const { writeContract, isPending } = useWriteContract({
    async onSuccess(data) {
      setSolveResultPayload(data);

      await queryClient.invalidateQueries({
        queryKey: getRSPStateQueryKey(state.address),
      });
    },
    onError(error) {
      toast.error(`Failed to solve the game: ${error.message}`, {
        autoClose: false,
      });
    },
  });

  const form = useForm({
    defaultValues: {
      move: GameMove.Rock,
      salt: '',
    },
    onSubmit: ({ value }) => {
      writeContract({
        address: state.address,
        abi: RSPAbi,
        functionName: 'solve',
        args: [value.move, BigInt(value.salt)],
      });
    },
  });

  if (currentPlayer !== GamePlayer.Player1) {
    return null;
  }

  if (state.currentGameStatus !== GameStatus.C2Selected) {
    return (
      <div>
        Waiting for <span className="font-semibold">player 2</span> to make next
        move ...
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">Solve the game:</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit(e);
        }}
        className="flex flex-col gap-4"
      >
        <form.Field name="move">
          {(field) => (
            <FormSelect
              label="Your Game Move"
              field={field}
              options={gameMoveOptions}
            />
          )}
        </form.Field>

        <form.Field
          name="salt"
          validators={{
            onChange: ({ value }) => getBigIntError(value),
          }}
        >
          {(field) => <FormInput label="Salt" field={field} />}
        </form.Field>

        <form.Subscribe>
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending ? 'Processing...' : 'Solve Game'}
          </Button>
        </form.Subscribe>
      </form>

      <Popup
        isOpen={!!solveResultPayload}
        className="w-lg"
        onClose={() => setSolveResultPayload(null)}
      >
        <div className="pt-4">
          The game has been solved! If you won the game, you will receive
          rewards soon.... <br />
          Check the transaction{' '}
          <a
            className="underline text-blue-600 hover:text-blue-400 "
            href={`https://sepolia.etherscan.io/tx/${solveResultPayload}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>{' '}
          to see what happened! 🤓
        </div>
      </Popup>
    </div>
  );
}
