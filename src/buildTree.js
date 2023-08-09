import _ from 'lodash';

const buildTree = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const keys = _.sortBy(_.union(keys1, keys2));
  return keys.reduce((acc, key) => {
    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      return buildTree(object1[key], object2[key]);
    }
    if (!_.has(object2, key)) {
      return [acc, { key, value: object2[key], type: 'deleted' }];
    }
    if (!_.has(object1, key)) {
      return [acc, { key, value: object2[key], type: 'added' }];
    }
    if (object1[key] === object2[key]) {
      return [acc, { key, value: object1[key], type: 'unchanged' }];
    }
    return [acc, {
      key, value: object1[key], newValue: object2[key], type: 'changed',
    }];
  }, []);
};

export default buildTree;
