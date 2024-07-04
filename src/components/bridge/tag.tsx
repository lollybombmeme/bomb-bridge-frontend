import { useCallback } from 'react'

const Tag = ({ title, onClickTag }: { title: string; onClickTag: () => void }) => {
  const onHandleClick = useCallback(() => {
    onClickTag && onClickTag()
  }, [onClickTag])
  return (
    <button
      onClick={onHandleClick}
      className='inline-flex items-start justify-start gap-2.5 rounded-md border border-neutral-800 px-1.5 py-1'
    >
      <p className='font-Nunito text-xs font-semibold leading-[16px] text-neutral-800'>{title}</p>
    </button>
  )
}

export default Tag
