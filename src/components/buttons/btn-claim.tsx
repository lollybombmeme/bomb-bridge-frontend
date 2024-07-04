import { useEffect, useMemo } from 'react'
import icon_flag_notClaimed from '@assets/images/bridge/icon-flag-notclaimed.svg'
import icon_rocket from '@assets/images/bridge/icon-rocket.svg'
import { useClaimBridge } from '@src/hooks/use-claim'
import useHandleError from '@src/hooks/use-handle-error'
import { useSwitchChain } from 'wagmi'
import { useAccount } from 'wagmi'

import { TransactionData } from '../bridge/history/history-modal'

export const ButtonClaim = ({ TrxData }: { TrxData: TransactionData }) => {
  const { chainId } = useAccount()
  const { showError } = useHandleError()
  const { switchChain, isSuccess, isPending } = useSwitchChain()
  const { claim, isPendingClaim, isConfirmingClaim } = useClaimBridge()

  const isInProcess = useMemo(() => TrxData.status === 'in_process', [TrxData.status])
  const isClaimed = useMemo(() => TrxData.status === 'claimed', [TrxData.status])

  const loading = useMemo(
    () => isPending || isPendingClaim || isConfirmingClaim,
    [isPending, isPendingClaim, isConfirmingClaim]
  )

  useEffect(() => {
    if (isSuccess && !isPending) {
      try {
        claim(TrxData)
      } catch (error) {
        showError(error as Error)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isPending])
  return (
    <div className='max flex items-center gap-2 self-stretch'>
      {isInProcess ? (
        <img src={icon_rocket} alt='icon_rocket' />
      ) : (
        <img src={icon_flag_notClaimed} alt='icon_rocket' width={24} height={24} />
      )}
      <button
        onClick={async () => {
          if (chainId !== TrxData.to_chain_id) {
            switchChain({ chainId: TrxData.to_chain_id })
            return
          }
          try {
            await claim(TrxData)
          } catch (error) {
            showError(error as Error)
          }
        }}
        style={{ boxShadow: '2px 2px 0px 0px #000' }}
        disabled={isClaimed || isInProcess ? true : false}
        className={
          ` ${loading && 'animate-pulse '}` +
          ` whi w-full rounded border border-solid px-4 py-1 text-[14px] font-[900] italic leading-6 shadow-[2px_2px_0px_0px_#121212]` +
          ` ${isClaimed || isInProcess ? 'cursor-not-allowed border-[#121212] bg-white text-[#666] opacity-50' : 'border-[#212121] bg-[#D04035] text-white opacity-100 active:scale-95'}`
        }
      >
        {loading ? 'Claiming...' : isClaimed ? 'Claimed' : 'Claim'}
      </button>
    </div>
  )
}
