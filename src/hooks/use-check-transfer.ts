import { create } from 'zustand'

interface TransferData {
  fromChain: string
  toChain: string
  amount?: number
  accountBalance: number
  setBridgeFromChain: (chain: string) => void
  setAmount: (amount?: number) => void
  setAccountBalance: (amount: number) => void
}

export const useCheckTransfer = create<TransferData>((set) => ({
  fromChain: 'ETH',
  toChain: 'BNB',
  accountBalance: 0,
  setBridgeFromChain: (chain: string) => set({ fromChain: chain }),
  setAmount: (amount?: number) => set({ amount: amount }),
  setAccountBalance: (amount: number) => set({ accountBalance: amount }),
}))
