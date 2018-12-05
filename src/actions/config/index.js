import * as commonSteps from '../common-steps';
import * as steps from './steps';

export default async () => {
  const config = await commonSteps.readConfig();

  await commonSteps.cloneTemplateRepo(config);

  await steps.copyConfigFiles();

  await steps.updatePackageJson();

  await commonSteps.removeTemplateDir();
};
