import { Doc } from './doc'

export class OutputData {
  constructor(imports: string[], dataFieleds: string[], outputFilePath: string, doc: Doc) {
    this.imports = imports
    this.dataFieleds = dataFieleds
    this.outputFilePath = outputFilePath
    this.doc = doc
  }
  imports: string[]
  dataFieleds: string[]
  outputFilePath: string
  doc: Doc
}
