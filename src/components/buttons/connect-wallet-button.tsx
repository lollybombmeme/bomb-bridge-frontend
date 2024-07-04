import { formatWalletAddress } from '@src/utils/lib.ts'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'

const ConnectWalletButton = () => {
  const { open } = useWeb3Modal()
  const account = useAccount()

  const handleOpenModal = async () => {
    if (!account.address) {
      await open()
    }
  }

  return (
    <button
      disabled={Boolean(account.address)}
      onClick={handleOpenModal}
      className='flex max-h-[44px] items-center justify-center gap-2.5 rounded border border-[#212121] bg-white py-3 shadow-button transition-colors hover:bg-white/75 active:bg-white/50 disabled:hover:bg-white max-sm:hidden'
    >
      {account.isConnected && ['MetaMask', 'WalletConnect'].includes(account.connector?.name ?? '') && (
        <img src={'/icons/icon-metamask.png'} alt='metamask' className='size-5' />
      )}
      <span className='font-Nunito text-sm font-extrabold leading-5 text-[#212121]'>
        {formatWalletAddress(account.address)}
      </span>
    </button>
  )
}

export default ConnectWalletButton
