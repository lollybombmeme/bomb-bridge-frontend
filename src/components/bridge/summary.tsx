import { useMemo } from 'react'
import { useCheckTransfer } from '@src/hooks/use-check-transfer'
import { LIST_CHAIN } from '@src/utils/constants'
import { useAccount } from 'wagmi'

import BtnBridge from '../buttons/btn-bridge'

type TypeProps = {
  idChains: Bridge.IdChains
}

const ContentSummary = ({ symbol }: { symbol: string }) => {
  const { amount } = useCheckTransfer()
  const { isConnected } = useAccount()

  return isConnected && amount && amount > 0 ? (
    <p className='text-start'>{`Make sure you have ${symbol} in your wallet, you’ll need it to power transactions.`}</p>
  ) : (
    <p>Bridging summary will appear here.</p>
  )
}

const Summary = ({ idChains }: TypeProps) => {
  const fromChain = useMemo(() => LIST_CHAIN[idChains?.from], [idChains])
  const toChain = useMemo(() => LIST_CHAIN[idChains?.to], [idChains])

  return (
    <article
      className={'flex flex-col justify-between rounded-lg bg-white px-[21px] py-[13px] max-sm:flex-1 sm:w-[350px]'}
    >
      <hgroup
        className={'flex flex-col items-start gap-6 font-Nunito text-base font-normal leading-normal text-[#121212]'}
      >
        <h1
          style={{
            textShadow: ' 2px 4px 0px #000000C4',
          }}
          className={'font-Fredoka text-[40px] font-semibold leading-[44px] text-[#E32A2B]'}
        >
          Summary
        </h1>
        <ContentSummary symbol={fromChain?.symbol} />
      </hgroup>
      <BtnBridge fromChain={fromChain} toChain={toChain} />
    </article>
  )
}
export default Summary
