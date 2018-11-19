import fs from 'fs';
import { promisify } from 'util';

export const readFile = async (filePath, option = { encoding: 'utf-8' }) => {
  await promisify(fs.readFile)(filePath, option);
};
export const writeFile = promisify(fs.writeFile);
export const mkdir = promisify(fs.mkdir);
