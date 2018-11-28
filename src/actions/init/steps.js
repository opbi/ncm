import cpy from 'cpy';
import jsonfile from 'jsonfile';
import replace from 'replace-in-file';
import yaml from 'write-yaml';

import { mkdir, readFile, writeFile } from 'lib/fs';
import { exec } from 'lib/child-process';
import { CWD, DOTFILES_FOLDER } from 'constants';

export const createDir = async ({ packageName }) => {
  const PACKAGE_DIR = `${CWD}/${packageName}`;
  await mkdir(PACKAGE_DIR);
  await mkdir(`${PACKAGE_DIR}/src`);
  await writeFile(`${PACKAGE_DIR}/src/index.js`, '');
};

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
  console.log(template);
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

export const generatePackageJson = async ({
  packageType,
  componentEnv,
  packagePublic,
  packageName,
  organisationID,
  npmScope,
  authorDetail,
}) => {
  const TEMPLATE_PATH = `${DOTFILES_FOLDER}/${packageType}/package.json`;
  const template = await jsonfile.readFile(TEMPLATE_PATH);

  template.name = `@${npmScope}/${packageName}`;
  template.repository = `git@github.com:${organisationID}/${packageName}.git`;
  template.author = authorDetail;

  if (packagePublic) {
    // make it compatible with semantic-release
    delete template.private;
    template.publishConfig = {
      access: 'public',
    };
  }

  if (componentEnv === 'cli') {
    delete template.main;
    template.bin = {
      [packageName]: 'dist/index.js',
    };
  }

  const TARGET_PATH = `${CWD}/${packageName}/package.json`;
  await jsonfile.writeFile(TARGET_PATH, template, {
    spaces: 2,
  });
};

export const copyConfigFiles = async ({ packageType, packageName }) =>
  cpy(
    [
      `${DOTFILES_FOLDER}/common/*`,
      `${DOTFILES_FOLDER}/common/.*`,
      `${DOTFILES_FOLDER}/${packageType}/*`,
      `${DOTFILES_FOLDER}/${packageType}/.*`,
      `!${DOTFILES_FOLDER}/${packageType}/package.json`, // don't copy the package.json
    ],
    `./${packageName}`,
  );

export const updateReadme = async ({ packageName, organisationID, npmScope }) =>
  replace({
    files: `${CWD}/${packageName}/README.md`,
    from: [/{{packageName}}/g, /{{organisationID}}/g, /{{npmScope}}/g],
    to: [packageName, organisationID, npmScope],
  });

export const initGit = async ({ packageName }) =>
  exec(`git init -q ${CWD}/${packageName}`);
