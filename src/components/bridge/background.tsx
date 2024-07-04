import Fire from '@assets/animation-fire.json'
import { LayerMoveBottom, LayerMoveTop } from '@components/bridge/layer-move.tsx'
import Lottie from 'lottie-react'

const Model = () => {
  return (
    <div className='relative h-[463.71px] w-[463.71px] origin-top-left rotate-[1.48deg]'>
      <img
        className='absolute left-[285.74px] top-[38.83px] h-[247.69px] w-[235.28px] origin-top-left rotate-[40.85deg]'
        src={'/images/img-rocket.png'}
        alt='rocket'
      />
      <div className='absolute left-[80.93px] top-[316.76px] h-[168.5px] w-[134.44px] origin-top-left rotate-[-98.74deg] overflow-hidden'>
        <Lottie animationData={Fire} loop={true} />
      </div>
    </div>
  )
}

const Background = () => {
  return (
    <>
      <div className='absolute inset-0 max-sm:hidden'>
        <div className='absolute -top-[20%] left-0 scale-[0.3]'>
          <div className={'bounceInDown'}>
            <Model />
          </div>
        </div>
        <div className={'absolute -top-[20%] right-0 scale-50'}>
          <div className='bounceInDown'>
            <Model />
          </div>
        </div>
        <div className={'absolute bottom-0 left-[10%] scale-75'}>
          <div className='bounceInDown'>
            <Model />
          </div>
        </div>
        <div className={'bounceInDown1 absolute bottom-0 right-[10%]'}>
          <Model />
        </div>

        <div className='absolute inset-x-0 top-0'>
          <LayerMoveTop />
        </div>
        <div className='absolute inset-x-0 bottom-[85px]'>
          <LayerMoveBottom />
        </div>
      </div>
      <div className='absolute inset-0 sm:hidden'>
        <div className='absolute -top-[150px] left-[-200px] scale-[0.35]'>
          <div className='rotate-[-78deg]'>
            <Model />
          </div>
        </div>
        <div className='absolute -top-[200px] left-[-50px] scale-[0.1]'>
          <div className='rotate-[-78deg]'>
            <Model />
          </div>
        </div>
        <div className='absolute -top-[150px] right-[-150px] scale-[0.3]'>
          <div className='rotate-[-78deg]'>
            <Model />
          </div>
        </div>
      </div>
    </>
  )
}

export default Background
