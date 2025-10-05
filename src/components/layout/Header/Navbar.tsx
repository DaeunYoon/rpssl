import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="bg-white/50 w-[calc(100%-1rem)] flex justify-between gap-x-4 items-center px-4 py-2 top-[0.5rem] sticky rounded-2xl mx-auto">
      <div
        className="text-xl font-semibold hover:cursor-pointer"
        onClick={() => router.push('/')}
      >
        🪨📄✂️
      </div>
      <ConnectButton />
    </div>
  );
}
