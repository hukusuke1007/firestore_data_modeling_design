import * as fs from 'fs'
import { DataField } from '../entities/data_field'
import { Doc } from '../entities/doc'
import { Fdmd } from '../entities/fdmd'
import { Utils } from '../utils/utils'
import { OutputData } from '../entities/output_data'
import { dataType } from '../entities/constants'

const ignoreFieldNames = {
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
}

const getDataField = (dataField?: DataField): string | null => {
  if (Utils.isNull(dataField.type)) {
    return null
  }
  const split = dataField.type.split(',')
  let result = ''
  if (DataField.isValid(split[0])) {
    const arg = split[0]
    if (arg === dataType.string) {
      result = `@Field ${dataField.field}?: string`
    } else if (arg === dataType.int || arg === dataType.double) {
      result = `@Field ${dataField.field}?: number`
    } else if (arg === dataType.bool) {
      result = `@Field ${dataField.field}?: boolean`
    } else if (arg === dataType.timestamp) {
      result = `@Field ${dataField.field}?: Timestamp`
    } else if (arg === dataType.map) {
      if (Utils.isNotNull(dataField.map?.reference)) {
        result = `@Codable(${dataField.map.reference}) @Field ${dataField.field}?: ${dataField.map.reference}`
      } else {
        result = `@Field ${dataField.field}?: any`
      }
    } else if (arg === dataType.any) {
      result = `@Field ${dataField.field}?: any`
    }
  }
  const array = split.includes(dataType.array)
  const nullable = split.includes(dataType.nullable)
  if (array) {
    result = `${result}[]`
  }
  if (!nullable) {
    result = result.replace('?', '')
  }
  return result
}

export class TsBallcapAdminGeneratorRepository {
  static execute(fdmd: Fdmd, outputPath: string, tempPath: string) {
    console.log('🌱 generate ts-ballcak-admin')
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
            const mapPath = `${outputPath}`

            const dataFields = fdmd.getDataFields(map)

            // Map Model
            const mapModelNames = DataField.getMapModelNames(dataFields)
            const mapModelNamesLine = mapModelNames.map(
              (e) => `import { ${Utils.snakeToCamel(Utils.firstCharUpper(e))} } from '../${Utils.camelToSnake(e)}'`,
            )

            // DataField
            const dataFieldsLine = fdmd.getDataFields(map).map((e) => `  ${getDataField(e)}`)

            return new OutputData(mapModelNamesLine, dataFieldsLine, `${mapPath}/${mapSnakeName}.ts`, [], map)
          })
      : []
    for (const data of outputMapData) {
      const map = data.doc
      const mapCamelName = Utils.snakeToCamel(Utils.firstCharUpper(map.name))
      const template = fs.readFileSync(`${tempPath}/ts_ballcap_admin_map.temp`, 'utf8')
      const code = template.replace(/\$\$DOCNAME/g, mapCamelName)

      let lines = code.split(/\r?\n/)

      // Import
      lines.splice(0, 0, ...data.imports)

      // DataField
      const dataFieldOffset = lines.findIndex((e) => e.includes('$$FIELD'))
      lines.splice(dataFieldOffset, 1, ...data.dataFieleds)

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
            const docPath = `${outputPath}/${domainName}`
            const dataFields = fdmd.getDataFields(doc)

            // Map Model
            const mapModelNames = DataField.getMapModelNames(dataFields)
            const mapModelImportLine = mapModelNames.map(
              (e) => `import { ${Utils.snakeToCamel(Utils.firstCharUpper(e))} } from '../${Utils.camelToSnake(e)}'`,
            )

            // DataField
            const dataFieldsLine = dataFields
              .filter((e) => !Object.values(ignoreFieldNames).includes(ignoreFieldNames[e.field]))
              .map((e) => `  ${getDataField(e)}`)

            // Collections
            const collectionLine = Utils.isNotNull(doc.collections)
              ? doc.collections.map((e) => `  @SubCollection ${e.field}: Collection<${e.type}> = new Collection()`)
              : []
            const collectionImportLine = Utils.isNotNull(doc.collections)
              ? doc.collections.map((e) => `import { ${e.type} } from './${Utils.camelToSnake(e.type)}'`)
              : []

            return new OutputData(
              [...mapModelImportLine, ...collectionImportLine],
              dataFieldsLine,
              `${docPath}/${docSnakeName}.ts`,
              collectionLine,
              doc,
            )
          })
      : []
    for (const data of outputDocsData) {
      const doc = data.doc
      const domainName = Doc.getDomainNameFromPath(doc.path)
      const docCamelName = Utils.snakeToCamel(Utils.firstCharUpper(doc.name))
      const template = fs.readFileSync(`${tempPath}/ts_ballcap_admin_doc.temp`, 'utf8')

      const collectionNameFromPath = (path?: string): string => {
        if (Utils.isNotNull(path)) {
          const split = path.split('/').filter((e) => e.length > 0)
          if (split[split.length - 1] === '') {
            split.pop()
          }
          return split[split.length - 2]
        }
        return ''
      }

      const code = template
        .replace(/\$\$DOCNAME/g, docCamelName)
        .replace(/\$\$DOMAIN/g, domainName)
        .replace(/\$\$PARENTDOCPATH/g, 'v1')
        .replace(/\$\$COLLECTIONNAME/g, collectionNameFromPath(doc.path))
      // console.log(code)

      let lines = code.split(/\r?\n/)

      // Import
      lines.splice(0, 0, ...data.imports)

      // DataField
      const dataFieldOffset = lines.findIndex((e) => e.includes('$$FIELD'))
      lines.splice(dataFieldOffset, 1, ...['', ...data.dataFieleds])

      const collectionOffset = lines.findIndex((e) => e.includes('$$SUBCOLLECTION'))
      if (data.collectionFieleds.length > 0) {
        lines.splice(collectionOffset, 1, ...['', ...data.collectionFieleds])
      } else {
        lines.splice(collectionOffset, 1, ...[''])
      }

      // Write
      const stream = fs.createWriteStream(data.outputFilePath, { encoding: 'utf8' })
      for (const l of lines) {
        stream.write(`${l}\n`)
      }
      stream.end()
    }
  }
}
