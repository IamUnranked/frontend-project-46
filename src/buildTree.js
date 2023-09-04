import _ from 'lodash';

const data = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));
  return keys.map((key) => {
    if (!_.has(data2, key)) {
      return { key, value: data1[key], type: 'deleted' };
    }
    if (!_.has(data1, key)) {
      return { key, value: data2[key], type: 'added' };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, value: data(data1[key], data2[key]), type: 'nested' };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { key, value: data1[key], type: 'unchanged' };
    }
    return {
      key, value1: data1[key], value2: data2[key], type: 'changed',
    };
  });
};

export default data;
