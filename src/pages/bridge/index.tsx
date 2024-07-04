import Bridge from '@src/components/bridge'
import Header from '@src/components/header'

const BridgePage = () => {
  return (
    <main className='relative h-screen w-screen overflow-hidden max-sm:h-auto'>
      <Header />
      <Bridge />
    </main>
  )
}

export default BridgePage
