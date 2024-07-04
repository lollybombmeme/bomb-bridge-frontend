import { useEffect } from 'react'
import { notifySuccess } from '@src/utils/lib'
import { Address, parseSignature } from 'viem'
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

import ABI_BRIDGE from '../contracts/abi-bridge.json'

import { ItemClaimType } from './../../types/hook.d'
import useHandleError from './use-handle-error'
import { useModalHistory } from './use-modal'

export function useClaimBridge() {
  const { setTxHash } = useModalHistory()
  const { data: hash, isPending: isPendingClaim, writeContractAsync, reset } = useWriteContract()
  const { isLoading: isConfirmingClaim, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const { closeModal, setOpenSuccess } = useModalHistory()
  const { showError } = useHandleError()

  useEffect(() => {
    if (isConfirmed) {
      reset()
      closeModal()
      setOpenSuccess(true)
      notifySuccess('Claim successfully!')
    }
  }, [closeModal, isConfirmed, reset, setOpenSuccess, setTxHash])

  const claim = async (item: ItemClaimType) => {
    const addressBridge =
      item.to_chain_id === Number(import.meta.env.VITE_BNB_CHAIN_ID)
        ? import.meta.env.VITE_BNB_ADDRESS_BRIDGE
        : import.meta.env.VITE_ETH_ADDRESS_BRIDGE

    if (!addressBridge) {
      return
    }

    if (
      !item.from_chain_id ||
      !item.tx_hash ||
      !item.raw_amount ||
      !item.signatures ||
      !Array.isArray(item.signatures)
    ) {
      return
    }

    let rawAmount
    try {
      rawAmount = BigInt(item.raw_amount)
    } catch (error) {
      return
    }

    const proofs = item.signatures.map((signature) => parseSignature(signature as `0x${string}`))
    try {
      const txHash = await writeContractAsync({
        abi: ABI_BRIDGE,
        address: addressBridge as Address,
        functionName: 'claim',
        args: [item.from_chain_id, item.tx_hash, rawAmount, proofs],
      })

      if (txHash) setTxHash(txHash)
    } catch (error) {
      showError(error as Error)
    }
  }

  return {
    isPendingClaim,
    isConfirmingClaim,
    claim,
  }
}
