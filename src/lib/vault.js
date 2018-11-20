import vault from 'node-vault';

import { readFile } from 'lib/fs';
import { HOME } from 'constants';

const getVaultTokenFromFile = async () => {
  const VAULT_TOKEN_FILE = '.vault-token';
  const token = await readFile(`${HOME}/${VAULT_TOKEN_FILE}`);
  return token;
};

const setupVaultWithGithubToken = async ({ endpoint }) => {
  const { VAULT_AUTH_GITHUB_TOKEN } = process.env;
  if (!VAULT_AUTH_GITHUB_TOKEN)
    throw Error('VAULT_AUTH_GITHUB_TOKEN not found');

  const vaultClient = vault({ endpoint });

  const res = await vaultClient.githubLogin({
    token: VAULT_AUTH_GITHUB_TOKEN,
  });
  vaultClient.token = res.auth.client_token;

  return vaultClient;
};

const setupVaultClient = async ({
  endpoint = process.env.VAULT_ADDR,
  token = process.env.VAULT_TOKEN,
  auth = 'token',
}) => {
  if (auth.toLowerCase() === 'github') {
    const vaultClient = await setupVaultWithGithubToken({ endpoint });
    return vaultClient;
  }
  if (token) {
    return vault({ endpoint, token });
  }
  try {
    const fileToken = await getVaultTokenFromFile();
    return vault({ endpoint, token: fileToken });
  } catch (e) {
    if (e.code === 'ENOENT') {
      throw Error(
        'vault access token is not provided and local vault not authenticated',
      );
    }
    throw e;
  }
};

const getVaultSecrets = async ({ endpoint, token, auth, scope }) => {
  const vaultClient = await setupVaultClient({ endpoint, token, auth });
  const { data } = await vaultClient.read(scope);
  return data;
};

export default getVaultSecrets;
