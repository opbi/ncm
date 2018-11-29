import inquirer from 'inquirer';

import { COMPONENT_TYPES, PACKAGE_ENVIRONMENTS, OWNER_TYPES } from 'constants';
import * as steps from './steps';

const componentQuestions = [
  {
    type: 'list',
    name: 'componentType',
    message: 'Which type of component do you want to create?',
    choices: COMPONENT_TYPES,
  },
  {
    type: 'list',
    name: 'packageEnvironment',
    message: 'Where will the package be used?',
    choices: PACKAGE_ENVIRONMENTS,
    when: ({ componentType }) => componentType === 'package',
  },
  {
    type: 'confirm',
    name: 'componentPublic',
    message: 'Is the package to be public?',
    default: ({ componentType }) => componentType === 'package',
    when: ({ componentType }) => componentType === 'package',
  },
  {
    type: 'input',
    name: 'componentName',
    message: ({ componentType }) => `Enter the name of the ${componentType}:`,
    // TODO: offer hooks to add naming convention validation as plugin
  },
];

const ownerQuestions = [
  {
    type: 'list',
    name: 'ownerType',
    message: 'Which is the type of the owner?',
    choices: OWNER_TYPES,
  },
  {
    type: 'input',
    name: 'ownerGithub',
    message: ({ ownerType }) => `Enter the owner [${ownerType}] GitHub id:`,
  },
  {
    type: 'input',
    name: 'packageNpmScope',
    message: 'What is the npm scope name for the package?',
    default: ({ ownerType, ownerGithub }) =>
      ownerType === 'organisation' ? ownerGithub : undefined,
    when: ({ componentType, componentPublic }) =>
      componentType === 'package' && componentPublic,
  },
  {
    type: 'input',
    name: 'ownerEmail',
    message: 'Please enter the email of the primary maintainer:',
    // TODO: add validation function
  },
];

const questions = [...componentQuestions, ...ownerQuestions];

export default () =>
  inquirer.prompt(questions).then(async answers => {
    await steps.createNcmrc(answers);
    const { componentType, componentName } = answers;
    await steps.addCommentsToNcmrc({ componentName });
    await steps.initGit({ componentName });
    await steps.cdToComponentDir({ componentName });
    console.log(
      `created new [${componentType}]: ${componentName}\ncheck .ncmrc.yml and run 'ncm setup'`,
    );
  });
