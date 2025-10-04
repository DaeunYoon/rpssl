import { DeployRSPResult, useDeployRSP } from '@/hooks/useDeployRSP';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import GameCreateFailedPopup from './CreateFailedPopup';
import GameCreateForm from './CreateForm';
import GameCreateSuccessPopup from './CreateSuccessPopup';

export default function CreateContainer() {
  const [deploySuccessPopupPayload, setDeploySuccessPopupPayload] =
    useState<DeployRSPResult | null>(null);
  const [deployErrorPopupPayload, setDeployErrorPopupPayload] = useState<{
    error: unknown;
  } | null>(null);

  const { deployRSPAsync } = useDeployRSP({
    onSuccess(data) {
      setDeploySuccessPopupPayload(data);
    },
  });

  async function handleSubmit(values: Parameters<typeof deployRSPAsync>[0]) {
    try {
      await deployRSPAsync(values);
    } catch (error) {
      setDeployErrorPopupPayload({ error });
    }
  }

  const { isConnected } = useAccount();
  if (!isConnected) {
    return (
      <div className="text-center text-neutral-600">
        Please connect your wallet to create a game.
      </div>
    );
  }

  return (
    <>
      <GameCreateForm onSubmit={handleSubmit} />
      <GameCreateSuccessPopup
        isOpen={!!deploySuccessPopupPayload}
        onClose={() => setDeploySuccessPopupPayload(null)}
        payload={deploySuccessPopupPayload}
      />
      <GameCreateFailedPopup
        isOpen={!!deployErrorPopupPayload}
        onClose={() => setDeployErrorPopupPayload(null)}
        payload={deployErrorPopupPayload}
      />
    </>
  );
}
