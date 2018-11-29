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
  .description('create the ncm specs of a new component')
  .action(initAction);

cli
  .command('setup')
  .description('setup the new component according to .ncmrc.yml')
  .action(setupAction);

cli
  .command('dotfiles')
  .alias('dotfile')
  .alias('config')
  .alias('.config')
  .description('generate dotfiles based on template and specs in .ncmrc.yml')
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
