import { Utils } from '../utils/utils'
import { dataType } from './constants'

const isValid = (data: string): boolean => Object.values(dataType).indexOf(data) !== -1
export const isCollection = (data?: string): boolean => data.split(',').includes(dataType.collection)

export class DataField {
  static getDocDartType(type?: string): string | null {
    const getType = (split: string[]): string | null => {
      if (isCollection(split[0])) {
        return null
      }
      let result = ''
      if (isValid(split[0])) {
        const arg = split[0]
        if (arg === dataType.string) {
          result = 'String'
        } else if (arg === dataType.int) {
          result = 'int'
        } else if (arg === dataType.double) {
          result = 'double'
        } else if (arg === dataType.timestamp) {
          result = '@DateTimeTimestampConverter() DateTime'
        } else if (arg === dataType.map) {
          result = 'Map<String, dynamic>'
        } else if (arg === dataType.any) {
          result = 'dynamic'
        }
      }
      const array = split.includes(dataType.array)
      const nullable = split.includes(dataType.nullable)
      if (array) {
        result = `List<${result}>`
      }
      if (nullable) {
        result = `${result}?`
      } else {
        result = `required ${result}`
      }
      return result
    }

    if (Utils.isNull(type)) {
      return null
    }
    const split = type.split(',')
    return getType(split)
  }
  constructor(init: Partial<DataField>) {
    Object.assign(this, init)
  }
  field?: string
  type?: string
  example?: any
}
