import Button from '@/components/base/Button';
import type { DeployRSPVariables } from '@/hooks/useDeployRSP';
import { GameChoice, gameChoiceOptions } from '@/utils/constants';
import { getAddressError, getAmountError } from '@/utils/form';
import { useForm } from '@tanstack/react-form';
import { isAddress } from 'viem';
import FormInput from '../base/form/Input';
import FormSelect from '../base/form/Select';

export default function GameCreateForm({
  onSubmit,
}: {
  onSubmit: (values: DeployRSPVariables) => Promise<void>;
}) {
  const form = useForm({
    defaultValues: {
      choice: GameChoice.Rock,
      opponentAddress: '',
      amount: 0.01,
    },
    onSubmit: ({ value }) => {
      const trimmedAddress = value.opponentAddress.trim();
      if (!isAddress(trimmedAddress)) {
        return new Error('Invalid address');
      }
      if (getAmountError(value.amount)) {
        return new Error('Invalid amount');
      }

      return onSubmit({
        choice: value.choice,
        opponentAddress: trimmedAddress,
        amount: value.amount.toString(),
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="flex flex-col gap-4">
        <form.Field
          name="choice"
          children={(field) => (
            <FormSelect
              label="Your Game Choice"
              field={field}
              options={gameChoiceOptions}
            />
          )}
        />
        <form.Field
          name="opponentAddress"
          validators={{
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: ({ value }) => getAddressError(value),
          }}
        >
          {(field) => (
            <FormInput
              label="Opponent Address"
              field={field}
              placeholder="Opponent Address"
            />
          )}
        </form.Field>

        <form.Field
          name="amount"
          validators={{
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: ({ value }) => getAmountError(value),
          }}
        >
          {(field) => (
            <FormInput
              label="Amount to Bet"
              type="number"
              step="0.01"
              field={field}
              placeholder="0.05"
            />
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              variant="primary"
              disabled={!canSubmit || isSubmitting}
              type="submit"
            >
              Create New Game
            </Button>
          )}
        />
      </div>
    </form>
  );
}
