const program = require('commander');

const { createProject, addComponent, addStore, addPage } = require('./actions.js');

const createCommands = () => {
  // 创建项目指令
  program
    .command('create <project> [otherArgs...]')
    .description('clone a repository into a newly created directory')
    .action(createProject);

  // 创建组件
  program
    .command('addcpn <name>')
    .description('add vue component, 例如: coderwhy addcpn NavBar [-d src/components]')
    .action(name => addComponent(name, program.dest || 'src/components'))

  // 创建状态管理
  program
    .command('addstore <name>')
    .description('add vue store, 例如: cgx addstore favor [-d dest]')
    .action(name => {
      addStore(name, program.dest || `src/stores/modules/${name.toLowerCase()}`)
    })

  // 创建组件页面
  program
    .command('addpage <name>')
    .description('add vue page, 例如: coderwhy addpage Home [-d dest]')
    .action(name => {
      addPage(name, program.dest || `src/views/${name.toLowerCase()}`)
      addStore(name, program.dest || `src/stores/modules/${name.toLowerCase()}`)
    })
}

module.exports = createCommands;