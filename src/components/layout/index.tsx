import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-blue-200 flex flex-col gap-y-8 justify-between items-center">
      <Header />

      <main className="px-8 w-full">
        <div className="max-w-6xl mx-auto w-full">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
