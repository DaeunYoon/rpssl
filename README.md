# RPSSL: Blockchain Rock Paper Scissors Lizard Spock

RPSSL is a decentralized, on-chain implementation of Rock Paper Scissors Lizard Spock, built with Next.js and Solidity. Play with friends, stake ETH, and enjoy provably fair gameplay on the Sepolia testnet.

## 🚀 Getting Started

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in the required variables

3. **Run the app locally:**

   ```bash
   pnpm dev
   ```

4. **Connect your wallet** (MetaMask, WalletConnect, etc.) and switch to the Sepolia testnet.

5. **Create or join a game** and play RPSSL on-chain!

## 🛠 Tech Stack

- Next.js & TypeScript
- RainbowKit & Wagmi & viem
- Tanstack React Query
- Tailwind CSS

## Environment Variables

- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` (required)
- `NEXT_PUBLIC_SEPOLIA_RPC_URL` (required)

## Note

This app is running on [Ethereum Sepolia](https://sepolia.etherscan.io/) and doesn't support multi-chain.
For the best experience, please enter with chrome browser!
