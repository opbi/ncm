#!/usr/bin/env node

import cli from 'commander';

import dotenvAction from 'actions/dotenv';
import dotfilesAction from 'actions/dotfiles';
import initAction from 'actions/init';

import packageJson from '../package';

cli.version(packageJson.version, '-v, --version');

cli
  .command('dotenv')
  .alias('env')
  .alias('.env')
  .description('write vault dev secrets to .env')
  .option('-s, --scope <scope>', 'path of the secret in vault')
  .option('-e --endpoint [vaultEndpoint]', 'endpoint of the vault server')
  .option('-t, --token [token]', 'vault auth token')
  .option('-a, --auth [method]', 'vault auth method: [token], github')
  .action(dotenvAction);

cli
  .command('dotfiles')
  .alias('dotfile')
  .alias('config')
  .alias('.config')
  .description('get preset dotfiles of package type specified in ncm config')
  .action(dotfilesAction);

cli
  .command('init')
  .description('create a new package with preset configs')
  .action(initAction);

cli.parse(process.argv);
