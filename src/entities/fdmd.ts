import { Domain } from 'domain'
import { Doc } from './doc'
import { Info } from './info'

export class Fdmd {
  static fromMap(rawValue: any) {
    const result = new Fdmd(rawValue)
    return result
  }
  constructor(init: Partial<Fdmd>) {
    Object.assign(this, init)
  }
  fdmd?: string
  info?: Info
  domains?: Domain[]
  docs?: Doc[]
  maps?: Doc[]
}
