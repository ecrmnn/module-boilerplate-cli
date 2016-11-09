'use strict';

const chai = require('chai');
const expect = require('chai').expect;
const execa = require('execa');

describe('Module Boilerplate CLI Test Suite', function () {
  let result;
  const name = 'app' + Math.floor(Math.random() * 100000000);

  before(function (done) {
    execa.shell('node ./src/index.js new ' + name)
      .then(response => {
        result = response.stdout;

        return execa.shell('ls');
      })
      .then(response => {
        result = response.stdout;

        done();
      })
      .catch(error => {
        console.log(error);

        done();
      });
  });

  it('clone repository', function () {
    const files = result.split('\n');

    expect(files.indexOf(name)).not.to.eql(-1);
  });

  after(function (done) {
    execa.shell('rm -rf ' + name + '/')
      .then(response => {
        done();
      });
  });
});