#! /usr/bin/env node

'use strict';

const program = require('commander');
const pckg = require('../package.json');
const execa = require('execa');
const unzip = require('unzip');

program.version(pckg.version, '-v, --version');

program
  .command('new [name]')
  .description('clone module boilerplate and remove .git directory')
  .action(function (name) {
    if (typeof name !== 'undefined' && name.length) {
      return execa.shell('git clone https://github.com/ecrmnn/module-boilerplate.git ' + name)
        .then(ok => {
          return execa.shell('rm -rf ' + name + '/.git');
        })
        .then(ok => {
          console.log('Ready to go! (cd ' + name + '/)');
        });
    }
  });

program.parse(process.argv);