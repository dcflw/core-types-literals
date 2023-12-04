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
  getYamlLiteralReader(),
  getTypeScriptWriter({ warn: console.warn }),
);

console.log(
  (
    await convert({
      data: `
name: "John"
age: 42`,
    })
  ).data,
);
