import { useEffect, useRef, useState } from 'react'
import img_noTransaction from '@assets/images/bridge/img-noTransaction.png'
import { Dialog, DialogPanel, Transition } from '@headlessui/react'
import { useModalHistory } from '@src/hooks/use-modal'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useAccount } from 'wagmi'

import HistoryCard from './history-card'

const BASE_API_URL = import.meta.env.VITE_REACT_BASE_API
const GET_USER_TRANSACTION = '/transaction/user/'
export interface TransactionData {
  _id: string
  from_chain_id: number
  from_chain: string
  to_chain_id: number
  to_chain: string
  user_address: string
  contract_address: string
  tx_hash: string
  amount: string
  raw_amount: string
  stage: number
  status: string
  signatures: string[]
  created_time: number
}

const ICClose = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40' fill='none'>
    <g clipPath='url(#clip0_32_17719)'>
      <path
        d='M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z'
        fill='white'
      />
      <path
        d='M25.829 28.4978C25.4781 28.4989 25.1306 28.4303 24.8064 28.2961C24.4823 28.1619 24.188 27.9647 23.9406 27.716L20.0001 23.7768L16.0596 27.7179C15.5588 28.2187 14.8795 28.5001 14.1712 28.5001C13.4629 28.5001 12.7837 28.2187 12.2828 27.7179C11.782 27.217 11.5006 26.5378 11.5006 25.8295C11.5006 25.1212 11.782 24.4419 12.2828 23.9411L16.2233 20L12.2822 16.0595C11.7814 15.5587 11.5 14.8794 11.5 14.1711C11.5 13.4628 11.7814 12.7835 12.2822 12.2827C12.783 11.7819 13.4623 11.5005 14.1706 11.5005C14.8789 11.5005 15.5582 11.7819 16.059 12.2827L20.0001 16.2232L23.9406 12.2821C24.1886 12.0341 24.483 11.8374 24.807 11.7032C25.131 11.569 25.4783 11.4999 25.829 11.4999C26.1797 11.4999 26.5269 11.569 26.851 11.7032C27.175 11.8374 27.4694 12.0341 27.7174 12.2821C27.9654 12.5301 28.1621 12.8245 28.2963 13.1485C28.4305 13.4725 28.4996 13.8198 28.4996 14.1705C28.4996 14.5212 28.4305 14.8685 28.2963 15.1925C28.1621 15.5165 27.9654 15.8109 27.7174 16.0589L23.7769 20L27.718 23.9404C28.0914 24.3138 28.3457 24.7896 28.4487 25.3075C28.5517 25.8254 28.4988 26.3623 28.2967 26.8501C28.0945 27.338 27.7522 27.7549 27.3131 28.0482C26.8739 28.3415 26.3577 28.498 25.8296 28.4978H25.829Z'
        fill='#191919'
      />
    </g>
    <defs>
      <clipPath id='clip0_32_17719'>
        <rect width='40' height='40' fill='white' />
      </clipPath>
    </defs>
  </svg>
)

export default function HistoryModal() {
  const account = useAccount()
  const { closeModal, isOpen } = useModalHistory()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [listTransactions, setListTransactions] = useState<TransactionData[]>([])

  const { isLoading } = useQuery({
    queryKey: ['listTransactions', account.address, currentPage],
    queryFn: async () => {
      const response = await axios.get(`${BASE_API_URL}${GET_USER_TRANSACTION}`, {
        params: { user_address: account.address, page: currentPage, page_size: 10 },
      })
      const { num_of_page, items } = response.data.data
      setTotalPage(num_of_page)
      setListTransactions((prevTransactions) => {
        return currentPage === 1
          ? items
          : currentPage > num_of_page
            ? prevTransactions
            : [...prevTransactions, ...items]
      })
      return items
    },
    enabled: !!isOpen && !!account.address,
    refetchInterval: 10000,
  })

  const historyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (historyRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = historyRef.current

        if (scrollTop + clientHeight >= scrollHeight - 5 && currentPage <= totalPage) {
          setCurrentPage((prevPage) => prevPage + 1)
        }
      }
    }

    if (historyRef.current) {
      historyRef.current.addEventListener('scroll', handleScroll, { passive: true })
    }

    if (historyRef.current) {
      if (currentPage !== 1 && historyRef.current.clientHeight >= historyRef.current.scrollHeight * currentPage) {
        setCurrentPage((prevPage) => prevPage + 1)
      }
    }

    return () => {
      if (historyRef.current) {
        // eslint-disable-next-line
        historyRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [currentPage, totalPage])

  return (
    <Transition
      show={isOpen}
      enter='duration-200 ease-out'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='duration-300 ease-out'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <Dialog onClose={() => closeModal()} className='relative z-50 transition'>
        <div className='fixed inset-0 flex w-screen items-center justify-center bg-[rgba(0,0,0,0.70)] p-4 max-sm:items-end max-sm:p-0'>
          <DialogPanel
            className={
              `flex h-full min-h-[500px] w-[900px] items-start gap-4 rounded-[32px] border-[2px] border-[#121212] bg-[#528252] p-6 max-sm:w-screen ` +
              `max-sm:max-h-[90%] max-sm:rounded-b-none max-sm:px-2 max-sm:py-6`
            }
          >
            <div
              style={{ boxShadow: ' 4px 4px 0px 0px #000 inset', border: '1px solid var(--Stroke, #121212)' }}
              className='flex w-full flex-col self-stretch rounded-lg bg-[#0C4F0C] p-3'
            >
              <div className='relative mb-8 flex items-center justify-start pr-8 max-sm:justify-center'>
                <p
                  style={{ textShadow: '2px 4px 0px rgba(0, 0, 0, 0.77)' }}
                  className='ml-8 font-Fredoka text-[40px] font-[600] not-italic leading-8 text-[#F9A240]'
                >
                  HISTORY
                </p>
                <button onClick={closeModal} className='absolute right-0 size-[40px] active:scale-95'>
                  <ICClose />
                </button>
              </div>
              {listTransactions.length > 0 && (
                <div
                  ref={historyRef}
                  className='scroll-container flex h-fit w-full flex-col gap-2 overflow-y-scroll pr-4 max-sm:p-0'
                >
                  {listTransactions.map((Trx: TransactionData, index: number) => (
                    <HistoryCard TrxData={Trx} key={index} index={index} />
                  ))}
                </div>
              )}
              {listTransactions.length === 0 && (
                <div ref={historyRef} className='flex h-full w-full flex-col items-center justify-center gap-8'>
                  <img src={img_noTransaction} alt='img_noTransaction' />
                  <p className='text-white'>{isLoading ? 'Fetching transaction data...' : 'No transaction data'}</p>
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  )
}
