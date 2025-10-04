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

      const gas = await publicClient.estimateGas({
        data: deployData,
        value: parseEther('0.01'),
        ...config,
      });

      return gas;
    },
    enabled: Boolean(publicClient),
  });

  return estimateDeployRSPFee;
}
