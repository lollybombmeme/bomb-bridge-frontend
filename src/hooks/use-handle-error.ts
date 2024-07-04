import { useCallback, useMemo } from 'react'
import { capitalizeFirstLetter, notifyErrors } from '@src/utils/lib'

interface DataError {
  code?: number
  data?: DataMessage
  message?: string
  stack?: string
  name?: string
  reason?: string
  shortMessage?: string
  cause?: CauseError
}
interface DataMessage {
  cause: CauseError
  code: number
  message: string
}

interface CauseError {
  code: number
  details: string
  shortMessage: string
  message: string
}
const useHandleError = () => {
  const showError = useCallback((error: Error) => {
    const dataError: DataError = {
      ...error,
    }
    const { cause } = dataError
    if (cause) {
      if (cause?.code === -32000) {
        notifyErrors('Insufficient funds for gas')
      } else if (cause?.code === 4001 || dataError?.code === 4001) {
        notifyErrors(capitalizeFirstLetter(`${cause.shortMessage ?? cause?.message}`))
        return
      } else if (dataError?.shortMessage) {
        notifyErrors(capitalizeFirstLetter(`${dataError?.shortMessage}`))
      } else {
        notifyErrors('Unknown error')
        return
      }
    }
  }, [])
  return useMemo(() => {
    return {
      showError,
    }
  }, [showError])
}

export default useHandleError
