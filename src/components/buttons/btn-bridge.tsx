import { memo, useCallback, useEffect, useMemo } from 'react'
import useApproveToken from '@src/hooks/use-approve-token'
import useBridgeToken from '@src/hooks/use-bridge-token'
import { useCheckTransfer } from '@src/hooks/use-check-transfer'
import useHandleError from '@src/hooks/use-handle-error'
import { LIST_CHAIN } from '@src/utils/constants'
import { ethers } from 'ethers'
import { useAccount, useChainId, useSwitchChain } from 'wagmi'

import Loader from '../common/loader'

type ChainInfo = (typeof LIST_CHAIN)['1']

type BtnBridgeProps = {
  fromChain: ChainInfo
  toChain: ChainInfo
}
const BtnBridge = ({ fromChain, toChain }: BtnBridgeProps) => {
  const { address } = useAccount()
  const currentChain = useChainId()
  const { amount, accountBalance } = useCheckTransfer()

  const { showError } = useHandleError()

  const { bridgeToken, isPending, isConfirming } = useBridgeToken()
  const { switchChain, isPending: isSwitchChain, isSuccess: isSwitchSuccess } = useSwitchChain()
  const { approvedToken, allowanceToken, isPendingApprove, isConfirmingApprove, isConfirmedApprove } = useApproveToken()

  const wrongChain = useMemo(() => currentChain !== Number(fromChain?.chainId), [currentChain, fromChain?.chainId])

  const loading = useMemo(
    () => isSwitchChain || isPendingApprove || isConfirmingApprove || isPending || isConfirming,
    [isSwitchChain, isPendingApprove, isConfirmingApprove, isPending, isConfirming]
  )

  const disabled = useMemo(
    () => !address || !amount || !accountBalance || amount > accountBalance || loading,
    [accountBalance, address, amount, loading]
  )

  const onBridgeToken = useCallback(async () => {
    try {
      if (!amount) return
      const amountEther = ethers.parseEther(amount.toString())

      const accountAllowance = await allowanceToken(fromChain?.token, fromChain?.address)

      if (!accountAllowance || Number(accountAllowance) < Number(amountEther)) {
        await approvedToken(fromChain?.token, fromChain?.address, amountEther)
        return
      }

      await bridgeToken({
        addressBridge: fromChain?.address,
        toChainID: toChain?.chainId,
        amount: amount ? amount.toString() : '0',
      })
    } catch (error) {
      showError(error as Error)
    }
  }, [allowanceToken, amount, approvedToken, bridgeToken, fromChain, showError, toChain])

  const onSwitchNetwork = useCallback(async () => {
    try {
      switchChain({ chainId: Number(fromChain?.chainId) })
    } catch (error) {
      showError(error as Error)
    }
  }, [fromChain?.chainId, showError, switchChain])

  useEffect(() => {
    if (isSwitchSuccess) {
      onBridgeToken()
    }
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSwitchChain, isSwitchSuccess])

  useEffect(() => {
    if (isConfirmedApprove) {
      onBridgeToken()
    }
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmedApprove, isConfirmingApprove])

  return (
    <button
      onClick={wrongChain ? onSwitchNetwork : onBridgeToken}
      disabled={disabled}
      className={
        'h-12 rounded-lg border-2 border-[#121212] bg-[#D04035] font-Nunito font-extrabold text-white shadow-button' +
        ' hover:opacity-75 active:opacity-50 disabled:bg-[#727272] disabled:text-[#CECECE]' +
        ' disabled:opacity-100'
      }
    >
      {loading && (
        <div className='mx-auto flex max-w-[160px] items-center justify-center'>
          <Loader />
          <span className='ml-2 text-white'>Pending...</span>
        </div>
      )}
      {!loading &&
        ((amount && amount > accountBalance) || (amount && !accountBalance)
          ? 'Insufficient balance'
          : address && wrongChain
            ? 'Switch Network'
            : 'Transfer Now')}
    </button>
  )
}

export default memo(BtnBridge)
