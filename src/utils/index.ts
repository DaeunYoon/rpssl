import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { encodePacked, isAddress, keccak256 } from 'viem';
import { GameMove } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string): string {
  return isAddress(address)
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : 'Malformed address';
}

export function createUint256Salt(): bigint {
  // Ensure window.crypto is available
  if (!window.crypto || !window.crypto.getRandomValues) {
    throw new Error('crypto.getRandomValues is not supported');
  }
  const bytes = new Uint8Array(32);
  window.crypto.getRandomValues(bytes);
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join(
    '',
  );

  return BigInt('0x' + hex);
}

export function safeStringify(value: unknown, space = 2): string {
  try {
    return JSON.stringify(value, null, space);
  } catch {
    return String(value);
  }
}

export function createHashedMove(move: GameMove) {
  const salt = createUint256Salt();
  const hashedMove = keccak256(
    encodePacked(['uint8', 'uint256'], [move, salt]),
  );

  return { hashedMove, salt };
}
