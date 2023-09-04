import _ from 'lodash';

const tab = '    ';
const indent = (depth = 0) => tab.repeat(depth);

const stringify = (depthValue, depth = 0) => {
  const spacing = indent(depth);

  if (!_.isObject(depthValue)) {
    return String(depthValue);
  }
  const result = Object.entries(depthValue).map(([key, value]) => `${tab}${spacing}${key}: ${stringify(value, depth + 1)}`);

  return [
    '{',
    ...result,
    `${spacing}}`,
  ].join('\n');
};

const makeStylishFormat = (tree, depth = 0) => {
  const spacing = indent(depth);
  const result = tree.flatMap((node) => {
    switch (node.type) {
      case 'changed':
        return [
          `  ${spacing}- ${node.key}: ${stringify(node.value1, depth + 1)}`,
          `  ${spacing}+ ${node.key}: ${stringify(node.value2, depth + 1)}`,
        ];
      case 'unchanged':
        return `  ${spacing}  ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'deleted':
        return `  ${spacing}- ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'added':
        return `  ${spacing}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'nested':
        return `  ${spacing}  ${node.key}: ${makeStylishFormat(node.value, depth + 1)}`;
      default:
        throw new Error('Unknown node.type');
    }
  });

  return [
    '{',
    ...result,
    `${spacing}}`,
  ].join('\n');
};

export default makeStylishFormat;
