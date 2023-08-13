import _ from 'lodash';

const tab = '    ';

const getValue = (depthValue, depth = 0) => {
  const indent = tab.repeat(depth);

  if (!_.isObject(depthValue)) {
    return depthValue;
  }
  const arr = Object.entries(depthValue);
  const result = arr.map(([key, value]) => `${tab}${indent}${key}: ${getValue(value, depth + 1)}`);

  return [
    '{',
    ...result,
    `${indent}}`,
  ].join('\n');
};

const stylish = (tree, depth = 0) => {
  const indent = tab.repeat(depth);
  const result = tree.flatMap((node) => {
    switch (node.type) {
      case 'changed':
        return [
          `  ${indent}- ${node.key}: ${getValue(node.value, depth + 1)}`,
          `  ${indent}+ ${node.key}: ${getValue(node.newValue, depth + 1)}`,
        ];
      case 'unchanged':
        return `  ${indent}  ${node.key}: ${getValue(node.value, depth + 1)}`;
      case 'deleted':
        return `  ${indent}- ${node.key}: ${getValue(node.value, depth + 1)}`;
      case 'added':
        return `  ${indent}+ ${node.key}: ${getValue(node.value, depth + 1)}`;
      case 'nested':
        return `  ${indent}  ${node.key}: ${stylish(node.value, depth + 1)}`;
      default:
        throw new Error('Unknown node.type');
    }
  });

  return [
    '{',
    ...result,
    `${indent}}`,
  ].join('\n');
};

export default stylish;
