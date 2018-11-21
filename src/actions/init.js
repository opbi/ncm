import cpy from 'cpy';
import jsonfile from 'jsonfile';
import inquirer from 'inquirer';

import { mkdir } from 'lib/fs';
import { PACKAGE_TYPES, COMPONENT_ENVS, CWD, DOTFILES_FOLDER } from 'constants';

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

const questions = [
  {
    type: 'list',
    name: 'packageType',
    message: 'Which type of package do you want to create?',
    choices: PACKAGE_TYPES,
  },
  {
    type: 'list',
    name: 'componentEnv',
    message: 'Where the component will be used?',
    choices: COMPONENT_ENVS,
    when: ({ packageType }) => packageType === 'component',
  },
  {
    type: 'confirm',
    name: 'packagePublic',
    message: 'Is the component to be published?',
    default: true,
    when: ({ packageType }) => packageType === 'component',
  },
  {
    type: 'input',
    name: 'packageName',
    message: 'Enter the name of the package:',
  },
  {
    type: 'input',
    name: 'organisationID',
    message: 'Enter the github id of the organisation:',
  },
  {
    type: 'input',
    name: 'npmScope',
    message: 'Enter the organisation scope name in npm:',
    default: ({ organisationID }) => organisationID,
    when: ({ packagePublic }) => packagePublic,
  },
  {
    type: 'input',
    name: 'authorDetail',
    message: 'enter the name <contact-email> of the package',
    // TODO: add validation function
  },
];

export default () =>
  inquirer
    .prompt(questions)
    .then(
      async ({
        packageType,
        componentEnv,
        packagePublic,
        packageName,
        organisationID,
        npmScope,
        authorDetail,
      }) => {
        await mkdir(`${CWD}/${packageName}`);
        await mkdir(`${CWD}/${packageName}/src`);
        await generatePackageJson({
          packageType,
          componentEnv,
          packagePublic,
          packageName,
          organisationID,
          npmScope,
          authorDetail,
        });
        await copyConfigFiles({ packageType, packageName });
        console.log(`created new [${packageType}] package ./${packageName}`);
      },
    );
