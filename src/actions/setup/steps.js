import cpy from 'cpy';
import cosmiconfig from 'cosmiconfig';
import jsonfile from 'jsonfile';
// import replace from 'replace-in-file';

// import { CWD } from 'constants';
import { setupGithubClient } from 'lib/github';
import { exec } from 'lib/child-process';

import configPackageJsonFromTemplate from './package-json';

// TODO: setup schema and sanitise config file
export const readConfig = async () => {
  const MODULE_NAME = 'ncm';
  const { config } = await cosmiconfig(MODULE_NAME).search();
  return config;
};

export const cloneTemplateRepo = async config => {
  const DEFAULT_TEMPLATE = `opbi/ncm-template-${config.package.type}`;
  const template = config.package.template || DEFAULT_TEMPLATE;
  await exec(`rm -rf .template`);
  await exec(`git clone git@github.com:${template}.git .template`);
};

export const copyTemplateFiles = async () => {
  await cpy(
    [
      '.template/*',
      '.template/.*',
      '!.template/.ncmrc.yml', // there can be .ncmrc.yml in template
    ],
    '.',
  );
  await exec('cp -r .template/src .');
  await exec('cp -r .template/.circle .');
};

export const removeTemplateDir = async () => exec('rm -rf .template');

export const updatePackageJson = async config => {
  const PACKAGE_JSON_PATH = './package.json';
  const template = await jsonfile.readFile(PACKAGE_JSON_PATH);
  const packageJson = configPackageJsonFromTemplate(config, template);
  await jsonfile.writeFile(PACKAGE_JSON_PATH, packageJson, {
    spaces: 2,
  });
};

// export const generateReadme = async ({
//   packageName,
//   organisationID,
//   npmScope,
// }) =>
//   replace({
//     files: `${CWD}/${packageName}/README.md`,
//     from: [/{{packageName}}/g, /{{organisationID}}/g, /{{npmScope}}/g],
//     to: [packageName, organisationID, npmScope],
//   });

export const createGithubRepo = async config => {
  const github = await setupGithubClient();
  await github.repos.createInOrg({
    org: config.owner.github,
    name: config.package.name,
    description: config.package.description,
    private: config.package.private,
  });
};

export const addGitRemoteOrigin = async config =>
  exec(
    `git add remote origin git@git@github.com:${config.owner.github}/${
      config.package.name
    }`,
  );

// export const setupCIPipeline = async config => {};

// export const setupCoveralls = async config => {};

// export const setupScrutinizer = async config => {};

// export const initGitCommit = async () => {};

// export const installDeps = async () => {};

// export const initGitPush = async () => {};
