import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import buildTree from './buildTree.js';

const genDiff = (filepath1, filepath2) => {

const getFile1 = path.resolve(process.cwd(), filepath1);
const getFile2 = path.resolve(process.cwd(), filepath2);

const readFile1 = fs.readFileSync(getFile1, 'utf-8');
const readFile2 = fs.readFileSync(getFile2, 'utf-8');

const object1 = JSON.parse(readFile1);
const object2 = JSON.parse(readFile2);

const newObj = buildTree(object1, object2);
return newObj;
};

export default genDiff;