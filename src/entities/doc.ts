import { DataField } from './data_field'

export class Doc {
  constructor(init: Partial<Doc>) {
    Object.assign(this, init)
  }
  name?: string
  path?: string
  description?: string
  codeGenerate?: boolean
  data?: DataField[]
}
