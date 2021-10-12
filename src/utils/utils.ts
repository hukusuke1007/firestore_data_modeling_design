export class Utils {
  static isNotNull = (data: any): boolean => (data !== undefined && data !== null ? true : false)
  static isNull = (data: any): boolean => (data === undefined || data === null ? true : false)
  static isNullEmpty = (value?: string | null): boolean => Utils.isNull(value) || Utils.isEmpty(value)
  static isEmpty = (value: string): boolean => value.trim().length === 0
}
