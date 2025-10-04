import { isAddress, parseEther } from 'viem';

export function getAddressError(address: string): string | undefined {
  const trimmed = address.trim();
  if (!trimmed) return 'An opponent address is required';
  if (!isAddress(trimmed)) return 'Address is not correct format';
  return undefined;
}

interface GetAmountErrorOptions {
  max?: bigint;
}
export function getAmountError(
  amount: number,
  options?: GetAmountErrorOptions,
): string | undefined {
  if (isNaN(amount) || amount <= 0) {
    return 'Amount must be a positive number';
  }

  const amountInBigInt = parseEther(amount.toString());
  if (options?.max && amountInBigInt > options.max) {
    return 'Amount cannot be bigger than current balance';
  }
  return undefined;
}
