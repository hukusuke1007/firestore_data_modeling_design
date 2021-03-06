export class Utils {
  static isNotNull = (data: any): boolean => (data !== undefined && data !== null ? true : false)
  static isNull = (data: any): boolean => (data === undefined || data === null ? true : false)
  static isNullEmpty = (value?: string | null): boolean => Utils.isNull(value) || Utils.isEmpty(value)
  static isEmpty = (value: string): boolean => value.trim().length === 0

  static snakeToCamel = (data: string): string =>
    data.replace(/_./g, (s) => {
      return s.charAt(1).toUpperCase()
    })

  static camelToSnake = (p: string): string => {
    const data = p.charAt(0).toLowerCase() + p.slice(1)
    return data.replace(/([A-Z])/g, (s) => {
      return '_' + s.charAt(0).toLowerCase()
    })
  }
  static firstCharLower = (p: string): string => {
    return p.charAt(0).toLowerCase() + p.slice(1)
  }
  static firstCharUpper = (p: string): string => {
    return p.charAt(0).toUpperCase() + p.slice(1)
  }
}
