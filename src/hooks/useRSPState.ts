import { RSPAbi } from '@/contracts/RSP';
import { GameMove, GameStatus } from '@/utils/constants';
import { checkGameStatus } from '@/utils/game';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import type { Address, Hash } from 'viem';
import { useBlockNumber, usePublicClient } from 'wagmi';

export interface RSPState {
  address: Address;
  stake: bigint;
  player1: Address;
  player2: Address;
  c1Hash: Hash;
  lastAction: bigint;
  TIMEOUT: bigint;
  c2: GameMove;
  balance: bigint;
  currentGameStatus: GameStatus;
}

export function getRSPStateQueryKey(address: Address | undefined) {
  return ['rspState', address];
}

export function useRSPState(address?: Address) {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  // Fetch new state every block
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: getRSPStateQueryKey(address) });
  }, [blockNumber, queryClient]);

  const rspState = useQuery({
    queryKey: getRSPStateQueryKey(address),
    queryFn: async () => {
      if (!publicClient || !address) {
        return undefined;
      }

      const [
        stake,
        player1,
        player2,
        c1Hash,
        lastAction,
        TIMEOUT,
        c2,
        balance,
      ] = await Promise.all([
        publicClient.readContract({
          address,
          abi: RSPAbi,
          functionName: 'stake',
        }),
        publicClient.readContract({
          address,
          abi: RSPAbi,
          functionName: 'j1',
        }),
        publicClient.readContract({
          address,
          abi: RSPAbi,
          functionName: 'j2',
        }),
        publicClient.readContract({
          address,
          abi: RSPAbi,
          functionName: 'c1Hash',
        }),
        publicClient.readContract({
          address,
          abi: RSPAbi,
          functionName: 'lastAction',
        }),
        publicClient.readContract({
          address,
          abi: RSPAbi,
          functionName: 'TIMEOUT',
        }),
        publicClient.readContract({
          address,
          abi: RSPAbi,
          functionName: 'c2',
        }),
        publicClient.getBalance({ address }),
      ]);

      return {
        address,
        stake,
        player1,
        player2,
        c1Hash,
        lastAction,
        TIMEOUT,
        c2: c2 as GameMove,
        balance,
        currentGameStatus: checkGameStatus(c2 as GameMove, balance),
      } satisfies RSPState;
    },
    enabled: Boolean(publicClient && address),
  });

  return rspState;
}
