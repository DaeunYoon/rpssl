import { RSPAbi } from '@/contracts/RSP';
import { getRSPStateQueryKey, RSPState } from '@/hooks/useRSPState';
import {
  GameMove,
  gameMoveOptions,
  GamePlayer,
  GameStatus,
} from '@/utils/constants';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { formatEther } from 'viem';
import { useAccount, useWriteContract } from 'wagmi';
import Button from '../base/Button';
import FormCheckbox from '../base/form/Checkbox';
import FormSelect from '../base/form/Select';

interface GamePlaySelectGameMoveProps {
  currentPlayer: GamePlayer;
  state: RSPState;
}
export default function GamePlaySelectGameMove({
  currentPlayer,
  state,
}: GamePlaySelectGameMoveProps) {
  const { chain } = useAccount();
  const tokenSymbol = chain?.nativeCurrency.symbol || 'ETH';

  const queryClient = useQueryClient();

  const { writeContract } = useWriteContract({
    mutation: {
      async onSuccess(data) {
        toast.success(`Move selected successfully! Transaction Hash: ${data}`, {
          duration: 5000,
        });

        await queryClient.invalidateQueries({
          queryKey: getRSPStateQueryKey(state.address),
        });
      },
      onError(error) {
        toast.error(`Failed to select move: ${error.message}`);
      },
    },
  });

  const form = useForm({
    defaultValues: {
      move: GameMove.Rock,
      agreeToStake: false,
    },
    onSubmit: ({ value }) => {
      writeContract({
        address: state.address,
        abi: RSPAbi,
        functionName: 'play',
        args: [value.move],
        value: state.stake,
      });
    },
  });

  if (currentPlayer !== GamePlayer.Player2) {
    return null;
  }

  if (state.currentGameStatus !== GameStatus.Created) {
    return (
      <div>
        Waiting for <span className="font-semibold">player 1</span> to make a
        next move ...
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">Select your move:</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit(e);
        }}
        className="flex flex-col gap-4"
      >
        <form.Field
          name="move"
          children={(field) => (
            <FormSelect
              label="Your Game Move"
              field={field}
              options={gameMoveOptions}
            />
          )}
        />

        <form.Field
          name="agreeToStake"
          validators={{
            onChange: ({ value }) =>
              !value &&
              'You must stake to join the game, please read the description and confirm.',
          }}
          children={(field) => (
            <FormCheckbox field={field}>
              <span>
                To join the game you must stake{' '}
                <span className="font-semibold">
                  {formatEther(state.stake)} {tokenSymbol}
                </span>
                . By checking this box you agree to stake this amount to join
                the game. If you win you will receive{' '}
                <span className="font-semibold">
                  {formatEther(state.stake * BigInt(2))} {tokenSymbol}
                </span>
                .
              </span>
            </FormCheckbox>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.isSubmitting]}
          children={([isSubmitting]) => (
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Select move'}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
