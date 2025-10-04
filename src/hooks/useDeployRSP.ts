import { RSPAbi, RSPByteCode } from '@/contracts/RSP';
import { createUint256Salt } from '@/utils';
import { GameChoice } from '@/utils/constants';
import { config } from '@/wagmi';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { Address, encodePacked, keccak256, parseEther } from 'viem';
import { usePublicClient, useWalletClient } from 'wagmi';

export interface DeployRSPVariables {
  choice: GameChoice;
  opponentAddress: Address;
  amount: string;
}

export interface DeployRSPResult {
  deployedContract: Address;
  salt: bigint;
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
      choice,
      opponentAddress,
      amount,
    }: DeployRSPVariables) => {
      if (!walletClient) {
        throw new Error('Wallet client not available');
      }

      if (!publicClient) {
        throw new Error('Public client not available');
      }

      const { hashedChoice, salt } = createHashedChoice(choice);
      try {
        const deployHash = await walletClient.deployContract({
          abi: RSPAbi,
          bytecode: RSPByteCode,
          args: [hashedChoice, opponentAddress] as const,
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

        return { deployedContract, salt };
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

function createHashedChoice(choice: GameChoice) {
  const salt = createUint256Salt();
  const hashedChoice = keccak256(
    encodePacked(['uint8', 'uint256'], [choice, salt]),
  );

  return { hashedChoice, salt };
}
