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



### 在 Node 程序中执行终端命令

1、使用 child_process 来开启一个子进程来执行我们的终端命令，可以使用 spawn 或者 exec，两个都可以，spawn 更接近于底层。

> const { spawn, exec } =require('child_process');

2、因为终端命令可能需要重复使用到，我们创建 terminal.js 文件，将需要使用的命令封装到这里。（具体代码，看 utils / terminal.js）

```
const spawnCommand = (...args) => {
  return new Promise((resole, reject) => {
    const childProcess = spawn(...args);
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    childProcess.on('close', () => {
      resole();
    })
  })
}
```

3、childProcess 是我们开启的另外一个子进程，我们需要这个 子进程执行 npm install，但是我们知道，进程中会有很多执行命令的过程中的打印信息，这些信息在我们的主进程是看不到的，childProcess 提供了一个 stdout 通过管道的方式，将流传输到 process.stdout ( process 是我们的进程，存着很多信息)

```
// 将子进程流的信息放到 process进程的 stdout 中
childProcess.stdout.pipe(process.stdout);
// 当然，也可将一些错误的信息放入到 process 进程的 stderr 中
childProcess.stderr.pipe(process.stderr);
```

监听 close 事件，在 npm install 执行完告诉我们，处理成 promise

```
 return new Promise((resole, reject) => {
    const childProcess = spawn(...args);
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    childProcess.on('close', () => {
      resole();
    })
  })
```

4、使用我们封装好的 spawn 函数执行终端命令 npm install

```
const terminal = require('../utils/terminal');
// 省略一些代码
await terminal.spawn('npm', ['install'], { cwd: `./${project}` });
```

5、但是，上面的代码是不严谨的，跑在 window 上是会报错的，因为 window 上的命令本质上执行的不是 npm, 而是 npm.cmd。即虽然我们执行 npm install，但是本质上是帮助我们执行 npm.cmd。但是，我们自己通过 spawn 是不会自动帮我们添加 cmd 的，所以，做个兼容判断。

```
// 判断我们的平台是否是 window 电脑
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
```


chalk 的使用

> npm install chalk

默认 node 在输出终端的文字都是黑白的，为了使输出不再单调，添加文字背景什么的，改变字体颜色什么的，我们可以使用 chalk.js 这个库。


使用 ejs 模板

ejs模板是需要编译的，所以这里我们封装一个工具

> npm install ejs

创建组件的流程


## 项目结构说明：

config :  相关配置文件，比如配置了重哪里下载我们的模板项目

template ：相关的 ejs 模板

utils ：工具的封装

* file : 处理ejs模板输出文件
* log : 控制台打印
* terminal : 终端命令

core ：核心模块

- action :  执行的action操作
- create :  指令统一写在这里
- help ：帮助
