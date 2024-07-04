/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_REACT_APP_HOST: string

  readonly VITE_BNB_CHAIN_ID: number
  readonly VITE_BNB_ADDRESS_BRIDGE: string
  readonly VITE_BNB_ADDRESS_TOKEN_BOMB: string

  readonly VITE_ETH_CHAIN_ID: number
  readonly VITE_ETH_ADDRESS_BRIDGE: string
  readonly VITE_ETH_ADDRESS_TOKEN_BOMB: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace Bridge {
  interface ChainType {
    chainId: number
    name: string
    symbol: string
    images: string
    address: string
    token: string
    value: number
  }

  interface IdChains {
    from: number
    to: number
  }
}

declare namespace Metamask {
  type Address = `0x${string}` | undefined
}

interface Window {
  ethereum: {
    isMetaMask?: boolean
    request: (args: { method: string; params?: Object<any> }) => Promise<any>
  }
}

interface statusHistory {
  progressBarWidth: Array<'' | 'move1' | 'move2' | 'move3' | 'move4' | 'hidden' | 'faceOut'>
  status: Array<TypeStatusNode>
}
