import { useCallback, useEffect, useMemo } from 'react'
import ABI_BEP20 from '@contracts/abi-bep20.json'
import ABI_ERC20 from '@contracts/abi-erc20.json'
import { Contract } from 'ethers'
import { Address } from 'viem'
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

import { useEthersProvider } from './use-ethers-provider'
import useHandleError from './use-handle-error'

export function useApproveToken() {
  const provider = useEthersProvider()
  const { showError } = useHandleError()

  const { address } = useAccount()
  const { data: hash, isPending: isPendingApprove, writeContractAsync, reset } = useWriteContract()

  const { isLoading: isConfirmingApprove, isSuccess: isConfirmedApprove } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    if (isConfirmedApprove) {
      reset()
    }
  }, [isConfirmedApprove, reset])

  const approvedToken = useCallback(
    async (token: string, addressBridge: string, amountWei: bigint) => {
      if (!addressBridge) {
        return
      }

      try {
        const approveTxn = await writeContractAsync({
          abi: token === import.meta.env.VITE_BNB_ADDRESS_TOKEN_BOMB ? ABI_BEP20 : ABI_ERC20,
          address: token as Address,
          functionName: 'approve',
          args: [addressBridge, amountWei],
        })

        return approveTxn
      } catch (error) {
        showError(error as Error)
      }
    },
    [showError, writeContractAsync]
  )

  const allowanceToken = useCallback(
    async (token: string, addressBridge: string) => {
      const contractToken = new Contract(
        token,
        token === import.meta.env.VITE_BNB_ADDRESS_TOKEN_BOMB ? ABI_BEP20 : ABI_ERC20,
        provider
      )
      return await contractToken.allowance.staticCall(address, addressBridge)
    },
    [address, provider]
  )

  return useMemo(() => {
    return {
      approvedToken,
      allowanceToken,
      isPendingApprove,
      isConfirmingApprove,
      isConfirmedApprove,
    }
  }, [approvedToken, allowanceToken, isPendingApprove, isConfirmingApprove, isConfirmedApprove])
}

export default useApproveToken
