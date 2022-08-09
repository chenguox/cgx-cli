const program = require('commander');

const { createProject } = require('./actions');

const createCommands = () => {
  // 创建项目指令
  program.command('create <project> [otherArgs...]')
    .description('clone a repository into a newly created directory')
    .action(createProject);
}

module.exports = createCommands;