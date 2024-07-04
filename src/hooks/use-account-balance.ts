import { useEffect, useMemo, useState } from 'react'
import BEP20_ABI from '@contracts/abi-bep20.json'
import ERC20_ABI from '@contracts/abi-erc20.json'
import { ethers } from 'ethers'
import { Address } from 'viem'
import { useAccount, useBlockNumber, useReadContract } from 'wagmi'

import { useCheckTransfer } from './use-check-transfer'

export function useAccountBalance({ tokenAddress, chainId }: { tokenAddress: string; chainId: number }) {
  const { address } = useAccount()
  const [formattedBalance, setFormattedBalance] = useState<string | number | null>(0)
  const { setAccountBalance } = useCheckTransfer()
  const { data: balance, refetch } = useReadContract({
    abi: chainId !== import.meta.env.VITE_BNB_CHAIN_ID ? BEP20_ABI : ERC20_ABI,
    address: tokenAddress as Address,
    chainId: Number(chainId),
    functionName: 'balanceOf',
    args: [address],
    query: {
      staleTime: 1000 * 60,
      enabled: !!address,
    },
  })
  const { data: blockNumber } = useBlockNumber({ watch: true })

  useEffect(() => {
    refetch()
    if (balance) {
      setFormattedBalance(ethers.formatEther(balance.toString()))
      setAccountBalance(Number(ethers.formatEther(balance.toString())))
    } else {
      setFormattedBalance(0)
      setAccountBalance(0)
    }
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance, blockNumber])
  return useMemo(() => {
    return {
      address,
      balance: formattedBalance,
      tokenAddress,
    }
  }, [address, formattedBalance, tokenAddress])
}

export default useAccountBalance
