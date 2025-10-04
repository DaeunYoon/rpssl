import Button from '@/components/base/Button';
import type { DeployRSPVariables } from '@/hooks/useDeployRSP';
import { useEstimateFeeDeployRSP } from '@/hooks/useEstimateFeeDeployRSP';
import { GameChoice, gameChoiceOptions } from '@/utils/constants';
import { getAddressError, getAmountError } from '@/utils/form';
import { useForm } from '@tanstack/react-form';
import { formatEther, isAddress } from 'viem';
import { useAccount, useBalance } from 'wagmi';
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
      if (getCurrentUserAmountError(value.amount)) {
        return new Error('Invalid amount');
      }

      return onSubmit({
        choice: value.choice,
        opponentAddress: trimmedAddress,
        amount: value.amount.toString(),
      });
    },
  });

  const { address } = useAccount();
  const { data: balance, isLoading: isLoadingBalance } = useBalance({
    address,
  });

  function getCurrentUserAmountError(value: number) {
    return getAmountError(value, { max: balance?.value });
  }

  const { data: estimatedFee, isLoading: isEstimatingFee } =
    useEstimateFeeDeployRSP();

  function getAmountInputInfoText() {
    if (isLoadingBalance) return 'Loading balance...';

    const currentBalance = balance?.value
      ? `${formatEther(balance.value)}  ${balance.symbol}`
      : 0;
    return `Current balance : ${currentBalance}`;
  }

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
          asyncDebounceMs={500}
          validators={{
            onBlur: ({ value }) => getAddressError(value),
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
          asyncDebounceMs={500}
          validators={{
            onBlur: ({ value }) => getCurrentUserAmountError(value),
            onChangeAsync: ({ value }) => getCurrentUserAmountError(value),
          }}
        >
          {(field) => (
            <FormInput
              label="Amount to Bet"
              type="number"
              step="0.01"
              field={field}
              placeholder="0.05"
              infoText={getAmountInputInfoText()}
            />
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div>
              <Button
                className="w-full"
                variant="primary"
                disabled={!canSubmit || isSubmitting}
                type="submit"
              >
                Create New Game
              </Button>
              <div className="text-sm text-neutral-600 mt-2 border border-neutral-300 rounded-lg p-2">
                <p>
                  <span className="mr-1">ℹ️</span> Deploying a game will create
                  a smart contract on the blockchain, which requires paying a
                  gas fee. If your wallet does not have enough ETH to cover this
                  fee, the transaction will fail.
                </p>
                <p>
                  {isEstimatingFee ? (
                    <span>Estimating gas fee...</span>
                  ) : estimatedFee === undefined ? (
                    <span>Estimating gas fee is currently unavailable.</span>
                  ) : (
                    <span>
                      Estimated gas fee to deploy the game:&nbsp;
                      <span className="font-semibold">
                        {formatEther(estimatedFee)} ETH
                      </span>
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        />
      </div>
    </form>
  );
}
