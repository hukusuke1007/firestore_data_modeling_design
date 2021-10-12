import * as fs from 'fs'
import * as yaml from 'js-yaml'
import { Fdmd } from '../entities/fdmd'

export class YamlRepository {
  static fetch(filePath: string): Fdmd {
    const bytes = fs.readFileSync(filePath, 'utf8')
    const data = yaml.load(bytes)
    return Fdmd.fromMap(data)
  }
}
