const chalk = require('chalk')

const log = console.log

const hint = (...info) => {
  log(chalk.blue(info))
}

const error = (...info) => {
  log(chalk.red(info))
}

const clear = () => {
  console.clear()
}

module.exports = {
  hint,
  error,
  clear
}