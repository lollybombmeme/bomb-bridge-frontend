import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'
import { BASE_URL, OP_IMAGE } from '@src/utils/constants.ts'

import BridgePage from './pages/bridge'
import Web3ModalProvider from './provider/web3-modal-provider'

import './App.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <HelmetProvider>
      <Web3ModalProvider>
        <Helmet>
          <meta property='og:url' content={BASE_URL} />
          <meta property='og:image' content={OP_IMAGE} />
          <meta property='twitter:image' content={OP_IMAGE} />
        </Helmet>
        <BridgePage />
        <ToastContainer
          position='bottom-right'
          bodyStyle={{
            textAlign: 'left',
          }}
          autoClose={2500}
        />
      </Web3ModalProvider>
    </HelmetProvider>
  )
}

export default App
