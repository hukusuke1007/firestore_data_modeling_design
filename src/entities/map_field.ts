export class MapField {
  constructor(init: Partial<MapField>) {
    Object.assign(this, init)
  }
  reference?: string
}
