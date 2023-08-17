import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const testData = [
  ['file1.json', 'file2.json', undefined, 'expectedStylish.txt'],
  ['file1.yaml', 'file2.yaml', undefined, 'expectedStylish.txt'],
  ['file1.json', 'file2.json', 'stylish', 'expectedStylish.txt'],
  ['file1.yaml', 'file2.yaml', 'stylish', 'expectedStylish.txt'],
  ['file1.json', 'file2.json', 'plain', 'expectedPlain.txt'],
  ['file1.yaml', 'file2.yaml', 'plain', 'expectedPlain.txt'],
  ['file1.json', 'file2.json', 'json', 'expectedJson.txt'],
  ['file1.yaml', 'file2.yaml', 'json', 'expectedJson.txt'],
];

describe.each(testData)('%s', (file1, file2, format, expected) => {
  test('compareDiff', () => {
    const data1 = getFixturePath(file1);
    const data2 = getFixturePath(file2);
    expect(genDiff(data1, data2, format))
      .toEqual(readFile(expected));
  });
});
