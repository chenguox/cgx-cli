const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const open = require('open');
const downloadRepo = promisify(require('download-git-repo'));

const log = require('../utils/log');
const terminal = require('../utils/terminal');
const { ejsCompile, mkdirSync, writeFile } = require('../utils/file');

// 仓库地址
const repoConfig = require('../config/repo_config.js');

/**
 * 创建项目
 * @param {*} project 项目名称
 * @param {*} otherArg 其他参数
 */
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

/**
 * 将 ejs 模板生成对应文件
 * @param {*} name 命令行定义的名称
 * @param {*} dest 文件输入的目录
 * @param {*} template 使用的 ejs 模板目录
 * @param {*} filename 输入的文件名
 */
const handleEjsToFile = async (name, dest, template, filename) => {
  // 1、获取模块引擎
  const templatePath = path.resolve(__dirname, template);
  const result = await ejsCompile(templatePath, { name, lowerName: name.toLowerCase() })

  // 2、写入文件中
  // 判断文件不存在，就创建文件
  mkdirSync(dest)
  const targetPath = path.resolve(dest, filename)
  writeFile(targetPath, result)
}

// 创建组件
const addComponent = async (name, dest) => {
  handleEjsToFile(name, dest, '../template/component.vue.ejs', `${name.toLowerCase()}.vue`);
}

// 创建状态管理
const addStore = async (name, dest) => {
  handleEjsToFile(name, dest, '../template/vue-store.ejs', `${name.toLowerCase()}.js`);
}

// 创建页面组件
const addPage = async (name, dest) => {
  addComponent(name, dest)
  handleEjsToFile(name, dest, '../template/vue-router.js.ejs', 'router.js')
}

module.exports = {
  createProject,
  addComponent,
  addStore,
  addPage
}