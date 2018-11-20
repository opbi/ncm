import getSecretsFromVault from 'lib/vault';
import { objToDotenv } from 'lib/format';
import { writeFile } from 'lib/fs';
import { CWD } from 'constants';

export default async ({ scope, endpoint, token, auth }) => {
  try {
    const secrets = await getSecretsFromVault({
      scope,
      endpoint,
      token,
      auth,
    });
    const content = objToDotenv(secrets);
    const DOTENV_FILENAME = '.env';
    await writeFile(`${CWD}/${DOTENV_FILENAME}`, content);
    console.log(`secrets have been written to .env:\n${content}`);
  } catch (e) {
    console.log(e);
  }
};
