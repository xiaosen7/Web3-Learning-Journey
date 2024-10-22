import { config as testConfig } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'
import { type Config, useConfig } from 'wagmi'

import type { config } from './config.js'

test('default', async () => {
  const result = useConfig()
  expectTypeOf(result).not.toEqualTypeOf<Config>()
  expectTypeOf(result).toEqualTypeOf<typeof config>()
})

test('parameters: config', async () => {
  const result = useConfig({ config: testConfig })
  expectTypeOf(result).not.toEqualTypeOf<Config>()
  expectTypeOf(result).toEqualTypeOf<typeof testConfig>()
})
