const open = require('open');
const { promisify } = require('util');
const downloadRepo = promisify(require('download-git-repo'));

const terminal = require('../utils/terminal');

// 仓库地址
const repoConfig = require('../config/repo_config');

const createProject = async (project, otherArg) => {
  // 1、提示信息

  // 2、从仓库 clone 项目
  await downloadRepo(repoConfig.vueGitRepo, project, { clone: true });

  // 3、执行终端命令 npm install
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  await terminal.spawn(npm, ['install'], { cwd: `./${project}` });

  // 4、打开浏览器
  open('http://localhost:8080')

  // 5、运行项目
  await terminal.spawn(npm, ['run, 'serve'], { cwd: `./${project}` });
}

module.exports = {
  createProject
}