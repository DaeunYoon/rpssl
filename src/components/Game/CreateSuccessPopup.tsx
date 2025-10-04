import type { DeployRSPResult } from '@/hooks/useDeployRSP';
import Popup, { type BasePopupProps } from '../base/Popup';

interface GameCreateSuccessPopupProps extends BasePopupProps {
  payload: DeployRSPResult | null;
}

export default function GameCreateSuccessPopup({
  isOpen,
  onClose,
  payload,
}: GameCreateSuccessPopupProps) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} className="w-xl">
      {payload && (
        <>
          <p>Game created successfully!</p>
          <p>Contract Address: {payload.deployedContract}</p>
          <p>Salt: {payload.salt.toString()}</p>
        </>
      )}
    </Popup>
  );
}
