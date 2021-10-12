#! /usr/bin/env node

import * as rimraf from 'rimraf'
import { generateType } from './entities/constants'
import { DartGeneratorRepository } from './repositories/dart_generator_repository'
import { YamlRepository } from './repositories/yaml_repository'
import { Utils } from './utils/utils'

const generate =
  process.argv.indexOf('--generate') !== -1 ? process.argv[process.argv.indexOf('--generate') + 1] : 'all'
const yamlFilePathName =
  process.argv.indexOf('--inputFile') !== -1 ? process.argv[process.argv.indexOf('--inputFile') + 1] : 'yaml/db.yaml'
const tempFilePathName =
  process.argv.indexOf('--inputFile') !== -1 ? process.argv[process.argv.indexOf('--tempDir') + 1] : 'template'

const yamlFilePath = `${process.cwd()}/${yamlFilePathName}`
const outputPath = `${process.cwd()}/fdmd_output`
const tempPath = `${process.cwd()}/${tempFilePathName}`

const cleanup = async (path: string) => {
  console.log('🧹 cleanup.')
  rimraf.sync(path)
}

const execute = async () => {
  try {
    console.log('🏃 start generating.', generate)
    cleanup(outputPath)
    const data = YamlRepository.fetch(yamlFilePath)

    // Dart - freezed
    if (generate === generateType.all || generate == generateType.dartFreezed) {
      DartGeneratorRepository.generateToFreezed(
        data,
        `${outputPath}/${Utils.camelToSnake(generateType.dartFreezed)}`,
        `${tempPath}`,
      )
    }
    // TypeScript todo
    // TypeScript - Ballcap todo
    // Swift todo
    // Swift - Ballcap todo
    // Kotlin todo
    // HTML todo
    console.log('✅ successfully generated.')
  } catch (e) {
    console.error(e)
    console.log('failed.')
  }
}

execute()
