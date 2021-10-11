class DataType {
  constructor(init: Partial<DataType>) {
    Object.assign(this, init)
  }
  field: string
  type: string
  example: string
}
