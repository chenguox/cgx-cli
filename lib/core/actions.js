const open = require('open');
const { promisify } = require('util');
const downloadRepo = promisify(require('download-git-repo'));

const log = require('../utils/log');
const terminal = require('../utils/terminal');

// 仓库地址
const repoConfig = require('../config/repo_config.js');

const createProject = async (project, otherArg) => {
  // 1、提示信息
  log.hint('helps you create your project, please wait a moment~');

  // 2、从仓库 clone 项目
  await downloadRepo(repoConfig.vueGitRepo, project, { clone: true });

  // 3、执行终端命令 npm install
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  await terminal.spawn(npm, ['install'], { cwd: `./${project}` });

  // 4、打开浏览器
  open('http://localhost:8080')

  // 5、运行项目
  await terminal.spawn(npm, ['run', 'dev'], { cwd: `./${project}` });
}

module.exports = {
  createProject
}