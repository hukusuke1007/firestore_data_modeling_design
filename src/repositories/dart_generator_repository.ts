import * as fs from 'fs'
import { Doc } from '../entities/doc'
import { Fdmd } from '../entities/fdmd'
import { Utils } from '../utils/utils'

export class DartGeneratorRepository {
  static generateToFreezed(fdmd: Fdmd, outputPath: string) {
    // console.log(JSON.stringify(fdmd))
    console.log('🌱 dart.')
    fs.mkdirSync(outputPath, { recursive: true })

    const domainDirNames = Utils.isNotNull(fdmd.domains)
      ? fdmd.domains.filter((e) => Utils.isNotNull(e.name)).map((e) => e.name)
      : []

    // domain dir cleate
    for (const name of domainDirNames) {
      const domainPath = `${outputPath}/${Utils.camelToSnake(name)}`
      fs.mkdirSync(domainPath, { recursive: true })
    }

    // doc dir cleate
    const docs = Utils.isNotNull(fdmd.docs) ? fdmd.docs.filter((e) => Utils.isNotNull(e.name)) : []
    for (const doc of docs) {
      const domainName = Doc.getDomainNameFromPath(doc.path)
      const docPath = `${outputPath}/${domainName}/${Utils.camelToSnake(doc.name)}`
      fs.mkdirSync(docPath, { recursive: true })
    }
  }
}
