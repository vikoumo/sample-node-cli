#!/usr/bin/env node

const path = require('path');
const inquirer = require('inquirer');
const fs = require('fs');
const ejs = require('ejs');

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Project name?'
  }
]).then(answer => {
  console.log(answer);
  const tempDir = path.join(__dirname, 'template');
  const destDir = process.cwd();

  fs.readdir(tempDir, (err, files) => {
    if(err) throw err;
    console.log(files);
    files.forEach(file => {
      ejs.renderFile(path.join(tempDir, file), answer, (err, res) => {
        if(err) throw err;
        fs.writeFileSync(path.join(destDir, file), res);
      })
    });
  });
})