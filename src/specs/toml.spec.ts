import { expect, it } from "vitest";
import json2toml from "json2toml";

import { convertTomlToCoreTypes } from "..";

it("handles all types of fields except null", () => {
  const toml = json2toml({
    foo: "bar",
    bar: 1,
    baz: true,
    quux: ["a", "b", "c"],
    quuz: { a: 1, b: 2, c: 3 },
    quuux: 1.5,
  });

  expect(convertTomlToCoreTypes(toml)).toMatchInlineSnapshot(`
    {
      "types": [
        {
          "additionalProperties": false,
          "name": "Default",
          "properties": {
            "bar": {
              "node": {
                "const": 1,
                "type": "integer",
              },
              "required": true,
            },
            "baz": {
              "node": {
                "const": true,
                "type": "boolean",
              },
              "required": true,
            },
            "foo": {
              "node": {
                "const": "bar",
                "type": "string",
              },
              "required": true,
            },
            "quuux": {
              "node": {
                "const": 1.5,
                "type": "number",
              },
              "required": true,
            },
            "quux": {
              "node": {
                "additionalItems": false,
                "elementTypes": [
                  {
                    "const": "a",
                    "type": "string",
                  },
                  {
                    "const": "b",
                    "type": "string",
                  },
                  {
                    "const": "c",
                    "type": "string",
                  },
                ],
                "minItems": 3,
                "type": "tuple",
              },
              "required": true,
            },
            "quuz": {
              "node": {
                "additionalProperties": false,
                "properties": {
                  "a": {
                    "node": {
                      "const": 1,
                      "type": "integer",
                    },
                    "required": true,
                  },
                  "b": {
                    "node": {
                      "const": 2,
                      "type": "integer",
                    },
                    "required": true,
                  },
                  "c": {
                    "node": {
                      "const": 3,
                      "type": "integer",
                    },
                    "required": true,
                  },
                },
                "type": "object",
              },
              "required": true,
            },
          },
          "type": "object",
        },
      ],
      "version": 1,
    }
  `);
});

it("supports a custom name", () => {
  const toml = json2toml({ foo: "bar" });

  expect(convertTomlToCoreTypes(toml, "CustomName")).toMatchInlineSnapshot(`
    {
      "types": [
        {
          "additionalProperties": false,
          "name": "CustomName",
          "properties": {
            "foo": {
              "node": {
                "const": "bar",
                "type": "string",
              },
              "required": true,
            },
          },
          "type": "object",
        },
      ],
      "version": 1,
    }
  `);
});
