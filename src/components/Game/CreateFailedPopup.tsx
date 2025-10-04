import LogError from '../base/LogError';
import Popup, { type BasePopupProps } from '../base/Popup';

interface GameCreateFailedPopupProps extends BasePopupProps {
  payload: { error: unknown } | null;
}

export default function GameCreateFailedPopup({
  onClose,
  payload,
  isOpen = !!payload,
}: GameCreateFailedPopupProps) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} className="w-xl">
      {payload && (
        <div className="space-y-4">
          <h2 className="text-red-500 font-semibold text-xl">
            Failed to create game
          </h2>
          <LogError error={payload.error} />
          <p>If the error persists, please reach out for support.</p>
        </div>
      )}
    </Popup>
  );
}
