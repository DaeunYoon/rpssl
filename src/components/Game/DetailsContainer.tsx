import { useRSPState } from '@/hooks/useRSPState';
import { type Address } from 'viem';
import Card from '../base/Card';
import GameInformationCard from './InformationCard';
import GamePlayContainer from './PlayContainer';

export default function DetailsContainer({ address }: { address: Address }) {
  const {
    data: rspState,
    isLoading: isLoadingRSPState,
    error: rspError,
  } = useRSPState(address);

  if (isLoadingRSPState) {
    return <div>Loading game details...</div>;
  }

  if (rspError) {
    return <div>Error loading game state: {String(rspError)}</div>;
  }

  if (!rspState) {
    return <div>No game state found.</div>;
  }

  return (
    <div className="space-y-4 w-full">
      <Card>
        <GameInformationCard state={rspState} />
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-2">Play Game</h3>
        <GamePlayContainer state={rspState} />
      </Card>
    </div>
  );
}
