import stylish from './stylish.js';
import plain from './plain.js';
import getJson from './json.js';

const getFormat = (tree, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return getJson(tree);
    default:
      throw new Error('Invalid file'`${format}`);
  }
};

export default getFormat;
