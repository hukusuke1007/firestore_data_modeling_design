import { Domain } from './domain'
import { Doc } from './doc'
import { Info } from './info'
import { Utils } from '../utils/utils'

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

  getDataFields = (doc: Doc) => {
    if (Utils.isNotNull(doc.dataReference)) {
      const refDoc = this.docs.find((e) => e.name === doc.dataReference)
      const refDataFields = Utils.isNotNull(refDoc.data) ? refDoc.data.filter((e) => Utils.isNotNull(e.field)) : []
      return refDataFields
    }
    const dataFields = Utils.isNotNull(doc.data) ? doc.data.filter((e) => Utils.isNotNull(e.field)) : []
    return dataFields
  }
}
