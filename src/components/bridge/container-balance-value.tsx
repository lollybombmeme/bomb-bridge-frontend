import React, { ReactNode } from 'react'

const ContainerBalanceValue = ({ children }: { children: ReactNode }) => {
  return (
    <React.Fragment>
      <article className='flex justify-between max-sm:hidden'>{children}</article>
      <article className='absolute inset-0 flex flex-col-reverse justify-between p-4 sm:hidden'>{children}</article>
    </React.Fragment>
  )
}

export default ContainerBalanceValue
