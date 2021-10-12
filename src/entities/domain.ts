export class Domain {
  constructor(init: Partial<Domain>) {
    Object.assign(this, init)
  }
  name?: string
  path?: string
  description?: string
}
