import fs from 'fs';
import path from 'path';
import buildTree from './buildTree.js';
import parse from './parser.js';
import getFormat from './formaters/index.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const excludeFormat = (filepath) => path.extname(filepath).substring(1);

const getFileData = (filepath) => {
  const data = fs.readFileSync(getFullPath(filepath), 'utf-8');
  return parse(data, excludeFormat(filepath));
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getFileData(filepath1);
  const data2 = getFileData(filepath2);

  const difference = buildTree(data1, data2);
  return getFormat(difference, formatName);
};

export default genDiff;
