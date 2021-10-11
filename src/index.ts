import { YamlRepository } from './repositories/yaml_repository'

const yamlDir = `${process.cwd()}/sample_yaml`

const execute = async () => {
  const data = YamlRepository.fetch(`${yamlDir}/sample.yaml`)
  console.log(data)
}

execute()
