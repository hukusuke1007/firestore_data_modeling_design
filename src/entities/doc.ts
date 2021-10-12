import { Utils } from '../utils/utils'
import { DataField } from './data_field'

export class Doc {
  static getDomainNameFromPath(path?: string): string {
    if (Utils.isNotNull(path)) {
      const split = path.split('/')
      return Utils.isEmpty(split[0]) ? (Utils.isEmpty(split[1]) ? '' : split[1]) : split[0]
    }
    return ''
  }
  static getCollectionPathFromPath(path?: string): string {
    if (Utils.isNotNull(path)) {
      const split = path.split('/').filter((e) => e.length > 0)
      if (split.length % 2 === 0) {
        split.pop()
      }
      return split.join('/')
    }
    return '/'
  }

  constructor(init: Partial<Doc>) {
    Object.assign(this, init)
  }

  name?: string
  path?: string
  description?: string
  codeGenerate?: boolean
  data?: DataField[]
}
