"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YamlRepository = void 0;
const fs = require("fs");
const yaml = require("js-yaml");
class YamlRepository {
    static fetch(filePath) {
        const bytes = fs.readFileSync(filePath, 'utf8');
        const data = yaml.load(bytes);
        return data;
    }
}
exports.YamlRepository = YamlRepository;
//# sourceMappingURL=yaml_repository.js.map