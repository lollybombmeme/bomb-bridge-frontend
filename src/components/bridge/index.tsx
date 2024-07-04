import { ReactNode, useState } from 'react'
import Fire from '@assets/animation-fire.json'
import Background from '@components/bridge/background.tsx'
import ChainSelect from '@components/bridge/chain-select.tsx'
import Summary from '@components/bridge/summary.tsx'
import ConnectWalletButton from '@components/buttons/connect-wallet-button.tsx'
import { useModalHistory } from '@src/hooks/use-modal'
import { BNB_CHAIN_ID, ETH_CHAIN_ID } from '@src/utils/constants.ts'
import Lottie from 'lottie-react'
import { useAccount } from 'wagmi'

import SuccessModal from '../modals/success-modal'

import HistoryModal from './history/history-modal'
import InputBox from './input-box'

const Rocket = ({ address }: { address?: string }) => {
  return (
    <>
      <img src='/images/img-rocket.svg' alt='rocket' className='absolute inset-0 w-full max-sm:hidden' />
      <img src='/images/img-rocket-mobile.svg' alt='rocket' className='mx-auto w-full max-w-[384px] sm:hidden' />
      {address && (
        <div className='absolute left-1/2 h-[622px] w-[500px] -translate-y-3 rotate-180 overflow-hidden max-sm:-translate-x-1/2 sm:-left-[543px] sm:-top-[40px] sm:-rotate-90'>
          <Lottie animationData={Fire} loop={true} />
        </div>
      )}
    </>
  )
}

const MainBridge = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* Desktop */}
      <div className='absolute left-1/2 top-1/2 z-10 h-[536px] w-[1261px] -translate-x-1/2 -translate-y-[calc(50%+20%)] max-sm:hidden'>
        {children}
      </div>

      {/* Mobile */}
      <div className='relative z-10 h-[1040px] overflow-hidden pt-[50px] sm:hidden'>{children}</div>
    </>
  )
}

const ContainerBridge = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* Desktop */}
      <section className='absolute right-[188px] top-[108px] flex w-[976px] gap-3 rounded-lg border-2 border-[#121212] bg-[#0C4F0C] p-6 shadow-section max-sm:hidden'>
        {children}
      </section>

      {/* Mobile */}
      <section className='absolute left-1/2 top-[192px] mx-auto flex h-[662px] w-[319px] -translate-x-1/2 flex-col gap-3 sm:hidden'>
        {children}
      </section>
    </>
  )
}

const ButtonHistory = ({ openModal }: { openModal: () => void }) => {
  const { address } = useAccount()
  return (
    <button
      onClick={openModal}
      disabled={!address}
      className='absolute bottom-[60px] inline-flex h-11 w-[221px] -translate-x-1/2 items-center justify-center gap-1.5 rounded-tl-xl rounded-tr-xl border border-neutral-900 bg-orange-400 px-2 py-3 max-sm:top-[155px] max-sm:h-[28px] max-sm:w-auto max-sm:flex-row-reverse max-sm:px-6 max-sm:py-1'
    >
      <span className='font-Nunito text-base font-medium leading-tight text-black'>History</span>
      <img src={'/icons/icon-arrow-down.svg'} alt={'icon arrow down'} className='relative h-3 w-3' />
    </button>
  )
}

const Bridge = () => {
  const { address } = useAccount()
  const { openModal, isOpen, isOpenSuccess } = useModalHistory()
  const [idChains, setIdChains] = useState<Bridge.IdChains>({
    from: ETH_CHAIN_ID,
    to: BNB_CHAIN_ID,
  })

  const handleSwitchChain = () =>
    setIdChains((prev) => {
      return {
        from: prev.to,
        to: prev.from,
      }
    })

  return (
    <div className='relative h-full w-full bg-[#9AD3DC]'>
      {/* Background */}
      <Background />

      <MainBridge>
        {/* Image Rocket */}
        <Rocket address={address} />

        {/* Main Bridge */}
        <ContainerBridge>
          <article className='flex flex-1 flex-col gap-2'>
            {/* Select Chain */}
            <div className='flex w-full flex-col gap-3 rounded-lg sm:z-20 sm:bg-[#F36C3A] sm:p-4 sm:shadow-article'>
              {/* Button Connect Wallet */}
              <ConnectWalletButton />
              <div className='relative flex items-center justify-center gap-2 max-sm:flex-col'>
                <ChainSelect onSwitchChain={handleSwitchChain} isFrom chainIdSelected={idChains.from} />
                <button
                  onClick={handleSwitchChain}
                  className='relative z-[2] size-8 hover:opacity-70 active:opacity-50 max-sm:absolute max-sm:top-1/2 max-sm:-translate-y-1/2'
                >
                  <img src={'/icons/icon-swap.png'} alt={'icon swap'} className='h-full w-full object-contain' />
                </button>
                <ChainSelect onSwitchChain={handleSwitchChain} chainIdSelected={idChains.to} />
              </div>
            </div>

            <InputBox chainIdSelected={idChains.from} />
          </article>
          <Summary idChains={idChains} />
        </ContainerBridge>

        {/* Button History */}
        <ButtonHistory openModal={() => openModal()} />
      </MainBridge>
      {/* History Modal */}
      {isOpen && <HistoryModal />}
      {isOpenSuccess && <SuccessModal />}
    </div>
  )
}

export default Bridge
