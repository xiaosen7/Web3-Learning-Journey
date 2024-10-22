import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Account } from '../../types/account.js'
import type { Chain } from '../../types/chain.js'
import type { Hex } from '../../types/misc.js'
import type { PublicZksyncRpcSchema } from '../types/eip1193.js'

export type GetL1ChainIdReturnType = Hex

export async function getL1ChainId<
  chain extends Chain | undefined,
  account extends Account | undefined,
>(
  client: Client<Transport, chain, account, PublicZksyncRpcSchema>,
): Promise<GetL1ChainIdReturnType> {
  const result = await client.request({ method: 'zks_L1ChainId' })
  return result
}
