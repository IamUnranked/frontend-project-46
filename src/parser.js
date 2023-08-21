import yaml from 'js-yaml';

const getParsedFileData = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error('Invalid format');
  }
};

export default getParsedFileData;
