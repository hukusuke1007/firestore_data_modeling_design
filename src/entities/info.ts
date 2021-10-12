export class Info {
  constructor(init: Partial<Info>) {
    Object.assign(this, init)
  }
  description?: string
  version?: string
  title?: string
  termsOfService?: string
  contact?: Contact
  license?: License
}

export class Contact {
  constructor(init: Partial<Contact>) {
    Object.assign(this, init)
  }
  email?: string
}

export class License {
  constructor(init: Partial<License>) {
    Object.assign(this, init)
  }
  name?: string
  url?: string
}
