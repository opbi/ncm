import cosmiconfig from 'cosmiconfig';
import octokit from '@octokit/rest';

import { exec } from 'lib/child-process';

const readConfig = async () => {
  const MODULE_NAME = 'ncm';
  const { config } = await cosmiconfig(MODULE_NAME).search();
  return config;
};

const initGh = async ({ authRequired = false }) => {
  const gh = octokit();
  if (authRequired) {
    if (process.env.NCM_AUTH_GITHUB_TOKEN) {
      throw Error('NCM_AUTH_GITHUB_TOKEN not found in environment');
    }
    await gh.authenticate({
      type: 'oauth',
      token: process.env.NCM_AUTH_GITHUB_TOKEN,
    });
  }
  return gh;
};

const addGitRemoteOrigin = async ({ packageName, organisation }) =>
  exec(
    `git add remote origin git@git@github.com:${organisation}/${packageName}`,
  );

export default async () => {
  const config = await readConfig();
  const gh = await initGh();
  await gh.repos.createInOrg({
    org: config.owner.organisation,
    name: config.package.name,
    description: config.package.description,
    private: config.package.private,
  });
  await addGitRemoteOrigin({
    organisation: config.owner.organisation,
    packageName: config.package.name,
  });
};
