import fs from 'fs';
import path from 'path';
import buildTree from './buildTree.js';
import parser from './parser.js';
import stylish from './formaters/stylish.js';

const genDiff = (filepath1, filepath2) => {
  const format1 = path.extname(filepath1).substring(1);
  const format2 = path.extname(filepath2).substring(1);

  const getFile1 = path.resolve(process.cwd(), filepath1);
  const getFile2 = path.resolve(process.cwd(), filepath2);

  const readFile1 = fs.readFileSync(getFile1, 'utf-8');
  const readFile2 = fs.readFileSync(getFile2, 'utf-8');

  const object1 = parser(readFile1, format1);
  const object2 = parser(readFile2, format2);

  const newObj = buildTree(object1, object2);
  return stylish(newObj);
};

export default genDiff;
