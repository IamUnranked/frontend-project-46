import _ from "lodash";

const stringify = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return "[complex value]";
  }
  return String(value);
};

const getProperty = (path, key) => `${path}${key}`;

const iter = (tree, path = "") => {
  return tree.flatMap((node) => {
    switch (node.type) {
      case "added": {
        return [
          `Property '${getProperty(path, node.key)}' was added with value: ${stringify(
            node.value
          )}`,
        ];
      }
      case "changed": {
        return [
          `Property '${getProperty(path, node.key)}' was updated. From ${stringify(
            node.value1
          )} to ${stringify(node.value2)}`,
        ];
      }
      case "deleted": {
        return [
          `Property '${getProperty(path, node.key)}' was removed`,
        ]
      }
      case "nested": {
        return iter(node.children, `${path}${node.key}.`);
      }
      default: {
        return [];
      }
    }
  });
};

const makeFormatPlain = (tree) => {
  const result = iter(tree);
  return result.join("\n");
};

export default makeFormatPlain;
