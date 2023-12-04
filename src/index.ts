import YAML from "yaml";
import TOML from "toml";

import { convertObjectLiteralToCoreTypes } from "./literal-to-core-types";

export function convertJsonToCoreTypes(json: string, name = "Default") {
  return convertObjectLiteralToCoreTypes(JSON.parse(json), name);
}

export function convertYamlToCoreTypes(yaml: string, name = "Default") {
  return convertObjectLiteralToCoreTypes(YAML.parse(yaml), name);
}

export function convertTomlToCoreTypes(toml: string, name = "Default") {
  return convertObjectLiteralToCoreTypes(TOML.parse(toml), name);
}
