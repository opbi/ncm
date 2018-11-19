import cpy from 'cpy';
import cosmiconfig from 'cosmiconfig';
import jsonfile from 'jsonfile';
import { PACKAGE_TYPES, CWD, DOTFILES_FOLDER } from 'constants';
import { sortObjectByKeys } from 'lib/util';

export const updateDevDependencies = async (target, type) => {
  if (!PACKAGE_TYPES.includes(type))
    throw Error(
      `type in ncm config needs to be ['app', 'service', 'component']`,
    );

  const template = await jsonfile.readFile(
    `${DOTFILES_FOLDER}/${type}/package.json`,
  );

  const updated = {
    ...target,
    devDependencies: sortObjectByKeys({
      ...target.devDependencies,
      ...template.devDependencies,
    }),
  };

  await jsonfile.writeFile(`${CWD}/package.json`, updated, {
    spaces: 2,
  });
};

export const copyConfigFiles = async type =>
  cpy(
    [
      `${DOTFILES_FOLDER}/common/*`,
      `${DOTFILES_FOLDER}/common/.*`,
      `${DOTFILES_FOLDER}/${type}/*`,
      `${DOTFILES_FOLDER}/${type}/.*`,
      `!${DOTFILES_FOLDER}/${type}/package.json`, // don't copy the package.json
    ],
    '.',
  );

export default async () => {
  const MODULE_NAME = 'ncm';
  const PACKAGE_JSON_PATH = `${CWD}/package.json`;
  const { config } = await cosmiconfig(MODULE_NAME).search();
  const { type } = config;
  const target = await jsonfile.readFile(PACKAGE_JSON_PATH);

  await updateDevDependencies(target, type);
  console.log('package.json devDependencies updated');

  await copyConfigFiles(type);
  console.log(`copy preset config files of [${target.type}]`);
};
