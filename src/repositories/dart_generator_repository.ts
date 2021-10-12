import * as fs from 'fs'
import { DataField, isCollection } from '../entities/data_field'
import { Doc } from '../entities/doc'
import { Fdmd } from '../entities/fdmd'
import { Utils } from '../utils/utils'

export class DartGeneratorRepository {
  static generateToFreezed(fdmd: Fdmd, outputPath: string, tempPath: string) {
    // console.log(JSON.stringify(fdmd))
    console.log('🌱 dart.')
    fs.mkdirSync(outputPath, { recursive: true })

    const domainDirNames = Utils.isNotNull(fdmd.domains)
      ? fdmd.domains.filter((e) => Utils.isNotNull(e.name)).map((e) => e.name)
      : []

    // cleate domain dir
    for (const name of domainDirNames) {
      const domainPath = `${outputPath}/${Utils.camelToSnake(name)}`
      fs.mkdirSync(domainPath, { recursive: true })
    }

    // cleate map dir and files
    const maps = Utils.isNotNull(fdmd.maps)
      ? fdmd.maps.filter((e) => Utils.isNotNull(e.name) && e.codeGenerate === true)
      : []
    for (const map of maps) {
      const mapSnakeName = Utils.camelToSnake(map.name)
      const mapPath = `${outputPath}/${mapSnakeName}`
      fs.mkdirSync(mapPath, { recursive: true })
      const template = fs.readFileSync(`${tempPath}/dart_map_freezed.temp`, 'utf8')
      const code = template.replace(/\$\$doc_name/g, mapSnakeName).replace(/\$\$DOCNAME/g, map.name)
      // console.log(code)

      const dataFields = Utils.isNotNull(map.data) ? map.data.filter((e) => Utils.isNotNull(e.field)) : []
      const dataFieldsLine = dataFields
        .filter((e) => !isCollection(e.type))
        .map((e) => `    ${DataField.getDartType(e)} ${e.field},`)

      let lines = code.split(/\r?\n/)

      // DataTime
      if (DataField.existsDateTime(dataFields)) {
        const importOffset = 0
        lines.splice(importOffset, 0, `import '../../converters/date_time_timestamp_converter.dart';`)
      }

      // DataField
      const offset = lines.findIndex((e) => e.includes('factory')) + 1 // データフィールドを追加する行
      lines.splice(offset, 0, ...dataFieldsLine)

      // Write
      const dartFilePath = `${mapPath}/${mapSnakeName}.dart`
      const stream = fs.createWriteStream(dartFilePath, { encoding: 'utf8' })
      for (const l of lines) {
        stream.write(`${l}\n`)
      }
      stream.end()
    }

    // cleate doc dir and files
    const docs = Utils.isNotNull(fdmd.docs)
      ? fdmd.docs.filter((e) => Utils.isNotNull(e.name) && e.codeGenerate === true)
      : []
    for (const doc of docs) {
      const domainName = Doc.getDomainNameFromPath(doc.path)
      const docSnakeName = Utils.camelToSnake(doc.name)
      const docPath = `${outputPath}/${domainName}/${docSnakeName}`
      fs.mkdirSync(docPath, { recursive: true })
      const template = fs.readFileSync(`${tempPath}/dart_doc_freezed.temp`, 'utf8')
      const code = template
        .replace(/\$\$doc_name/g, docSnakeName)
        .replace(/\$\$DOCNAME/g, doc.name)
        .replace(/\$\$COLLECTIONPATH/g, `${Doc.getCollectionPathFromPath(doc.path)}`)
      // console.log(code)

      const dataFields = Utils.isNotNull(doc.data) ? doc.data.filter((e) => Utils.isNotNull(e.field)) : []
      const dataFieldsLine = dataFields
        .filter((e) => !isCollection(e.type))
        .map((e) => `    ${DataField.getDartType(e)} ${e.field},`)

      let lines = code.split(/\r?\n/)

      // Map Model
      const mapModelNames = DataField.getMapModelNames(dataFields)
      const importOffset = 0
      const mapModelNamesLine = mapModelNames.map(
        (e) => `import '../../${Utils.camelToSnake(e)}/${Utils.camelToSnake(e)}.dart';`,
      )
      lines.splice(importOffset, 0, ...mapModelNamesLine)

      // DataTime
      if (DataField.existsDateTime(dataFields)) {
        lines.splice(importOffset, 0, `import '../../converters/date_time_timestamp_converter.dart';`)
      }

      // DataField
      const dataFieldOffset = lines.findIndex((e) => e.includes('factory')) + 1 // データフィールドを追加する行
      lines.splice(dataFieldOffset, 0, ...dataFieldsLine) // console.log(lines)

      // Write
      const dartFilePath = `${docPath}/${docSnakeName}.dart`
      const stream = fs.createWriteStream(dartFilePath, { encoding: 'utf8' })
      for (const l of lines) {
        stream.write(`${l}\n`)
      }
      stream.end()
    }

    // create date_time_timestamp_converter
    fs.mkdirSync(`${outputPath}/converters`, { recursive: true })
    const dTTCtemplate = fs.readFileSync(`${tempPath}/date_time_timestamp_converter.temp`, 'utf8')
    const stream = fs.createWriteStream(`${outputPath}/converters/date_time_timestamp_converter.dart`, {
      encoding: 'utf8',
    })
    stream.write(dTTCtemplate)
    stream.end()
  }
}
