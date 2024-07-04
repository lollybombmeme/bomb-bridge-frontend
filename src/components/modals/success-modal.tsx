import { toast } from 'react-toastify'
import ic_rocket from '@assets/icons/rocket-horizon.svg'
import logo_lollyBomb from '@assets/images/bridge/logo_lollyBomb.png'
import img_rocket from '@assets/images/modal/rocket.png'
import { Dialog, DialogPanel, Transition } from '@headlessui/react'
import { useAddTokenToMetaMask } from '@src/hooks/use-add-token'
import { useModalHistory } from '@src/hooks/use-modal'
import { useAccount } from 'wagmi'
const ICClose = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40' fill='none'>
      <g clip-path='url(#clip0_32_17719)'>
        <path
          d='M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z'
          fill='white'
        />
        <path
          d='M25.829 28.4978C25.4781 28.4989 25.1306 28.4303 24.8064 28.2961C24.4823 28.1619 24.188 27.9647 23.9406 27.716L20.0001 23.7768L16.0596 27.7179C15.5588 28.2187 14.8795 28.5001 14.1712 28.5001C13.4629 28.5001 12.7837 28.2187 12.2828 27.7179C11.782 27.217 11.5006 26.5378 11.5006 25.8295C11.5006 25.1212 11.782 24.4419 12.2828 23.9411L16.2233 20L12.2822 16.0595C11.7814 15.5587 11.5 14.8794 11.5 14.1711C11.5 13.4628 11.7814 12.7835 12.2822 12.2827C12.783 11.7819 13.4623 11.5005 14.1706 11.5005C14.8789 11.5005 15.5582 11.7819 16.059 12.2827L20.0001 16.2232L23.9406 12.2821C24.1886 12.0341 24.483 11.8374 24.807 11.7032C25.131 11.569 25.4783 11.4999 25.829 11.4999C26.1797 11.4999 26.5269 11.569 26.851 11.7032C27.175 11.8374 27.4694 12.0341 27.7174 12.2821C27.9654 12.5301 28.1621 12.8245 28.2963 13.1485C28.4305 13.4725 28.4996 13.8198 28.4996 14.1705C28.4996 14.5212 28.4305 14.8685 28.2963 15.1925C28.1621 15.5165 27.9654 15.8109 27.7174 16.0589L23.7769 20L27.718 23.9404C28.0914 24.3138 28.3457 24.7896 28.4487 25.3075C28.5517 25.8254 28.4988 26.3623 28.2967 26.8501C28.0945 27.338 27.7522 27.7549 27.3131 28.0482C26.8739 28.3415 26.3577 28.498 25.8296 28.4978H25.829Z'
          fill='#191919'
        />
      </g>
      <defs>
        <clipPath id='clip0_32_17719'>
          <rect width='40' height='40' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}

const SuccessModal = () => {
  const { chainId } = useAccount()

  const { addToken, isLoading } = useAddTokenToMetaMask()
  const { isOpenSuccess, setOpenSuccess, txHash } = useModalHistory()

  const handleAddToken = async () => {
    const tokenAddress =
      chainId === Number(import.meta.env.VITE_ETH_CHAIN_ID)
        ? import.meta.env.VITE_ETH_ADDRESS_TOKEN_BOMB
        : import.meta.env.VITE_BNB_ADDRESS_TOKEN_BOMB

    if (!tokenAddress) {
      return
    }

    if (!window.ethereum) {
      toast.error('MetaMask on mobile is not supported for adding the token.')
      return
    }

    try {
      await addToken(tokenAddress, import.meta.env.VITE_TOKEN_BOMB_SYMBOL, import.meta.env.VITE_TOKEN_BOMB_DECIMALS, '')
    } catch (error) {
      /* empty */
    }
  }
  return (
    <Transition
      show={isOpenSuccess}
      enter='duration-200 ease-out'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='duration-300 ease-out'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <Dialog onClose={() => setOpenSuccess(false)} className='relative z-50 transition'>
        <div className='fixed inset-0 flex w-screen items-center justify-center bg-[rgba(0,0,0,0.70)]'>
          <DialogPanel className='flex w-full max-w-[440px] items-start gap-4 rounded-[32px]'>
            <div className='flex w-full flex-col self-stretch rounded-lg border-2 border-[#212121] bg-[#0C4F0C] p-4'>
              <div className='flex w-full justify-end'>
                <button onClick={() => setOpenSuccess(false)}>
                  <ICClose />
                </button>
              </div>
              <div className='flex flex-col gap-8'>
                <div className='flex flex-col items-center gap-4'>
                  <div className='h-[180px] w-[180px]'>
                    <img src={img_rocket} alt='rocket' className='object-cover' />
                  </div>
                  <div className='text-center font-Nunito text-[24px] font-[800] leading-[28px] text-white'>
                    Transaction Submitted Successfully!
                  </div>
                  <p className='text-center font-Nunito text-[16px] font-semibold leading-[28px] text-[#C4C4C4]'>
                    Hooray! Your transaction is on its way.
                  </p>
                </div>
                <div className='flex flex-col gap-4'>
                  <button
                    onClick={handleAddToken}
                    disabled={isLoading}
                    className={
                      'flex h-12 flex-row items-center gap-[10px] rounded-lg border-2 border-[#121212] bg-[#F9A240] py-2 pl-2 pr-4 font-Nunito text-[16px] font-[900] leading-[24px] text-[#000000] shadow-button hover:opacity-75 active:opacity-50 disabled:bg-[#727272] disabled:opacity-100'
                    }
                  >
                    <div
                      className={`flex flex-1 flex-row items-center gap-[10px] ${isLoading && 'animate-pulse'} italic`}
                    >
                      <div className='h-6 w-6'>
                        <img src={logo_lollyBomb} alt='logo' className='object-cover' />
                      </div>{' '}
                      {isLoading ? 'Adding Token...' : 'Add BOMB to wallet'}
                    </div>
                    <img src={ic_rocket} alt='rocket' className='justify-end' />
                  </button>

                  <button
                    onClick={() => setOpenSuccess(false)}
                    className={
                      'h-12 rounded-lg border-2 border-[#121212] bg-white font-Nunito font-extrabold text-black shadow-button hover:opacity-75 active:opacity-50 disabled:bg-[#727272] disabled:opacity-100'
                    }
                  >
                    Back to home
                  </button>

                  <a
                    href={
                      chainId === Number(import.meta.env.VITE_BNB_CHAIN_ID)
                        ? `${import.meta.env.VITE_BNB_EXPLORER + txHash}`
                        : `${import.meta.env.VITE_ETH_EXPLORER + txHash}`
                    }
                    target='_blank'
                    className='text-center font-Nunito text-[16px] leading-6 text-white underline'
                  >
                    View on Explorer
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  )
}

export default SuccessModal
