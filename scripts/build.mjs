import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))

mkdirSync(join(root, 'lib'), { recursive: true })

const hostFiles = ['index.js', 'routes.js', 'plugin-list.js', 'patch-store.js', 'settings-switches.js']
for (const file of hostFiles) {
  copyFileSync(join(root, 'src', file), join(root, 'lib', file))
}

const factory = readFileSync(join(root, 'src', 'client.js'), 'utf8')
const banner = 'window.__ModuleLoader__.load({\n' +
  '\tid: ' + JSON.stringify(pkg.name) + ',\n' +
  '\tfactory: (require) => {\n' +
  '\t\tvar module = { exports: {} };\n' +
  '\t\tvar exports = module.exports;\n' +
  '\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: "Module" });\n'
const footer = '\n\t\treturn module.exports;\n\t}\n});\n'
writeFileSync(join(root, 'lib', 'client.js'), banner + factory + footer)
console.log('built lib/')
