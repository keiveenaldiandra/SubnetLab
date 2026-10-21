const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

// Compile the existing TypeScript sources in memory; no additional test dependency.
function loadTs(filename) {
  const file = path.resolve(__dirname, "..", filename);
  const { outputText } = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
  });
  const module = { exports: {} };
  const localRequire = (name) => name.startsWith(".")
    ? loadTs(path.resolve(path.dirname(file), `${name}.ts`))
    : require(name);
  new Function("require", "module", "exports", outputText)(localRequire, module, module.exports);
  return module.exports;
}

module.exports = { loadTs };
