import os from 'os';

export const PACKAGE_TYPES = ['component', 'service', 'app', 'job'];
export const COMPONENT_ENVS = ['node', 'cli', 'browser', 'universal'];
export const OWNERSHIP_TYPES = ['organisation', 'personal'];

export const CWD = process.cwd(); // current working directory: location where node command is invoked
export const HOME = os.homedir();
export const DOTFILES_FOLDER = `${__dirname}/../dotfiles`;

export default {
  PACKAGE_TYPES,
  CWD,
  HOME,
  DOTFILES_FOLDER,
};
