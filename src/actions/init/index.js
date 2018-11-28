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
    default: ({ packageType }) => packageType === 'component',
    when: ({ packageType }) => packageType === 'component',
  },
  {
    type: 'input',
    name: 'packageName',
    message: 'Enter the name of the package:',
  },
  {
    type: 'input',
    name: 'organisationGithub',
    message: 'Enter the organisation GitHub id:',
  },
  {
    type: 'input',
    name: 'organisationNpm',
    message: 'Enter the organisation npm scope name:',
    default: ({ organisationGithub }) => organisationGithub,
    when: ({ packageType, packagePublic }) =>
      packageType === 'component' && packagePublic,
  },
  {
    type: 'input',
    name: 'contactEmail',
    message: 'enter email of the primary maintainer:',
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
        organisationGithub,
        organisationNpm,
        contactEmail,
      }) => {
        await steps.createNcmrc({
          packageType,
          componentEnv,
          packagePublic,
          packageName,
          organisationGithub,
          organisationNpm,
          contactEmail,
        });
        await steps.addCommentsToNcmrc({ packageName });
        await steps.initGit({ packageName });
        console.log(
          `created new [${packageType}]: ./${packageName}\ncheck .ncmrc.yml and run 'ncm setup'`,
        );
      },
    );
