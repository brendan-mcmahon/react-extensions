import fs = require("fs");
var path = require('path');

export function buildTemplate(componentName: string): string {
    return fs.readFileSync(path.join(path.dirname(__dirname), '/src/template.txt'), 'utf-8')
        .replace(/<COMPONENTNAME>/g, componentName);
}