import octokit from '@octokit/rest';

export const setupGithubClient = async ({ authRequired = false }) => {
  const github = octokit();
  if (authRequired) {
    if (process.env.NCM_AUTH_GITHUB_TOKEN) {
      throw Error('NCM_AUTH_GITHUB_TOKEN not found in environment');
    }
    await github.authenticate({
      type: 'oauth',
      token: process.env.NCM_AUTH_GITHUB_TOKEN,
    });
  }
  return github;
};

export default {};
