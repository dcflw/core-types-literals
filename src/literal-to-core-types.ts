import { simplify } from "core-types";
import type {
  ConversionResult,
  BooleanType,
  IntegerType,
  NodeDocument,
  NodeType,
  NullType,
  NumberType,
  ObjectType,
  StringType,
  TupleType,
} from "core-types";

function convertLiteralStringToNode(string: string): StringType {
  return {
    type: "string",
    const: string,
  };
}

function convertLiteralNumberToNode(number: number): IntegerType | NumberType {
  if (Number.isInteger(number)) {
    return {
      type: "integer",
      const: number,
    };
  } else {
    return {
      type: "number",
      const: number,
    };
  }
}

function convertLiteralBooleanToNode(boolean: boolean): BooleanType {
  return {
    type: "boolean",
    const: boolean,
  };
}

function convertLiteralArrayToNode(array: Array<unknown>): TupleType {
  return {
    type: "tuple",
    elementTypes: array.map(convertLiteralToNode),
    minItems: array.length,
    additionalItems: false,
  };
}

function convertLiteralObjectToNode(object: object): ObjectType {
  return {
    type: "object",
    properties: Object.fromEntries(
      Object.entries(object).map(([key, value]) => {
        return [
          key,
          {
            required: true,
            node: convertLiteralToNode(value),
          } as ObjectType["properties"][string],
        ];
      }),
    ),
    additionalProperties: false,
  };
}

function convertLiteralNullToNode(): NullType {
  return {
    type: "null",
  };
}

function convertLiteralToNode(literal: unknown): NodeType {
  switch (typeof literal) {
    case "string":
      return convertLiteralStringToNode(literal);
    case "number":
      return convertLiteralNumberToNode(literal);
    case "boolean":
      return convertLiteralBooleanToNode(literal);
    case "object":
      if (literal === null) {
        return convertLiteralNullToNode();
      } else if (Array.isArray(literal)) {
        return convertLiteralArrayToNode(literal);
      } else {
        return convertLiteralObjectToNode(literal);
      }
    default:
      throw new Error(`Unknown literal type: ${typeof literal}`);
  }
}

export function convertObjectLiteralToCoreTypes(
  objectLiteral: Record<string, unknown>,
  name = "Default",
) {
  return {
    data: {
      version: 1,
      types: [
        {
          name,
          ...simplify(convertLiteralToNode(objectLiteral)),
        },
      ],
    },
    convertedTypes: [name],
    notConvertedTypes: [],
  } as ConversionResult<NodeDocument<1, ObjectType>>;
}
