import { type SchemaTypeDefinition } from 'sanity'

import { portfolio } from './portfolio'
import { service } from './service'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolio, service],
}
