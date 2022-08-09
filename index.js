#!/usr/bin/env node
const program = require('commander');

const createCommands = require('./lib/core/create.js');

// 定义显示模块的版本号
program.version(require('./package.json').version);

// 创建命令
createCommands();

program.parse(process.argv)