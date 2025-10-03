import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { isAddress } from 'viem';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address?: string): string {
  if (!address) return 'No address';

  return isAddress(address)
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : 'Malformed address';
}
