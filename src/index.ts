#! /usr/bin/env node

import * as rimraf from 'rimraf'
import { generateType } from './entities/constants'
import { DartFreezedGeneratorRepository } from './repositories/dart_freezed_generator_repository'
import { YamlRepository } from './repositories/yaml_repository'
import { Utils } from './utils/utils'

const generateOptionIndex = process.argv.indexOf('--generate')
const inputYamlOptionIndex = process.argv.indexOf('--inputFile')
const tempOptionIndex = process.argv.indexOf('--tempDir')

const generate = generateOptionIndex !== -1 ? process.argv[generateOptionIndex + 1] : 'all'
const yamlFilePathName = inputYamlOptionIndex !== -1 ? process.argv[inputYamlOptionIndex + 1] : 'yaml/db.yaml'
const tempFilePathName = tempOptionIndex !== -1 ? process.argv[tempOptionIndex + 1] : 'template'

const yamlFilePath = `${process.cwd()}/${yamlFilePathName}`
const outputPath = `${process.cwd()}/fdmd_output`
const tempPath = `${process.cwd()}/${tempFilePathName}`

const cleanup = async (path: string) => {
  console.log('🧹 cleanup')
  rimraf.sync(path)
}

const execute = async () => {
  try {
    console.log('🏃 generate type', generate)
    cleanup(outputPath)
    const data = YamlRepository.fetch(yamlFilePath)

    // Dart - freezed
    if (generate === generateType.all || generate == generateType.dartFreezed) {
      DartFreezedGeneratorRepository.execute(
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
    console.log('✅ successfully generated')
  } catch (e) {
    console.error(e)
    console.log('failed.')
  }
}

execute()
