export class CollectionField {
  constructor(init: Partial<CollectionField>) {
    Object.assign(this, init)
  }
  field?: string
  type?: string
}
