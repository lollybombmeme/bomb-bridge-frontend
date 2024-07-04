import { ReactNode, useMemo, useState } from 'react'
import { useCheckTransfer } from '@src/hooks/use-check-transfer'
import { useClickOutside } from '@src/hooks/use-click-outside.ts'
import { LIST_CHAIN } from '@src/utils/constants.ts'

const ContainerButton = ({ children, isFrom }: { children: ReactNode; isFrom?: boolean }) => {
  return (
    <>
      <div
        className={`w-full flex-1 max-sm:rounded-lg max-sm:p-4 max-sm:shadow-article ${isFrom ? 'bg-[#F36C3A]' : 'bg-[#F9A240]'}`}
      >
        {children}
      </div>
      {/*<div className='max-sm:hidden'>{children}</div>*/}
    </>
  )
}

const ChainSelect = ({
  chainIdSelected,
  isFrom,
  onSwitchChain,
}: {
  chainIdSelected: number
  isFrom?: boolean
  onSwitchChain: () => void
}) => {
  const { setBridgeFromChain } = useCheckTransfer()
  const initChain = useMemo(() => {
    if (isFrom) {
      setBridgeFromChain(LIST_CHAIN[chainIdSelected].symbol)
    }
    return LIST_CHAIN[chainIdSelected]
  }, [chainIdSelected, isFrom, setBridgeFromChain])

  const [isShowPopup, setIsShowPopup] = useState(false)

  const togglePopup = () => setIsShowPopup((prev) => !prev)

  const refNode = useClickOutside(() => setIsShowPopup(false))

  const handleSelectedChain = () => {
    onSwitchChain()
    togglePopup()
  }

  return (
    <ContainerButton isFrom={isFrom}>
      <div ref={refNode} className={`relative w-full flex-1 max-sm:w-full`}>
        <button
          onClick={togglePopup}
          className='flex max-h-[48px] w-full items-center gap-1 rounded border border-[#262626] bg-white p-3 shadow-button'
        >
          <p className='font-Nunito text-sm font-extrabold leading-snug text-[#262626]'>{isFrom ? 'From' : 'To'}:</p>
          <div className='flex flex-1 items-center gap-1.5'>
            <img
              src={initChain.images}
              alt={'logo token'}
              style={{
                boxShadow: '0.5px 1px 0px 0px #000',
              }}
              className='size-5 rounded-full'
            />
            <p className='font-Nunito text-sm font-extrabold leading-snug text-neutral-800'>{initChain.name}</p>
          </div>
          <img src={'/icons/icon-arrow-down.svg'} alt={'icon arrow down'} />
        </button>

        <ul
          className='absolute inset-x-0 top-full z-10 mt-2 space-y-1 rounded border border-[#262626] bg-white p-1 shadow-button transition-all'
          hidden={!isShowPopup}
        >
          {Object.entries(LIST_CHAIN).map(([key, { images, name, chainId }]) => (
            <li hidden={chainId === chainIdSelected} key={key}>
              <button
                onClick={handleSelectedChain}
                disabled={chainId === chainIdSelected}
                className={
                  'flex w-full items-center gap-2 rounded-[2px] bg-black/0 px-1 py-2 transition-colors hover:bg-black/5 disabled:bg-[#00000014]'
                }
              >
                <img
                  src={images}
                  alt={'logo token'}
                  style={{
                    boxShadow: '0.5px 1px 0px 0px #000',
                  }}
                  className='size-5 rounded-full'
                />
                <p className='font-Nunito text-sm font-extrabold leading-snug text-neutral-800'>{name}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </ContainerButton>
  )
}

export default ChainSelect
