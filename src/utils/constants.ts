export const BNB_CHAIN_ID = import.meta.env.VITE_BNB_CHAIN_ID
export const ETH_CHAIN_ID = import.meta.env.VITE_ETH_CHAIN_ID
export const LIST_CHAIN = {
  [BNB_CHAIN_ID]: {
    chainId: BNB_CHAIN_ID,
    name: import.meta.env.VITE_BNB_CHAIN_NAME,
    symbol: 'BNB',
    images: '/icons/icon-bnb.svg',
    address: import.meta.env.VITE_BNB_ADDRESS_BRIDGE,
    token: import.meta.env.VITE_BNB_ADDRESS_TOKEN_BOMB,
  },
  [ETH_CHAIN_ID]: {
    chainId: ETH_CHAIN_ID,
    name: import.meta.env.VITE_ETH_CHAIN_NAME,
    symbol: 'ETH',
    images: '/icons/icon-eth.png',
    address: import.meta.env.VITE_ETH_ADDRESS_BRIDGE,
    token: import.meta.env.VITE_ETH_ADDRESS_TOKEN_BOMB,
  },
}

export const BASE_URL = import.meta.env.VITE_REACT_APP_HOST
export const OP_IMAGE = BASE_URL + '/og-image.jpeg'

export enum EnumStatusNode {
  PASS = 'PASS',
  MOVING = 'MOVING',
  PENDING = 'PENDING',
}
export type TypeStatusNode = keyof typeof EnumStatusNode
export const STEP_1_HISTORY: statusHistory = {
  progressBarWidth: ['move1', 'faceOut'],
  status: [EnumStatusNode.PASS, EnumStatusNode.MOVING, EnumStatusNode.PENDING, EnumStatusNode.PENDING],
}
export const STEP_2_HISTORY: statusHistory = {
  progressBarWidth: ['move2', 'faceOut'],
  status: [EnumStatusNode.PASS, EnumStatusNode.PASS, EnumStatusNode.MOVING, EnumStatusNode.PENDING],
}
export const STEP_3_HISTORY: statusHistory = {
  progressBarWidth: ['move3', 'faceOut'],
  status: [EnumStatusNode.PASS, EnumStatusNode.PASS, EnumStatusNode.PASS, EnumStatusNode.MOVING],
}
export const STEP_4_HISTORY: statusHistory = {
  progressBarWidth: ['', 'hidden'],
  status: [EnumStatusNode.PASS, EnumStatusNode.PASS, EnumStatusNode.PASS, EnumStatusNode.PASS],
}
export const STEP_INIT: statusHistory = {
  progressBarWidth: ['', 'hidden'],
  status: [EnumStatusNode.PENDING, EnumStatusNode.PENDING, EnumStatusNode.PENDING, EnumStatusNode.PENDING],
}
