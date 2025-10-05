import { isAddress, parseEther, zeroAddress } from 'viem';

interface GetAddressErrorOptions {
  required?: boolean;
  notZero?: boolean;
}
export function getAddressError(
  address: string,
  options: GetAddressErrorOptions = {},
): string | undefined {
  const trimmed = address.trim();

  if (trimmed === '') {
    if (options.required) return 'Address is required';
    return undefined;
  }
  if (options.notZero && trimmed === zeroAddress) {
    return 'Address cannot be zero address';
  }

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

interface GetBigIntErrorOptions {
  allowNegative?: boolean;
}

export function getBigIntError(
  value?: string | null,
  options?: GetBigIntErrorOptions,
) {
  if (!value) return 'Value is required';

  let convertedValue: bigint;
  try {
    convertedValue = BigInt(value);
  } catch {
    return 'Value should be integer value';
  }

  if (convertedValue < BigInt(0) && !options?.allowNegative) {
    return 'Value cannot be negative';
  }

  return undefined;
}
