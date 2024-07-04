import { useState } from 'react'
import { notifyErrors, notifySuccess } from '@src/utils/lib'

export function useAddTokenToMetaMask() {
  const [isLoading, setIsLoading] = useState(false)

  const addToken = async (tokenAddress: string, tokenSymbol?: string, tokenDecimals?: number, tokenImage?: string) => {
    try {
      setIsLoading(true)

      if (window.ethereum) {
        const wasAdded = await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: tokenAddress,
              symbol: tokenSymbol,
              decimals: tokenDecimals,
              image: tokenImage || '',
            },
          },
        })

        if (wasAdded) {
          notifySuccess('Token added!')
          return wasAdded
        } else {
          notifySuccess('Token not added.')
        }
      } else {
        notifyErrors('MetaMask is not installed.')
      }
    } catch (error) {
      notifyErrors('Failed to add token')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    addToken,
  }
}
