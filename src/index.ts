import * as rimraf from 'rimraf'
import { DartGeneratorRepository } from './repositories/dart_generator_repository'
import { YamlRepository } from './repositories/yaml_repository'

const yamlDir = `${process.cwd()}/sample_yaml`
const outputPath = `${process.cwd()}/output`
const tempPath = `${process.cwd()}/template`

const cleanup = async (path: string) => {
  console.log('🧹 cleanup.')
  rimraf.sync(path)
}

const execute = async () => {
  try {
    console.log('🏃 start generating.')
    cleanup(outputPath)
    const data = YamlRepository.fetch(`${yamlDir}/sample.yaml`)

    // Dart - freezed
    DartGeneratorRepository.generateToFreezed(data, `${outputPath}/dart`, `${tempPath}`)

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
