#!/usr/bin/env node

import cli from 'commander';

import initAction from 'actions/init';
import setupAction from 'actions/setup';
import configAction from 'actions/config';
import secretAction from 'actions/secret';

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
  .command('config')
  .option('-e, --environment [envID]', 'dev, ci')
  .option('-t, --target [targetTemplate]', 'repo of config files template')
  .description(
    'generate config files based on template and specs in .ncmrc.yml',
  )
  .action(configAction);

cli
  .command('secret')
  .alias('.env')
  .description('write vault dev secrets to .env')
  .option('-s, --scope <scope>', 'path of the secret in vault')
  .option('-e --endpoint [vaultEndpoint]', 'endpoint of the vault server')
  .option('-t, --token [token]', 'vault auth token')
  .option('-a, --auth [method]', 'vault auth method: [token], github')
  .action(secretAction);

cli.parse(process.argv);
