import _ from 'lodash';

const data = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const keys = _.sortBy(_.union(keys1, keys2));
  return keys.map((key) => {
    if (!_.has(object2, key)) {
      return { key, value: object1[key], type: 'deleted' };
    }
    if (!_.has(object1, key)) {
      return { key, value: object2[key], type: 'added' };
    }
    if (_.isPlainObject(object1[key]) && _.isPlainObject(object2[key])) {
      return { key, value: data(object1[key], object2[key]), type: 'nested' };
    }
    if (object1[key] === object2[key]) {
      return { key, value: object1[key], type: 'unchanged' };
    }
    return {
      key, value1: object1[key], value2: object2[key], type: 'changed',
    };
  });
};

export default data;
