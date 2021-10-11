import * as fs from 'fs'
import * as yaml from 'js-yaml'

const yamlDir = `${process.cwd()}/sample_yaml`

const execute = async () => {
  const bytes = fs.readFileSync(`${yamlDir}/sample.yaml`, 'utf8')
  const data = yaml.load(bytes)
  console.log(data)
}

execute()
