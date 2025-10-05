import type { DeployRSPResult } from '@/hooks/useDeployRSP';
import { GameMove } from '@/utils/constants';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import type { Address } from 'viem';
import Button from '../base/Button';
import Card from '../base/Card';
import DataColumn from '../base/DataColumn';
import Popup, { type BasePopupProps } from '../base/Popup';

interface GameCreateSuccessPopupProps extends BasePopupProps {
  payload: DeployRSPResult | null;
}

export default function GameCreateSuccessPopup({
  isOpen,
  onClose,
  payload,
}: GameCreateSuccessPopupProps) {
  function copyDetails(payload: DeployRSPResult) {
    const details = `Contract Address: ${payload.deployedContract}, Salt: ${payload.salt.toString()}, Move: ${GameMove[payload.move]}`;
    navigator.clipboard.writeText(details);
    toast.success('Details copied to clipboard');
  }

  const router = useRouter();
  function toGamePage(gameAddress: Address) {
    router.push(`/game/${gameAddress}`);
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose} className="w-xl">
      {payload && (
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">
            Game created successfully! 🎊
          </h2>
          <Card className="text-sm text-neutral-600 border border-neutral-300 p-2">
            <p>
              <span className="mr-1">⚠️</span> Make sure to save the following
              details, you will need them to play the game!
            </p>
          </Card>

          <div>
            <DataColumn
              label="Contract Address"
              link={`https://sepolia.etherscan.io/address/${payload.deployedContract}`}
              value={payload.deployedContract}
            />
            <DataColumn label="Salt" value={payload.salt.toString()} />
            <DataColumn label="Move" value={GameMove[payload.move]} />
          </div>

          <div className="flex gap-4 w-full">
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => copyDetails(payload)}
            >
              Copy Details
            </Button>
            <Button
              className="w-full"
              variant="primary"
              onClick={() => toGamePage(payload.deployedContract)}
            >
              To Game Page
            </Button>
          </div>
        </div>
      )}
    </Popup>
  );
}
