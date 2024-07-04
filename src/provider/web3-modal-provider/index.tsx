import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider } from 'wagmi'
import { bsc, bscTestnet, mainnet, sepolia } from 'wagmi/chains'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = import.meta.env.VITE_PROJECT_ID || 'a47ea9f7152703f01b8b0b0c3fad4e48'
if (!projectId) throw new Error('Project ID is not defined')

// 2. Create wagmiConfig
const metadata = {
  name: 'Bomb bridge',
  description: 'Get ready to blast off into the world of LollyBomb Coin!',
  url: import.meta.env.VITE_REACT_APP_HOST, // origin must match your domain & subdomain
  icons: ['/public/favicon.png'],
}

const chains = [mainnet, sepolia, bsc, bscTestnet] as const
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: wagmiConfig,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  allowUnsupportedChain: true,
  // excludeWalletIds: ['c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96'],
})

const Web3ModalProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
export default Web3ModalProvider
