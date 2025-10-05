import { useWriteContract } from 'wagmi';

export type WriteContractArgs = Parameters<
  ReturnType<typeof useWriteContract>['writeContract']
>[0];
