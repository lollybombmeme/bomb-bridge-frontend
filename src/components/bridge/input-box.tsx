import AmountTextField from './amount-text-field'
import BalanceValue from './balance-value'

type InputBoxProps = {
  chainIdSelected: number
}

const InputBox = ({ chainIdSelected }: InputBoxProps) => {
  return (
    <div className='relative flex flex-col rounded-lg border border-[#121212] bg-[#F9A240] p-4 shadow-article sm:flex-1 sm:gap-3'>
      {/* Input */}
      <div className='max-sm:h-6 sm:hidden'></div>
      <AmountTextField
        propsInput={{
          id: 'amount',
        }}
      />
      <div className='max-sm:h-10 sm:hidden'></div>
      {/* Balance */}
      <BalanceValue chainIdSelected={chainIdSelected} />
    </div>
  )
}

export default InputBox
