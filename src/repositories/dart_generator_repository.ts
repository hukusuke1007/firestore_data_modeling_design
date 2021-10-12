import * as fs from 'fs'
import { Fdmd } from '../entities/fdmd'
import { Utils } from '../utils/utils'

export class DartGeneratorRepository {
  static generate(fdmd: Fdmd, outputPath: string) {
    // console.log(JSON.stringify(fdmd))
    console.log('🌱 dart.')
    fs.mkdirSync(outputPath, { recursive: true })

    const domainDirNames = Utils.isNotNull(fdmd.domains)
      ? fdmd.domains.filter((e) => Utils.isNotNull(e.name)).map((e) => e.name)
      : []

    // domain cleate
    for (const name of domainDirNames) {
      const domainPath = `${outputPath}/${Utils.camelToSnake(name)}`
      fs.mkdirSync(domainPath, { recursive: true })
    }
  }
}
