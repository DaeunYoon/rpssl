import Card from '@/components/base/Card';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import { isAddress } from 'viem';

export default function GameDetailPage() {
  const router = useRouter();
  const { address } = router.query;
  const isAddressCorrect = typeof address != 'string' || isAddress(address);

  if (!isAddressCorrect) {
    return (
      <Layout>
        <Card className="max-w-xl mx-auto">
          The passed address seems to have wrong format. 🧐
          <br /> Please check if address is in the correct format and try again.
        </Card>
      </Layout>
    );
  }

  return (
    <Layout>
      <Card>Game Detail Page: {address}</Card>
    </Layout>
  );
}
