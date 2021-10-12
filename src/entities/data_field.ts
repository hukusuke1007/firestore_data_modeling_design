export class DataField {
  constructor(init: Partial<DataField>) {
    Object.assign(this, init)
  }
  field?: string
  type?: string
  example?: string | string[]
}
