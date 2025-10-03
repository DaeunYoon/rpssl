import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar() {
  return (
    <div className="bg-white/50 w-[calc(100%-1rem)] flex justify-between gap-x-4 items-center px-4 py-2 top-[0.5rem] sticky rounded-2xl mx-auto">
      <h1 className="text-xl font-semibold">🪨📑✂️</h1>
      <ConnectButton />
    </div>
  );
}
