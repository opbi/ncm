import os from 'os';

export const COMPONENT_TYPES = [
  'package',
  'service',
  'worker(TODO)',
  'app(TODO)',
];
export const PACKAGE_ENVIRONMENTS = [
  'node',
  'cli',
  'browser(TODO)',
  'universal(TODO)',
];
export const OWNER_TYPES = ['organisation', 'personal'];

export const CWD = process.cwd(); // current working directory: location where node command is invoked
export const HOME = os.homedir();
