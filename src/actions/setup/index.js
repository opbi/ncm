import * as commonSteps from '../common-steps';
import * as steps from './steps';

export default async () => {
  const config = await commonSteps.readConfig();

  await commonSteps.cloneTemplateRepo(config);

  await steps.copyTemplateFiles();

  await commonSteps.removeTemplateDir();

  await steps.updatePackageJson(config);

  await steps.generateReadme(config);

  await steps.createGithubRepo(config);
  console.log(`GitHub repo created`);

  await steps.addGitRemoteOrigin(config);

  await steps.commitAndPushToGitHub();
};
