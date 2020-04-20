import cpy from 'cpy';
import jsonfile from 'jsonfile';
import replace from 'replace-in-file';

import { setupGithubClient } from 'lib/github';
import { exec } from 'lib/child-process';

import configPackageJsonFromTemplate from 'lib/package-json';

export const copyTemplateFiles = async () => {
  await cpy(
    [
      '.template/*',
      '.template/.*',
      '!.template/.ncmrc.yml', // there can be .ncmrc.yml in template
      '!.template/README.md',
    ],
    '.',
    {
      rename: (fileName) =>
        fileName === 'TEMPLATE.md' ? 'README.md' : fileName,
    },
  );
  await exec('cp -r .template/src .');
  await exec('cp -r .template/.circleci .');
};

export const updatePackageJson = async (config) => {
  const PACKAGE_JSON_PATH = './package.json';
  const template = await jsonfile.readFile(PACKAGE_JSON_PATH);
  const packageJson = configPackageJsonFromTemplate(config, template);
  await jsonfile.writeFile(PACKAGE_JSON_PATH, packageJson, {
    spaces: 2,
  });
};

export const generateReadme = async (config) => {
  const PACKAGE_JSON_PATH = './package.json';
  const {
    name: packageJsonName,
    license: packageJsonLicense,
  } = await jsonfile.readFile(PACKAGE_JSON_PATH);
  await replace({
    files: `./README.md`,
    from: [
      /{{componentName}}/g,
      /{{componentDescription}}/g,
      /{{ownerGithub}}/g,
      /{{packageJsonName}}/g,
      /{{packageJsonLicense}}/g,
    ],
    to: [
      config.component.name,
      config.component.description,
      config.owner.github,
      packageJsonName,
      packageJsonLicense,
    ],
  });
};

export const createGithubRepo = async (config) => {
  const authRequired =
    config.owner.type === 'organisation' || config.component.private;
  const github = await setupGithubClient({ authRequired });
  await github.repos.createInOrg({
    org: config.owner.github,
    name: config.component.name,
    description: config.component.description,
    private: config.component.private,
  });
};

export const addGitRemoteOrigin = async (config) =>
  exec(
    `git remote add origin git@github.com:${config.owner.github}/${config.component.name}.git`,
  );

export const commitAndPushToGitHub = async () => {
  await exec('git add .');
  await exec(`git commit -m 'chore: init'`);
  await exec('git push -u origin master');
};

// export const installDeps = async () => {};
