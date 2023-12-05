# core-types-literals

A [`core-types`](https://github.com/grantila/core-types)-compliant reader for literal JSON, YAML, and TOML files. This is useful if you want to generate a TypeScript interface for your literal JSON file, like a locale object using [Typeconv](https://github.com/grantila/typeconv).

## Usage

Install this package and `typeconv`:

```bash
npm add -D core-types-literals typeconv
```

Then create a JS file like this:

```js
import { makeConverter, getTypeScriptWriter } from "typeconv";
import { convertYamlToCoreTypes } from "core-types-literals";

/** @returns {import("typeconv").Reader} */
export function getYamlLiteralReader(name) {
  return {
    kind: "yaml",
    read: (x) => convertYamlToCoreTypes(x, name),
  };
}

const { convert } = makeConverter(
  getYamlLiteralReader("MyInterfaceName"),
  getTypeScriptWriter({ warn: console.warn }),
);

const inputYaml = { data: "hello: World" };
const { data: outputTs } = await convert(inputYaml);
console.log(outputTs);
// export interface MyInterfaceName {
//   hello: "World";
// }
```

Or combine with reading from/writing to files:

```js
// same stuff as above…
import { readFile, writeFile } from "fs/promises";

const inputFileUrl = new URL("../locales/en.yaml", import.meta.url);
const outputTypingsUrl = new URL("./en.i18n.d.ts", import.meta.url);
readFile(i18nFileUrl, "utf8")
  .then((yamlContents) => convert({ data: yamlContents }))
  .then(({ data: tsInterface }) => writeFile(typingsUrl, tsInterface));
```

## License

ISC
