import _ from 'lodash';

const buildTree = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const keys = _.sortBy(_.union(keys1, keys2));
  const result = keys.reduce((acc, key) => {
    if (!_.has(object2, key)) {
      return `${acc}  - ${key}: ${object1[key]}\n`;
    }
    if (!_.has(object1, key)) {
      return `${acc}  + ${key}: ${object2[key]}\n`;
    }
    if (object1[key] !== object2[key]) {
      return `${acc}  - ${key}: ${object1[key]}\n  + ${key}: ${object2[key]}\n`;
    }
    return `${acc}    ${key}: ${object2[key]}\n`;
  }, '');
  return `{\n${result}}`;
};

export default buildTree;
