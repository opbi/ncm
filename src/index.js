#!/usr/bin/env node

import cli from 'commander';

import initAction from 'actions/init';
import setupAction from 'actions/setup';
import dotfilesAction from 'actions/dotfiles';
import dotenvAction from 'actions/dotenv';

import packageJson from '../package';

cli.version(packageJson.version, '-v, --version');

cli
  .command('init')
  .description('create a new package with preset configs')
  .action(initAction);

cli
  .command('setup')
  .description('setup configured vcs and ci services')
  .action(setupAction);

cli
  .command('dotfiles')
  .alias('dotfile')
  .alias('config')
  .alias('.config')
  .description('get preset dotfiles of package type specified in ncm config')
  .action(dotfilesAction);

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

cli.parse(process.argv);
