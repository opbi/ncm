import cpy from 'cpy';
import jsonfile from 'jsonfile';
import inquirer from 'inquirer';

import { mkdir } from 'lib/fs';
import { PACKAGE_TYPES, CWD, DOTFILES_FOLDER } from 'constants';

export const generatePackageJson = async ({
  packageType,
  packageName,
  organisationName,
  authorDetail,
}) => {
  const TEMPLATE_PATH = `${DOTFILES_FOLDER}/${packageType}/package.json`;
  const template = await jsonfile.readFile(TEMPLATE_PATH);

  template.name = `@${organisationName}/${packageName}`;
  template.repository = template.repository
    .replace('<package-name>', packageName)
    .replace('<organisation>', organisationName);
  template.author = authorDetail;

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
    message: 'Choose the type of the package:',
    choices: PACKAGE_TYPES,
  },
  {
    type: 'input',
    name: 'packageName',
    message: 'Enter the name of the package:',
  },
  {
    type: 'input',
    name: 'organisationName',
    message: 'Enter the github id of the organisation:',
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
      async ({ packageType, packageName, organisationName, authorDetail }) => {
        await mkdir(`${CWD}/${packageName}`);
        await mkdir(`${CWD}/${packageName}/src`);
        await generatePackageJson({
          packageType,
          packageName,
          organisationName,
          authorDetail,
        });
        await copyConfigFiles({ packageType, packageName });
        console.log(`created new [${packageType}] package ./${packageName}`);
      },
    );
