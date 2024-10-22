import { http } from 'viem'
import { createConfig } from 'wagmi'
import { celo, mainnet, optimism, zkSync } from 'wagmi/chains'

export const config = createConfig({
  chains: [celo, mainnet, optimism, zkSync],
  transports: {
    [celo.id]: http(),
    [mainnet.id]: http(),
    [optimism.id]: http(),
    [zkSync.id]: http(),
  },
})

export type ChainId =
  | typeof celo.id
  | typeof mainnet.id
  | typeof optimism.id
  | typeof zkSync.id

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
