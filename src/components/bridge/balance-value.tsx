/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo } from 'react'
import Tag from '@components/bridge/tag.tsx'
import useAccountBalance from '@src/hooks/use-account-balance'
import { useCheckTransfer } from '@src/hooks/use-check-transfer'
import { LIST_CHAIN } from '@src/utils/constants'
import { nFormatter } from '@src/utils/lib'
import { useAccount } from 'wagmi'

import ContainerBalanceValue from './container-balance-value'

interface BalanceValueProps {
  chainIdSelected: number
}

const BalanceValue = ({ chainIdSelected }: BalanceValueProps) => {
  const { setAmount } = useCheckTransfer()
  const { address } = useAccount()
  const fromChain = useMemo(() => LIST_CHAIN[chainIdSelected], [chainIdSelected])
  const { balance } = useAccountBalance({ tokenAddress: fromChain?.token, chainId: Number(fromChain?.chainId) })

  const handleHaftValue = useCallback(() => {
    if (Number(balance)) {
      setAmount(Number(balance) / 2)
    } else {
      setAmount()
    }
  }, [balance])
  const handleAllValue = useCallback(() => {
    if (Number(balance)) {
      setAmount(Number(balance))
    } else {
      setAmount()
    }
  }, [balance])

  const formattedBalance = useMemo(() => {
    if (!address) {
      return '---'
    }
    if (balance && Number(balance) > 0) {
      return nFormatter(Number(balance), 2)
    }
    return 0
  }, [address, balance])

  return (
    <ContainerBalanceValue>
      <div className='flex gap-2.5 max-sm:flex-row-reverse'>
        <Tag onClickTag={handleHaftValue} title='50%' />
        <Tag onClickTag={handleAllValue} title='MAX' />
      </div>
      <div className='inline-flex items-baseline justify-end gap-1'>
        <div className='font-Nunito text-base font-normal leading-tight text-neutral-800'>Balance:</div>
        <div className='font-Nunito text-base font-extrabold leading-normal text-neutral-800'>
          {formattedBalance} BOMB
        </div>
      </div>
    </ContainerBalanceValue>
  )
}
export default BalanceValue
