import type { RSPState } from '@/hooks/useRSPState';
import { GameMove, GamePlayer, GameStatus } from '@/utils/constants';

export function checkGameTimeOut(state: RSPState): boolean {
  return state.lastAction + state.TIMEOUT < Date.now() / 1000;
}

export function checkGameStatus(
  c2Selection: GameMove,
  balance: bigint,
): GameStatus {
  if (c2Selection === GameMove.Null) {
    return GameStatus.Created;
  }
  if (balance === BigInt(0)) {
    return GameStatus.Finished;
  }
  return GameStatus.C2Selected;
}

export function checkGamePlayer(
  state: RSPState,
  userAddress: `0x${string}` | undefined,
): GamePlayer {
  if (userAddress === undefined) {
    return GamePlayer.Null;
  }
  if (userAddress === state.player1) {
    return GamePlayer.Player1;
  }
  if (userAddress === state.player2) {
    return GamePlayer.Player2;
  }
  return GamePlayer.Null;
}
