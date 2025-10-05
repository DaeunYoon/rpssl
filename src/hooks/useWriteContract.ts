import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { BaseError, Hash, type SimulateContractParameters } from 'viem';
import { usePublicClient, useWalletClient } from 'wagmi';

type WriteContractError = BaseError;
type WriteParams = Omit<
  UseMutationOptions<
    Hash,
    WriteContractError,
    SimulateContractParameters,
    unknown
  >,
  'mutationFn'
>;
export default function useWriteContract(options?: WriteParams) {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const { mutate, mutateAsync, ...result } = useMutation({
    mutationFn: async (args: SimulateContractParameters) => {
      if (!publicClient) {
        throw new Error('Public client not available');
      }
      if (!walletClient) {
        throw new Error('Wallet client not available');
      }

      const { request } = await publicClient.simulateContract({
        ...args,
        account: walletClient.account.address,
      });

      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });
      return hash;
    },
    ...options,
  });

  return {
    writeContract: mutate,
    writeContractAsync: mutateAsync,
    ...result,
  };
}
