import yaml from 'write-yaml';

import { readFile, writeFile } from 'lib/fs';
import { exec } from 'lib/child-process';
import { CWD } from 'constants';

export const createNcmrc = async ({
  packageType,
  componentEnv,
  packagePublic,
  packageName,
  organisationGithub,
  organisationNpm,
  contactEmail,
}) => {
  const template = {
    language: {
      type: 'node',
      version: 8,
    },
    package: {
      type: packageType,
      template: '',
      name: packageName,
      description: '',
      keywords: '',
      private: !packagePublic,
    },
    ...(packageType === 'component'
      ? { component: { environment: componentEnv } }
      : {}),
    owner: {
      github: organisationGithub,
      team: '',
      author: '',
      email: contactEmail,
      npm: organisationNpm,
    },
  };
  const NCMRC_PATH = `${CWD}/${packageName}/.ncmrc.yml`;
  yaml.sync(NCMRC_PATH, template, {
    safe: true,
  });
};

export const addCommentsToNcmrc = async ({ packageName }) => {
  const NCMRC_PATH = `${CWD}/${packageName}/.ncmrc.yml`;
  const template = await readFile(NCMRC_PATH);
  const updated = `## created by @opbi/ncm\n---\n${template}`;
  await writeFile(NCMRC_PATH, updated);
};

export const initGit = async ({ packageName }) =>
  exec(`git init -q ${CWD}/${packageName}`);
