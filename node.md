在 index.js 开头添加

> #!/usr/bin/env node

在 package.json 中配置了 bin 后，执行 npm link 命令，会将上面的命令配置到执行终端里面，即执行 cgx，等同于执行 node index.js

> npm link

借助大神 TJ 开发的 commander 库，非常好用

> npm install commander

为了实现从 github 上将代码下载下载，我们这里使用 download-git-repo

> npm install download-git-repo

使用 promisify ，将我们的函数转成 promise 的形式，进而采用 async 和 await，避免回调地狱

```
const { promisify } = require('util');
const downloadRepo = promisify(require('download-git-repo'));
```



在 Node 程序中执行终端命令

使用 child_process 来开启一个子进程来执行我们的终端命令，可以使用 spawn 或者 exec，两个都可以，spawn 更接近于底层。因为终端命令可能需要重复使用到，我们创建 terminal.js 文件，将需要使用的命令封装到这里。


执行终端命令 npm install

```
const terminal = require('../utils/terminal');
// 省略一些代码
await terminal.spawn('npm', ['install'], { cwd: `./${project}` });
```

上面执行 'npm'，跑在 window 上是会报错的，因为 window 上的命令本质上执行的不是 npm, 而是 npm.cmd。即虽然我们执行 npm install，但是本质上是帮助我们执行 npm.cmd。但是，我们自己通过 spawn 是不会自动帮我们添加 cmd 的

```
// 判断我们的平台是否是 window 电脑
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
```



项目结构说明：

config :  相关配置文件，比如配置了重哪里下载我们的模板项目

template ：相关的 ejs 模板

utils ：工具的封装

core ：核心模块

- action :
- create :  指令统一写在这里
- help ：
