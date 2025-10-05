import Card from '@/components/base/Card';
import DetailsContainer from '@/components/Game/DetailsContainer';
import Layout from '@/components/layout';
import { useVerifyRSP } from '@/hooks/useVerifyRSP';
import { useRouter } from 'next/router';
import { type Address, isAddress } from 'viem';

function isAddressCorrect(address: unknown): address is Address {
  return typeof address === 'string' && isAddress(address);
}

export default function GameDetailPage() {
  const router = useRouter();
  const { address } = router.query;
  const isAddressCorrectFormat = isAddressCorrect(address);

  const {
    data: isRSPContract,
    isLoading: isVerifyingContract,
    error: verifyError,
  } = useVerifyRSP(isAddressCorrectFormat ? address : undefined);

  if (!isAddressCorrectFormat) {
    return (
      <Layout>
        <Card className="max-w-xl mx-auto">
          The passed address seems to have wrong format. 🧐
          <br /> Please check if address is in the correct format and try again.
        </Card>
      </Layout>
    );
  }

  if (isVerifyingContract) {
    return (
      <Layout>
        <Card>Verifying RSP contract...</Card>
      </Layout>
    );
  }

  if (verifyError) {
    return (
      <Layout>
        <Card>Error verifying RSP contract: {String(verifyError)}</Card>
      </Layout>
    );
  }

  if (!isRSPContract) {
    return (
      <Layout>
        <Card>
          The address is not a valid RSP contract. 🧐
          <br />
          Please check if the address is correct or the contract is on the right
          network.
        </Card>
      </Layout>
    );
  }

  return (
    <Layout>
      <DetailsContainer address={address} />
    </Layout>
  );
}
