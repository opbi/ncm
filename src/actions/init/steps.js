import yaml from 'write-yaml';

import { readFile, writeFile } from 'lib/fs';
import { exec } from 'lib/child-process';

export const createNcmrc = async (answers) => {
  // TODO: parse answers to an object and validate against the schema
  const template = {
    component: {
      type: answers.componentType,
      name: answers.componentName,
      description: '',
      keywords: '',
      private: !answers.componentPublic,
    },
    ...(answers.componentType === 'package'
      ? {
          package: {
            environment: answers.packageEnvironment,
            npmScope: answers.packageNpmScope,
          },
        }
      : {}),
    owner: {
      type: answers.ownerType,
      github: answers.ownerGithub,
      team: '',
      name: '',
      email: answers.ownerEmail,
    },
  };
  const NCMRC_PATH = `./${answers.componentName}/.ncmrc.yml`;
  yaml.sync(NCMRC_PATH, template, {
    safe: true,
  });
};

export const addCommentsToNcmrc = async ({ componentName }) => {
  const NCMRC_PATH = `./${componentName}/.ncmrc.yml`;
  const template = await readFile(NCMRC_PATH);
  const updated = `## created by @opbi/ncm\n---\n${template}`;
  await writeFile(NCMRC_PATH, updated);
};

export const initGit = async ({ componentName }) =>
  exec(`git init -q ./${componentName}`);

export const cdToComponentDir = async ({ componentName }) =>
  exec(`cd ./${componentName}`);
