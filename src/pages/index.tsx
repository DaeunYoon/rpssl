import Card from '@/components/base/Card';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="w-full min-h-screen bg-blue-200 flex flex-col gap-y-8">
      <Header />

      <main className="mx-8 flex flex-col gap-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-2xl font-semibold mb-4">What is RPSSL?</h2>
            <p>lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Card>
          <Card>
            <h2 className="text-2xl font-semibold mb-4">How does it work?</h2>
            <p>lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
