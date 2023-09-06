import _ from 'lodash';

const indent = (depth, spacesCount = 4) => {
  const replaсer = ' ';
  const signOffset = 2;
  return replaсer.repeat(depth * spacesCount - signOffset);
};

const stringify = (data, depth = 1) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const lines = Object.entries(data)
    .map(
      ([key, value]) => `${indent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`,
    )
    .join('\n');
  return `{\n${lines}\n${indent(depth)}  }`;
};

const iter = (node, depth = 1) => {
  switch (node.type) {
    case 'changed':
      return [
        `${indent(depth)}- ${node.key}: ${stringify(node.value1, depth)}`,
        `${indent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`,
      ];
    case 'unchanged':
      return `${indent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
    case 'deleted':
      return `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
    case 'added':
      return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
    case 'nested': {
      const lines = node.children
        .flatMap((child) => iter(child, depth + 1))
        .join('\n');
      return `${indent(depth)}  ${node.key}: {\n${lines}\n${indent(depth)}  }`;
    }

    default:
      throw new Error(`Unknown node.type ${node}`);
  }
};

const makeStylishFormat = (tree) => {
  const lines = tree.flatMap((node) => iter(node, 1)).join('\n');
  return `{\n${lines}\n}`;
};

export default makeStylishFormat;
