import { create } from 'zustand'
interface ModalHistory {
  isOpen: boolean
  txHash: string
  openModal: () => void
  closeModal: () => void

  isOpenSuccess: boolean
  setOpenSuccess: (isSuccess: boolean) => void
  setTxHash: (tx: string) => void
}
export const useModalHistory = create<ModalHistory>((set) => ({
  isOpen: false,
  isOpenSuccess: false,
  txHash: '',
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  setOpenSuccess: (isSuccess: boolean) => set({ isOpenSuccess: isSuccess }),
  setTxHash: (tx) => set({ txHash: tx }),
}))
