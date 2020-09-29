/* eslint-disable */
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const async = require('async')
const render = require('consolidate').handlebars.render
const path = require('path')
const chalk = require("chalk");

// register handlebars helper
Handlebars.registerHelper('if_eq', function (a, b, opts) {
  return a === b ?
    opts.fn(this) :
    opts.inverse(this)
})

Handlebars.registerHelper('unless_eq', function (a, b, opts) {
  return a === b ?
    opts.inverse(this) :
    opts.fn(this)
})

/**
 * Generate a template given a `src` and `dest`.
 *
 * @param {String} src 创建文件目录
 * @param {String} dest 创建输出目录
 * @param {Function} done
 */

module.exports = function generate(src, dest, done) {
  console.log(chalk.bgYellow.white(`\n 模板-${path.join(__dirname, src)}`));
  console.log(chalk.bgYellow.white(` 输出目录-${dest}`));
  const metalsmith = Metalsmith(path.join(__dirname, src))
  metalsmith
    .use(renderTemplateFiles())

  metalsmith.clean(false)
    .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
    .destination(dest)
    .build((err, files) => {
      done(err)
    })

  return
}

/**
 * Template in place plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */

function renderTemplateFiles() {
  return (files, metalsmith, done) => {
    const keys = Object.keys(files)
    // const metalsmithMetadata = metalsmith.metadata()
    async.each(keys, (file, next) => {
      const str = files[file].contents.toString()
      next();
      // do not attempt to render files that do not have mustaches
      // if (!/{{([^{}]+)}}/g.test(str)) {
      //   return next()
      // }
      // render(str, metalsmithMetadata, (err, res) => {
      //   if (err) {
      //     err.message = `[${file}] ${err.message}`
      //     return next(err)
      //   }
      //   files[file].contents = new Buffer.from(res)
      //   next()
      // })
    }, done)
  }
}