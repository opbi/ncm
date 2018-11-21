import cpy from 'cpy';
import jsonfile from 'jsonfile';
import replace from 'replace-in-file';

import { mkdir } from 'lib/fs';
import { CWD, DOTFILES_FOLDER } from 'constants';

export const createDir = async ({ packageName }) => {
  await mkdir(`${CWD}/${packageName}`);
  await mkdir(`${CWD}/${packageName}/src`);
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

  const TARGET_PATH = `${CWD}/${packageName}/pacakge.json`;
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
