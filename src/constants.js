import os from 'os';

export const PACKAGE_TYPES = ['app', 'component'];
export const COMPONENT_ENVS = ['node', 'cli'];

export const CWD = process.cwd(); // current working directory: location where node command is invoked
export const HOME = os.homedir();
export const DOTFILES_FOLDER = `${__dirname}/../dotfiles`;

export default {
  PACKAGE_TYPES,
  CWD,
  HOME,
  DOTFILES_FOLDER,
};
