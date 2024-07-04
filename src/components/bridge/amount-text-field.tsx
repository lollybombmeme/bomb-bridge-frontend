import { InputHTMLAttributes, useEffect } from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { useCheckTransfer } from '@src/hooks/use-check-transfer'
import { useAccount } from 'wagmi'

// Using type Omit to overwrite id property of InputHTMLAttributes into type string required
type AmountTextFieldProps = Omit<NumericFormatProps<InputHTMLAttributes<HTMLInputElement>>, 'id'> & { id: string }

const AmountTextField = ({ propsInput }: { propsInput: AmountTextFieldProps }) => {
  const { setAmount, amount } = useCheckTransfer()
  const { isConnected } = useAccount()

  const handleResetInput = (idElementInput: string) => {
    const refInput = document.getElementById(idElementInput) as HTMLInputElement

    if (refInput) {
      refInput.value = ''
    }
  }

  useEffect(() => {
    if (!isConnected) {
      handleResetInput(propsInput.id)
    }
  }, [isConnected, propsInput.id])

  return (
    <label
      htmlFor={propsInput.id}
      className='z-10 flex flex-1 items-center rounded-lg border border-[#121212] bg-white shadow-input max-sm:flex-col'
    >
      <figure className='flex items-center gap-2 border-black p-4 max-sm:w-full max-sm:py-0 max-sm:pt-3 sm:border-r'>
        <img src='/icons/icon-bomb.png' alt='logo chains' className='size-6' />
        <figcaption className='font-Nunito text-base font-extrabold leading-normal text-neutral-800'>BOMB</figcaption>
      </figure>
      <NumericFormat
        {...propsInput}
        value={amount === 0 ? '' : amount}
        thousandSeparator=','
        decimalSeparator='.'
        onChange={(e) => {
          setAmount(Number(e.target.value.replace(/,/g, '') || undefined))
        }}
        onKeyDown={(event) => {
          if (['-'].includes(event.key)) event.preventDefault()
        }}
        type={'text'}
        placeholder={'Enter amount'}
        className={
          propsInput.className +
          ' flex-1 rounded-lg p-4 font-Nunito text-base font-bold leading-normal text-neutral-800 outline-none max-sm:w-full max-sm:py-3'
        }
      />
    </label>
  )
}

export default AmountTextField
