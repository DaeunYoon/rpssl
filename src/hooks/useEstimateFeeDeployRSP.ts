import { RSPAbi, RSPByteCode } from '@/contracts/RSP';
import { GameChoice } from '@/utils/constants';
import { config } from '@/wagmi';
import { useQuery } from '@tanstack/react-query';
import {
  Address,
  encodeDeployData,
  parseEther,
  zeroAddress,
  zeroHash,
} from 'viem';
import { sepolia } from 'viem/chains';
import { usePublicClient } from 'wagmi';

export interface DeployRSPVariables {
  choice: GameChoice;
  opponentAddress: Address;
  amount: string;
}

export function useEstimateFeeDeployRSP() {
  const publicClient = usePublicClient();

  const estimateDeployRSPFee = useQuery({
    queryKey: ['estimateDeployRSPFee'],
    queryFn: async () => {
      if (!publicClient) {
        return;
      }

      const deployData = encodeDeployData({
        abi: RSPAbi,
        bytecode: RSPByteCode,
        args: [zeroHash, zeroAddress],
      });

      const gasUnit = await publicClient.estimateGas({
        account: zeroAddress,
        data: deployData,
        value: parseEther('0.01'),
        ...config,
      });

      let feePerGas;
      if (publicClient.chain.id === sepolia.id) {
        // Gas Estimation on Sepolia isn't correct, so using a fixed value here
        feePerGas = BigInt(1_500_000_000); // 1.5 gwei
      } else {
        const maxPriorityFeePerGas = await publicClient.estimateFeesPerGas();
        feePerGas = maxPriorityFeePerGas.maxFeePerGas;
      }

      return gasUnit * feePerGas;
    },
    enabled: Boolean(publicClient),
  });

  return estimateDeployRSPFee;
}
