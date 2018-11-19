import getSecretsFromVault from 'lib/vault';
import { objToDotenv } from 'lib/format';
import { writeFile } from 'lib/fs';
import { CWD } from 'constants';

export default async ({ endpoint, token, github, scope }) => {
  try {
    const secrets = await getSecretsFromVault({
      endpoint,
      token,
      github,
      scope,
    });
    const content = objToDotenv(secrets);
    const DOTENV_FILENAME = '.env';
    await writeFile(`${CWD}/${DOTENV_FILENAME}`, content);
    console.log(`secrets have been written to .env:\n${content}`);
  } catch (e) {
    console.log(e);
  }
};
