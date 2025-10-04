import { isAddress } from 'viem';

export function getAddressError(address: string): string | undefined {
  const trimmed = address.trim();
  if (!trimmed) return 'An opponent address is required';
  if (!isAddress(trimmed)) return 'Address is not correct format';
  return undefined;
}

export function getAmountError(amount: number): string | undefined {
  if (isNaN(amount) || amount <= 0) {
    return 'Amount must be a positive number';
  }
  return undefined;
}
