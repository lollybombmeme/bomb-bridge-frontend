import Marquee from 'react-fast-marquee'

export const LayerMoveTop = () => {
  return (
    <Marquee speed={150} autoFill className='py-6'>
      <img src={'/images/img-layer.svg'} alt={'layer'} className='mx-[300px]' />
      <img src={'/images/img-layer-1.svg'} alt={'layer'} className='mx-[300px] translate-y-2' />
      <img src={'/images/img-layer-2.svg'} alt={'layer'} className='mx-[300px] -translate-y-8' />
      <img src={'/images/img-layer-3.svg'} alt={'layer'} className='mx-[300px] translate-y-6' />
      <img src={'/images/img-layer-4.svg'} alt={'layer'} className='mx-[300px] -translate-y-12' />
    </Marquee>
  )
}
export const LayerMoveBottom = () => {
  return (
    <Marquee speed={150} autoFill className='py-6'>
      <img src={'/images/img-layer-4.svg'} alt={'layer'} className='mx-[300px] -translate-y-6' />
      <img src={'/images/img-layer-1.svg'} alt={'layer'} className='mx-[300px] translate-y-2' />
      <img src={'/images/img-layer.svg'} alt={'layer'} className='mx-[300px]' />
      <img src={'/images/img-layer-3.svg'} alt={'layer'} className='mx-[300px] -translate-y-8' />
      <img src={'/images/img-layer-2.svg'} alt={'layer'} className='mx-[300px] -translate-y-4' />
    </Marquee>
  )
}
