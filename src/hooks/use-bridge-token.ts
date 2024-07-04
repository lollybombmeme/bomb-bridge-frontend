import { useCallback, useEffect, useMemo } from 'react'
import ABI_BRIDGE from '@contracts/abi-bridge.json'
import { notifySuccess } from '@src/utils/lib'
import { ethers } from 'ethers'
import { Address } from 'viem'
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

import { useCheckTransfer } from './use-check-transfer'
import { useModalHistory } from './use-modal'

export function useBridgeToken() {
  const { setAmount } = useCheckTransfer()
  const { openModal } = useModalHistory()

  const { data: hash, error, isPending, writeContractAsync, reset } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    if (isConfirmed) {
      setAmount(0)
      reset()
      openModal()
      notifySuccess('Bridge successfully!')
    }
  }, [isConfirmed, openModal, reset, setAmount])

  const bridgeToken = useCallback(
    async ({ addressBridge, toChainID, amount }: { addressBridge: string; toChainID: number; amount: string }) => {
      const amountEther = ethers.parseEther(amount)

      await writeContractAsync({
        abi: ABI_BRIDGE,
        address: addressBridge as Address,
        functionName: 'bridge',
        args: [amountEther, toChainID],
      })
    },
    [writeContractAsync]
  )

  return useMemo(() => {
    return {
      error,
      bridgeToken,
      isPending,
      isConfirming,
      isConfirmed,
    }
  }, [bridgeToken, isPending, isConfirming, isConfirmed, error])
}

export default useBridgeToken
