import { RSPAbi, RSPByteCode } from '@/contracts/RSP';
import { createHashedMove } from '@/utils';
import { GameMove } from '@/utils/constants';
import { config } from '@/wagmi';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { Address, parseEther } from 'viem';
import { usePublicClient, useWalletClient } from 'wagmi';

export interface DeployRSPVariables {
  move: GameMove;
  opponentAddress: Address;
  amount: string;
}

export interface DeployRSPResult {
  deployedContract: Address;
  salt: bigint;
  move: GameMove;
}

type UseDeployRSPOptions = Omit<
  UseMutationOptions<
    DeployRSPResult,
    Error,
    DeployRSPVariables,
    DeployRSPResult
  >,
  'mutationFn'
>;

export function useDeployRSP(options?: UseDeployRSPOptions) {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const { mutate, mutateAsync, ...result } = useMutation({
    mutationFn: async ({
      move,
      opponentAddress,
      amount,
    }: DeployRSPVariables) => {
      if (!walletClient) {
        throw new Error('Wallet client not available');
      }

      if (!publicClient) {
        throw new Error('Public client not available');
      }

      const { hashedMove, salt } = createHashedMove(move);
      try {
        const deployHash = await walletClient.deployContract({
          abi: RSPAbi,
          bytecode: RSPByteCode,
          args: [hashedMove, opponentAddress] as const,
          value: parseEther(amount),
          ...config,
        });

        const receipt = await publicClient.waitForTransactionReceipt({
          hash: deployHash,
        });

        const deployedContract = receipt.contractAddress;
        if (!deployedContract) {
          throw new Error('Contract not deployed', {
            cause: `unexpected error happened, block hash of failed deploy: ${deployHash}`,
          });
        }

        return { deployedContract, salt, move };
      } catch (e) {
        throw new Error('Deployment failed', { cause: e });
      }
    },
    ...options,
  });

  return {
    ...result,
    deployRSP: mutate,
    deployRSPAsync: mutateAsync,
  };
}
