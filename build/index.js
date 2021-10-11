"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const yaml = require("js-yaml");
const yamlDir = `${process.cwd()}/sample_yaml`;
const execute = async () => {
    const bytes = fs.readFileSync(`${yamlDir}/sample.yaml`, 'utf8');
    const data = yaml.load(bytes);
    console.log(data);
};
execute();
//# sourceMappingURL=index.js.map