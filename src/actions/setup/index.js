import * as steps from './steps';

export default async () => {
  const config = await steps.readConfig();

  await steps.cloneTemplateRepo(config);

  await steps.copyTemplateFiles();

  await steps.removeTemplateDir();

  await steps.updatePackageJson(config);

  // await steps.generateReadme(config);

  await steps.createGithubRepo(config);
  console.log(`GitHub repo created`);
  // await steps.addGitRemoteOrigin(config);
};
