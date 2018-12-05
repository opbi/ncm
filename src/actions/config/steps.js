import cpy from 'cpy';
import jsonfile from 'jsonfile';
import { exec } from 'lib/child-process';
import { sortObjectByKeys } from 'lib/util';

/**
 *  Copy only config files.
 */
export const copyConfigFiles = async () => {
  await cpy(
    [
      '.template/*',
      '.template/.*',
      '!.template/.ncmrc.yml', // there can be .ncmrc.yml in template
      '!.template/*.md',
      '!.template/package.json',
      '!.template/yarn.lock',
    ],
    '.',
  );
  await exec('cp -r .template/.circleci .');
};

/**
 * Merge devDependencies and optionalDependencies from template package.json.
 */
export const updatePackageJson = async () => {
  const template = await jsonfile.readFile('.template/package.json');
  const target = await jsonfile.readFile('./package.json');
  const updated = Object.assign({}, target);
  updated.devDependencies = sortObjectByKeys({
    ...target.devDependencies,
    ...template.devDependencies,
  });
  updated.optionalDependencies = sortObjectByKeys({
    ...target.optionalDependencies,
    ...template.optionalDependencies,
  });
  await jsonfile.writeFile('./package.json', updated, { spaces: 2 });
};
