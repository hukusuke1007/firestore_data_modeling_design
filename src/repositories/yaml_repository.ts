import * as fs from 'fs'
import * as yaml from 'js-yaml'

export class YamlRepository {
  static fetch(filePath: string) {
    const bytes = fs.readFileSync(filePath, 'utf8')
    const data = yaml.load(bytes)
    return data
  }
}
