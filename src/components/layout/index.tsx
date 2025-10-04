import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-blue-200 flex flex-col gap-y-8 justify-between">
      <Header />

      <main className="mx-8">{children}</main>

      <Footer />
    </div>
  );
}
