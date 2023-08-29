import makeStylishFormat from './stylish.js';
import makeFormatPlain from './plain.js';

const getFormat = (tree, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return makeStylishFormat(tree);
    case 'plain':
      return makeFormatPlain(tree);
    case 'json':
      return JSON.stringify(tree, null, ' ');
    default:
      throw new Error(`Invalid format ${format}`);
  }
};

export default getFormat;
