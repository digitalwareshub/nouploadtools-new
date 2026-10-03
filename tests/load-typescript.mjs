import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';

// Use the repo's TypeScript compiler without adding a test-runner dependency.
export function loadTypeScript(path, imports = {}) {
  const file = new URL(`../${path}`, import.meta.url);
  const require = createRequire(file);
  const code = ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const compiled = { exports: {} };
  new Function('require', 'module', 'exports', code)(
    (name) => (Object.hasOwn(imports, name) ? imports[name] : require(name)),
    compiled,
    compiled.exports,
  );
  return compiled.exports;
}
