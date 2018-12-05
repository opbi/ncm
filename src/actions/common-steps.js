import cosmiconfig from 'cosmiconfig';
import { exec } from 'lib/child-process';

// TODO: setup schema and sanitise config file
export const readConfig = async () => {
  const MODULE_NAME = 'ncm';
  const { config } = await cosmiconfig(MODULE_NAME).search();
  return config;
};

export const cloneTemplateRepo = async config => {
  const DEFAULT_TEMPLATE = `opbi/ncm-preset-${config.component.type}`;
  const template = config.component.template || DEFAULT_TEMPLATE;
  await exec(`rm -rf .template`);
  await exec(`git clone git@github.com:${template}.git .template`);
};

export const removeTemplateDir = async () => exec('rm -rf .template');
