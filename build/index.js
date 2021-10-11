"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yaml_repository_1 = require("./repositories/yaml_repository");
const yamlDir = `${process.cwd()}/sample_yaml`;
const execute = async () => {
    const data = yaml_repository_1.YamlRepository.fetch(`${yamlDir}/sample.yaml`);
    console.log(data);
};
execute();
//# sourceMappingURL=index.js.map