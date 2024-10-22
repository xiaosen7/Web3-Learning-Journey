////////////////////////////////////////////////////////////////////////////////
// Actions
////////////////////////////////////////////////////////////////////////////////

// biome-ignore lint/performance/noBarrelFile: entrypoint module
export {
  type WatchChainsParameters,
  type WatchChainsReturnType,
  watchChains,
} from '../actions/watchChains.js'

////////////////////////////////////////////////////////////////////////////////
// Emitter
////////////////////////////////////////////////////////////////////////////////

export {
  type EventData,
  Emitter,
  createEmitter,
} from '../createEmitter.js'

////////////////////////////////////////////////////////////////////////////////
// Types
////////////////////////////////////////////////////////////////////////////////

export type { SelectChains } from '../types/chain.js'

export type {
  ChainIdParameter,
  ConnectorParameter,
  ScopeKeyParameter,
} from '../types/properties.js'

export type {
  Compute,
  ExactPartial,
  Mutable,
  StrictOmit as Omit,
  OneOf,
  RemoveUndefined,
  UnionCompute,
  UnionStrictOmit,
  UnionExactPartial,
} from '../types/utils.js'

////////////////////////////////////////////////////////////////////////////////
// Utilities
////////////////////////////////////////////////////////////////////////////////

export { deepEqual } from '../utils/deepEqual.js'

export { uid } from '../utils/uid.js'