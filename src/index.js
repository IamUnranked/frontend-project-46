import fs from 'fs';
import path from 'path';
import buildTree from './buildTree.js';
import getParsedFileData from './parser.js';
import getFormat from './formaters/index.js';

const getFile = (filepath) => path.resolve(process.cwd(), filepath);
const readFileData = (filepath) => fs.readFileSync(filepath, 'utf-8');
const getFormatFile = (filepath) => path.extname(filepath).substring(1);

const getFileData = (filepath) => {
  const fileData = readFileData(getFile(filepath));
  const fileFormat = getFormatFile(filepath);
  return getParsedFileData(fileData, fileFormat);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileData1 = getFileData(filepath1);
  const fileData2 = getFileData(filepath2);

  const tree = buildTree(fileData1, fileData2);
  return getFormat(tree, formatName);
};

export default genDiff;
