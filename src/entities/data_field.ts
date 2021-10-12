import { Utils } from '../utils/utils'
import { dataType } from './constants'
import { MapField } from './map_field'

export class DataField {
  static getMapModelNames(dataField: DataField[]): string[] {
    return [...new Set(dataField.filter((e) => Utils.isNotNull(e.map?.reference)).map((e) => e.map?.reference))]
  }
  static existsDateTime(dataField: DataField[]): boolean {
    return dataField.find((e) => Utils.isNotNull(e.type) && e.type.split(',')[0] === dataType.timestamp) !== undefined
  }
  static isValid = (type: string): boolean => Object.values(dataType).indexOf(type) !== -1

  constructor(init: Partial<DataField>) {
    Object.assign(this, init)
  }
  field?: string
  type?: string
  example?: any
  map?: MapField
}
