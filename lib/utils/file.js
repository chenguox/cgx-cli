const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

const log = require('./log')

/**
 * 封装编译 ejs 文件的工具函数
 * @param {*} filename ejs模板的绝对路径
 * @param {*} data ejs 模板使用的数据
 * @param {*} options 
 * @returns 
 */
const ejsCompile = (filename, data = {}, options = {}) => {
  console.log('---ss-----:', data)
  return new Promise((resolve, reject) => {
    ejs.renderFile(filename, { data }, options, (err, str) => {
      console.log('--------:', data)
      // str => 输出渲染后的 HTML 字符串
      if (err) {
        reject(err);
        return
      }
      resolve(str)
    });
  })
}

// 写入文件
const writeFile = (path, content) => {
  if (fs.existsSync(path)) {
    log.error("the file already exists~")
    return
  }
  return fs.promises.writeFile(path, content)
}

// 创建目录
const mkdirSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    // 不存在，判断父文件夹是否存在
    if (mkdirSync(path.dirname(dirname))) {
      // 存在父文件，就直接新建该文件
      fs.mkdirSync(dirname)
      return true
    }
  }
}

module.exports = {
  ejsCompile,
  writeFile,
  mkdirSync
}