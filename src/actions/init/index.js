import inquirer from 'inquirer';

import { PACKAGE_TYPES, COMPONENT_ENVS } from 'constants';

import * as steps from './steps';

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
    message: 'Is the component to be public?',
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
        await steps.createDir({ packageName });
        await steps.generatePackageJson({
          packageType,
          componentEnv,
          packagePublic,
          packageName,
          organisationID,
          npmScope,
          authorDetail,
        });
        await steps.copyConfigFiles({ packageType, packageName });
        await steps.updateReadme({
          packageType,
          packageName,
          organisationID,
          npmScope,
        });
        console.log(`created new [${packageType}] package ./${packageName}`);
      },
    );
