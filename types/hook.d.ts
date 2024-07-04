export type ItemClaimType = {
  _id: string
  from_chain_id: number
  from_chain: string
  to_chain_id: number
  to_chain: string
  user_address: string
  contract_address: string
  tx_hash: string
  amount: string
  raw_amount: string
  stage: number
  status: string // assuming these are possible status values
  signatures: string[]
  created_time: number
}
