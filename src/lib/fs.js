import fs from 'fs';
import { promisify } from 'util';

export const readFile = (filePath, option = { encoding: 'utf-8' }) =>
  promisify(fs.readFile)(filePath, option);
export const writeFile = promisify(fs.writeFile);
export const mkdir = promisify(fs.mkdir);
