import type { RSPState } from '@/hooks/useRSPState';
import { GameChoice, GamePlayer, GameStatus } from '@/utils/constants';

export function checkGameTimeOut(state: RSPState): boolean {
  return state.lastAction + state.TIMEOUT < Date.now() / 1000;
}

export function checkGameStatus(state: RSPState): GameStatus {
  if (state.c2 === GameChoice.Null) {
    return GameStatus.Created;
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
