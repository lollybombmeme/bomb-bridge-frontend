// Images
import { useState } from 'react'
import { useClickOutside } from '@src/hooks/use-click-outside.ts'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useDisconnect } from 'wagmi'

const ICDown = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'>
      <path
        d='M5.43557 8.35494L1.83839 4.24388C1.41407 3.75894 1.75846 3 2.40283 3H9.59717C10.2415 3 10.5859 3.75894 10.1616 4.24388L6.56443 8.35493C6.26562 8.69643 5.73438 8.69643 5.43557 8.35494Z'
        fill='black'
      />
    </svg>
  )
}
const ICDisconnect = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <path
        d='M19.5605 3.28269C18.9548 2.20198 17.806 1.53101 16.5627 1.53101C15.9777 1.53101 15.3981 1.68261 14.8881 1.96928L8.43677 5.59058L9.17892 6.9133L15.6305 3.29199C15.9159 3.13214 16.2383 3.04761 16.5638 3.04761C17.2585 3.04761 17.8999 3.42194 18.2381 4.02488C18.488 4.47038 18.5492 4.98701 18.4103 5.47991C18.2721 5.97282 17.9504 6.38259 17.5049 6.63246L11.6569 9.91416C11.5455 9.20157 11.2131 8.54438 10.693 8.02394C9.77594 7.10786 8.32226 6.78373 7.10133 7.222L6.57337 7.41208L7.08623 8.83861L7.61626 8.64954C8.29824 8.40136 9.10982 8.58628 9.62095 9.0964C9.91587 9.39165 10.1025 9.76564 10.1616 10.1709C10.1369 10.1651 10.1121 10.1589 10.0884 10.152C9.59448 10.0132 9.18543 9.69109 8.93522 9.24386L8.65954 8.75679L7.33581 9.50063L7.61322 9.9877C8.06147 10.7876 8.79431 11.365 9.67838 11.6132C9.70895 11.6211 9.73991 11.6297 9.77086 11.637C9.72414 11.6961 9.67428 11.7524 9.62133 11.8054L4.78701 16.6401C4.42541 17.0013 3.94417 17.2 3.43232 17.2C2.92013 17.2 2.4389 17.0013 2.07797 16.6401C1.71705 16.2788 1.51838 15.7982 1.51838 15.2857C1.51838 14.7735 1.71705 14.2927 2.07797 13.9317L6.27676 9.73334L5.20396 8.66054L1.00556 12.8589C0.357162 13.5078 0 14.3696 0 15.2857C0 16.2024 0.357162 17.0638 1.00543 17.7128C1.65408 18.3615 2.51548 18.7179 3.43224 18.7179C4.34899 18.7179 5.21039 18.3615 5.85904 17.7128L10.6944 12.8785C11.0485 12.5231 11.3207 12.0934 11.4912 11.6221C11.7714 11.5475 12.0377 11.4403 12.2852 11.3007L18.2474 7.95514C19.0456 7.50655 19.6223 6.77337 19.8702 5.89032C20.1183 5.00688 20.0083 4.08049 19.5605 3.28269Z'
        fill='#010002'
      />
      <path
        d='M7.32303 5.99509C7.51345 5.96037 7.64065 5.77752 7.60593 5.58672L6.88268 1.57184C6.84797 1.38074 6.66439 1.25354 6.47397 1.28758C6.28321 1.3223 6.15567 1.50515 6.19039 1.69663L6.91398 5.71079C6.94836 5.90231 7.13159 6.02913 7.32303 5.99509Z'
        fill='#010002'
      />
      <path
        d='M1.84208 8.10978L5.85662 7.38586C6.04771 7.35114 6.17492 7.16829 6.1402 6.97749C6.10548 6.78601 5.92263 6.65851 5.73216 6.69323L1.71729 7.41749C1.52687 7.45119 1.39933 7.63506 1.43404 7.82586C1.46809 8.017 1.65166 8.14416 1.84208 8.10978Z'
        fill='#010002'
      />
    </svg>
  )
}

const DisconnectButton = () => {
  const { disconnect } = useDisconnect()
  return (
    <div
      style={{
        boxShadow: '2px 2px 0px 0px #121212',
        border: '1px solid var(--Text-Primary, #212121)',
      }}
      className='absolute inset-x-0 top-full z-[50] mt-2 flex h-fit items-center justify-start gap-[10px] self-stretch rounded bg-white px-4 py-3 text-sm font-extrabold not-italic leading-5 text-[color:var(--Text-Primary,#212121)]'
    >
      <ICDisconnect />
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  )
}
export default function Header() {
  const { open } = useWeb3Modal()
  const account = useAccount()
  const nameWallet = account?.connector?.name

  const [isOpenDisconnect, setIsOpenDisconnect] = useState(false)
  const refButton = useClickOutside(() => {
    setIsOpenDisconnect(false)
  })

  async function handleOpenModal() {
    if (!account.address) {
      await open()
    } else {
      setIsOpenDisconnect(!isOpenDisconnect)
    }
  }
  return (
    <div className='relative z-50 flex h-[76px] items-center justify-between border border-solid border-[#262626] bg-[#BFE2EB] px-[150px] py-4 font-Nunito shadow-[0px_4px_6px_0px_rgba(49,11,49,0.08)] backdrop-blur-[50px] max-sm:px-4'>
      <div className='flex items-center gap-[60px]'>
        <a href='https://lollybomb.meme/'>
          <div className='flex items-center gap-3 max-sm:gap-2'>
            <img src={'/icons/icon-bomb.png'} alt='icon' className='size-[60px] max-sm:size-[40px]' />
            <p
              className={
                `font-Agbalumo text-[32px] font-normal not-italic leading-[51.731px] text-[#262626] ` +
                ` max-sm:text-[20px] max-sm:leading-[32.203px]`
              }
            >
              LollyBomb
            </p>
          </div>
        </a>
        <div className='flex items-center gap-[60px] max-md:hidden'>
          <a href='/' className='font-[800] text-[#D04035]'>
            Bridge
          </a>
          <a
            href='https://www.dextools.io/app/en/ether/pair-explorer/0x7268d843edf62296a224e895f9f8d129882c7265?t=1718437185088'
            target='_blank'
            className='font-[500] text-[#212121]'
          >
            Dextools
          </a>
        </div>
      </div>
      <button
        ref={refButton}
        onClick={(e) => {
          e.stopPropagation()
          handleOpenModal()
        }}
        style={{
          boxShadow: '2px 2px 0px 0px #121212',
          border: '1px solid var(--Text-Primary, #212121)',
        }}
        className='relative flex h-fit items-center gap-[10px] rounded bg-white px-[10px] py-3 text-sm font-extrabold not-italic leading-5 text-[#212121] max-sm:gap-1.5 max-sm:p-1.5'
      >
        {account.isConnected && ['MetaMask', 'WalletConnect'].includes(nameWallet ?? '') && (
          <img src={'/icons/icon-metamask.png'} alt='metamask' className='size-6' />
        )}
        <p className='font-Nunito text-base font-black italic leading-normal text-black max-sm:text-sm'>
          {!account.address
            ? 'Connect Wallet'
            : `${account.address.slice(0, 7)}...${account.address.slice(account.address.length - 5, account.address.length)}`}
        </p>
        {account.isConnected && <ICDown />}
        {isOpenDisconnect && account.isConnected && <DisconnectButton />}
      </button>
    </div>
  )
}
