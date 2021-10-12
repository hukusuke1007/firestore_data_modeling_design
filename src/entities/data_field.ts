import { Utils } from '../utils/utils'
import { dataType } from './constants'
import { MapField } from './map_field'

const isValid = (data: string): boolean => Object.values(dataType).indexOf(data) !== -1
// export const isCollection = (data?: string): boolean => data.split(',').includes(dataType.collection)

export class DataField {
  static getMapModelNames(dataField: DataField[]): string[] {
    return [...new Set(dataField.filter((e) => Utils.isNotNull(e.map?.reference)).map((e) => e.map?.reference))]
  }
  static existsDateTime(dataField: DataField[]): boolean {
    return dataField.find((e) => Utils.isNotNull(e.type) && e.type.split(',')[0] === dataType.timestamp) !== undefined
  }
  static getDartType(dataField?: DataField): string | null {
    const getType = (dataField: DataField): string | null => {
      const split = dataField.type.split(',')
      let result = ''
      if (isValid(split[0])) {
        const arg = split[0]
        if (arg === dataType.string) {
          result = 'String'
        } else if (arg === dataType.int) {
          result = 'int'
        } else if (arg === dataType.double) {
          result = 'double'
        } else if (arg === dataType.bool) {
          result = 'bool'
        } else if (arg === dataType.timestamp) {
          result = '@DateTimeTimestampConverter() DateTime'
        } else if (arg === dataType.map) {
          if (Utils.isNotNull(dataField.map?.reference)) {
            result = `${dataField.map.reference}`
          } else {
            result = 'Map<String, dynamic>'
          }
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

    if (Utils.isNull(dataField.type)) {
      return null
    }
    return getType(dataField)
  }
  constructor(init: Partial<DataField>) {
    Object.assign(this, init)
  }
  field?: string
  type?: string
  example?: any
  map?: MapField
}
