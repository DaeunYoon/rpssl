import useIsMobile from '@/hooks/useIsMobile';
import type { RSPState } from '@/hooks/useRSPState';
import { formatAddress } from '@/utils';
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';
import DataColumn from '../base/DataColumn';

export default function GameInformationCard({ state }: { state: RSPState }) {
  const { chain } = useAccount();
  const tokenSymbol = chain?.nativeCurrency.symbol || 'ETH';
  const isMobile = useIsMobile();
  function formatAddressOnMobile(address: string): string {
    return isMobile ? formatAddress(address) : address;
  }

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-2">Game Information</h3>
      <DataColumn
        label="Address"
        value={state.address}
        formatter={formatAddressOnMobile}
        link={`https://sepolia.etherscan.io/address/${state.address}`}
      />
      <DataColumn
        label="Player 1"
        value={state.player1}
        formatter={formatAddressOnMobile}
        link={`https://sepolia.etherscan.io/address/${state.player1}`}
      />
      <DataColumn
        label="Player 2"
        value={state.player2}
        formatter={formatAddressOnMobile}
        link={`https://sepolia.etherscan.io/address/${state.player2}`}
      />
      <DataColumn
        label="Balance"
        value={state.balance}
        formatter={formatEther}
        suffix={tokenSymbol}
      />
      <DataColumn
        label="Current Stake"
        value={state.stake}
        formatter={formatEther}
        suffix={tokenSymbol}
      />
    </div>
  );
}
