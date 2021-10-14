import * as fs from 'fs'
import { DataField } from '../entities/data_field'
import { Doc } from '../entities/doc'
import { Fdmd } from '../entities/fdmd'
import { Utils } from '../utils/utils'
import { OutputData } from '../entities/output_data'
import { dataType } from '../entities/constants'

const getDataField = (dataField?: DataField): string | null => {
  if (Utils.isNull(dataField.type)) {
    return null
  }
  const split = dataField.type.split(',')
  let result = ''
  if (DataField.isValid(split[0])) {
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
  return `${result} ${dataField.field}`
}

export class DartFreezedGeneratorRepository {
  static execute(fdmd: Fdmd, outputPath: string, tempPath: string) {
    console.log('🌱 generate dart')
    fs.mkdirSync(outputPath, { recursive: true })

    const domainDirNames = Utils.isNotNull(fdmd.domains)
      ? fdmd.domains.filter((e) => Utils.isNotNull(e.name)).map((e) => e.name)
      : []

    // cleate domain dir
    for (const name of domainDirNames) {
      const domainPath = `${outputPath}/${Utils.camelToSnake(name)}`
      fs.mkdirSync(domainPath, { recursive: true })
    }

    // Cleate map dir and files
    const outputMapData = Utils.isNotNull(fdmd.maps)
      ? fdmd.maps
          .filter((e) => Utils.isNotNull(e.name) && e.codeGenerate === true)
          .map((map) => {
            const mapSnakeName = Utils.camelToSnake(map.name)
            const mapPath = `${outputPath}/${mapSnakeName}`

            const dataFields = fdmd.getDataFields(map)

            // Map Model
            const mapModelNames = DataField.getMapModelNames(dataFields)
            const mapModelNamesLine = mapModelNames.map(
              (e) => `import '../../${Utils.camelToSnake(e)}/${Utils.camelToSnake(e)}.dart';`,
            )

            // DataTime
            if (DataField.existsDateTime(dataFields)) {
              mapModelNamesLine.push(`import '../../converters/date_time_timestamp_converter.dart';`)
            }

            // DataField
            const dataFieldsLine = fdmd.getDataFields(map).map((e) => `    ${getDataField(e)},`)

            return new OutputData(mapModelNamesLine, dataFieldsLine, `${mapPath}/${mapSnakeName}.dart`, [], map)
          })
      : []
    for (const data of outputMapData) {
      const map = data.doc
      const mapSnakeName = Utils.camelToSnake(map.name)
      const mapPath = `${outputPath}/${mapSnakeName}`
      fs.mkdirSync(mapPath, { recursive: true })
      const template = fs.readFileSync(`${tempPath}/dart_map_freezed.temp`, 'utf8')
      const code = template.replace(/\$\$doc_name/g, mapSnakeName).replace(/\$\$DOCNAME/g, map.name)

      let lines = code.split(/\r?\n/)

      // Import
      lines.splice(0, 0, ...data.imports)

      // DataField
      const offset = lines.findIndex((e) => e.includes('factory')) + 1 // データフィールドを追加する行
      lines.splice(offset, 0, ...data.dataFieleds)

      // Write
      const stream = fs.createWriteStream(data.outputFilePath, { encoding: 'utf8' })
      for (const l of lines) {
        stream.write(`${l}\n`)
      }
      stream.end()
    }

    // Get output docs data
    const outputDocsData = Utils.isNotNull(fdmd.docs)
      ? fdmd.docs
          .filter((e) => Utils.isNotNull(e.name) && e.codeGenerate === true)
          .map((doc) => {
            const domainName = Doc.getDomainNameFromPath(doc.path)
            const docSnakeName = Utils.camelToSnake(doc.name)
            const docPath = `${outputPath}/${domainName}/${docSnakeName}`
            const dataFields = fdmd.getDataFields(doc)

            // Map Model
            const mapModelNames = DataField.getMapModelNames(dataFields)
            const mapModelNamesLine = mapModelNames.map(
              (e) => `import '../../${Utils.camelToSnake(e)}/${Utils.camelToSnake(e)}.dart';`,
            )

            // DataTime
            if (DataField.existsDateTime(dataFields)) {
              mapModelNamesLine.push(`import '../../converters/date_time_timestamp_converter.dart';`)
            }

            // DataField
            const dataFieldsLine = dataFields.map((e) => `    ${getDataField(e)},`)

            // Collections
            const collectionLine = Utils.isNotNull(doc.collections)
              ? doc.collections.map(
                  (e) =>
                    `  static String ${Utils.firstCharLower(
                      e.field,
                    )}CollectionPath(String parentId) => throw UnimplementedError();\n` +
                    `  static String ${Utils.firstCharLower(
                      e.field,
                    )}DocPath(String parentId, String id) => throw UnimplementedError();\n`,
                )
              : []

            return new OutputData(
              mapModelNamesLine,
              dataFieldsLine,
              `${docPath}/${docSnakeName}.dart`,
              collectionLine,
              doc,
            )
          })
      : []
    for (const data of outputDocsData) {
      const doc = data.doc
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

      let lines = code.split(/\r?\n/)

      // Import
      lines.splice(0, 0, ...data.imports)

      // DataField
      const dataFieldOffset = lines.findIndex((e) => e.includes('factory')) + 1 // データフィールドを追加する行
      lines.splice(dataFieldOffset, 0, ...data.dataFieleds)

      const collectionOffset = lines.findIndex((e) => e.includes('static String docPath')) + 1 // データフィールドを追加する行
      lines.splice(collectionOffset, 0, ...data.collectionFieleds)

      // Write
      const stream = fs.createWriteStream(data.outputFilePath, { encoding: 'utf8' })
      for (const l of lines) {
        stream.write(`${l}\n`)
      }
      stream.end()
    }

    // Create date_time_timestamp_converter
    fs.mkdirSync(`${outputPath}/converters`, { recursive: true })
    const dTTCtemplate = fs.readFileSync(`${tempPath}/date_time_timestamp_converter.temp`, 'utf8')
    const stream = fs.createWriteStream(`${outputPath}/converters/date_time_timestamp_converter.dart`, {
      encoding: 'utf8',
    })
    stream.write(dTTCtemplate)
    stream.end()
  }
}
