import { RSPRuntimeByteCode } from '@/contracts/RSP';
import { useQuery } from '@tanstack/react-query';
import { Address, keccak256 } from 'viem';
import { usePublicClient } from 'wagmi';

export function useVerifyRSP(address?: Address) {
  const publicClient = usePublicClient();

  const verifyRSP = useQuery({
    queryKey: ['verifyRSP', address],
    queryFn: async () => {
      if (!publicClient || !address) {
        return undefined;
      }
      const bytecode = await publicClient.getCode({ address });

      if (!bytecode) return false; // address is EOA, not a contract

      const hash = keccak256(bytecode);
      return hash === keccak256(RSPRuntimeByteCode);
    },
    enabled: Boolean(publicClient && address),
  });

  return verifyRSP;
}
