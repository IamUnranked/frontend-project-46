import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectFile = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8');

const data1 = getFixturePath('file1.json');
const data2 = getFixturePath('file2.json');

test('genDiff.json', () => {
  expect(genDiff(data1, data2)).toEqual(expectFile);
});
