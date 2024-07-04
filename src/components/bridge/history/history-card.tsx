import { useEffect, useMemo, useState } from 'react'
import icon_clock from '@assets/images/bridge/icon-clock.svg'
import icon_flag from '@assets/images/bridge/icon-flag.svg'
import icon_moon from '@assets/images/bridge/icon-moon.svg'
import icon_moon_animate from '@assets/images/bridge/icon-moon-animate.svg'
import icon_moon_with_flag from '@assets/images/bridge/icon-moon-with-flag.svg'
import {
  STEP_1_HISTORY,
  STEP_2_HISTORY,
  STEP_3_HISTORY,
  STEP_4_HISTORY,
  STEP_INIT,
  TypeStatusNode,
} from '@src/utils/constants'
import { ConvertTimestamp, nFormatter } from '@src/utils/lib'

import { ButtonClaim } from '../../buttons/btn-claim'

import { TransactionData } from './history-modal'

const NodeProgress = ({ numStatus }: { numStatus: TypeStatusNode }) => {
  return {
    PASS: <img src={icon_moon_with_flag} alt='icon' className='z-2 relative' />,
    MOVING: (
      <div className='relative'>
        <img src={icon_moon_animate} alt='icon' className='z-2 absolute bottom-1 left-1' />
        <img src={icon_moon} alt='icon' className='faceOut z-2 relative' />
        <img src={icon_flag} alt='icon' className='z-2 absolute right-0 top-1' />
      </div>
    ),
    PENDING: <img src={icon_moon} alt='icon' className='z-2 relative' />,
  }[numStatus]
}

const ProgressSVG = ({ animate }: { animate: string[] }) => {
  const [animation, setAnimation] = useState(animate)

  useEffect(() => setAnimation(animate), [animate])

  return (
    <div className='absolute bottom-[25%] left-0 right-0'>
      <div className='h-1 w-full px-2'>
        <div className={'relative h-full bg-[#F9A240] ' + animation[0]}>
          <img
            src={'/images/img-rocket.png'}
            alt='icon_moon_with_flag'
            className={
              'absolute -right-[20px] top-1/2 h-[34px] w-[34px] -translate-y-1/2 rotate-[50deg] ' + animation[1]
            }
          />
        </div>
      </div>
    </div>
  )
}
const DefaultSVG = ({ background = 'rgba(255, 255, 255, 0.09)' }) => {
  return (
    <div className='absolute bottom-[25%] left-0 right-0 z-[0]'>
      <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg' viewBox='-3 0 202 1.5'>
        <rect width='95%' height='1.5' fill={background} />
      </svg>
    </div>
  )
}
const TransactionProgress = ({ TrxData }: { TrxData: TransactionData }) => {
  const currentStep = useMemo(() => TrxData.stage, [TrxData.stage])
  const { progressBarWidth, status } = useMemo(() => {
    return (
      {
        0: STEP_1_HISTORY,
        1: STEP_2_HISTORY,
        2: STEP_3_HISTORY,
        3: STEP_4_HISTORY,
      }[currentStep] ?? STEP_INIT
    )
  }, [currentStep])

  return (
    <div className='flex w-full max-w-[568px] flex-col items-start gap-2 max-sm:items-center'>
      <div className='relative flex w-full justify-between overflow-hidden'>
        <DefaultSVG />
        <ProgressSVG animate={progressBarWidth} />
        <NodeProgress numStatus={status[0]} />
        <NodeProgress numStatus={status[1]} />
        <NodeProgress numStatus={status[2]} />
        <NodeProgress numStatus={status[3]} />
      </div>

      <div className='flex w-full justify-around gap-2 text-[14px] font-[600] leading-5 text-white max-sm:w-fit max-sm:text-[12px]'>
        <div className='flex-1'>
          <p>Transfer to bridge</p>
        </div>
        <div className='flex h-fit flex-1 items-end justify-center max-sm:items-start'>
          <p>Verify 1</p>
        </div>
        <div className='flex h-fit flex-1 items-end justify-center max-sm:items-start'>
          <p>Verify 2 ({TrxData.stage >= 3 ? 3 : TrxData.stage}/3)</p>
        </div>
        <div className='flex h-fit flex-1 items-end justify-end max-sm:text-end'>
          <p className='whitespace-nowrap'>
            Claim:{' '}
            <span className={'font-extrabold max-sm:whitespace-normal'}>{nFormatter(Number(TrxData.amount))} BOMB</span>
          </p>
        </div>
      </div>
    </div>
  )
}
export default function HistoryCard({ TrxData, index }: Readonly<{ TrxData: TransactionData; index: number }>) {
  return (
    <div className='flex items-center justify-between gap-6 rounded-lg bg-[rgba(18,18,18,0.20)] p-2 font-Nunito max-sm:flex-col-reverse max-sm:p-4'>
      <p className='w-[13px] text-sm font-[900] leading-6 text-white max-sm:hidden'>{index + 1}.</p>
      <TransactionProgress TrxData={TrxData} />
      <div className='flex flex-col items-center gap-4 max-sm:w-full max-sm:flex-row max-sm:justify-between'>
        <div className='flex items-center gap-1'>
          <p className='font-[900] leading-6 text-white max-sm:block lg:hidden'>{index + 1}.</p>
          <img src={icon_clock} alt='icon_clock' />
          <span className='whitespace-nowrap text-right text-[13px] font-medium not-italic leading-5 text-[#B3B3B3] lg:whitespace-nowrap'>
            {ConvertTimestamp(TrxData.created_time)}
          </span>
        </div>
        <ButtonClaim TrxData={TrxData} />
      </div>
    </div>
  )
}
