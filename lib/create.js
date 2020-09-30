"use strict";

const fs = require("fs-extra");
const {
  exec,
  execSync
} = require("child_process");
const chalk = require("chalk");
// path
const path = require("path");
const CWD = process.cwd()
const templatePath = '../generator/template'
const inquirer = require("inquirer");
const gitUserName = require('git-user-name')
// const userEmail = require('git-user-email')
// const Creator = require("./Creator");
const generate = require('./generate') //自定义工具-用于基于模板拉取模块
const modulesData = require("../generator/modules")

const projectUrl1 = "git.n22.com.cn";
const projectUrl2 = "git.n22.com.cn:8089/rad/client-";
const projectUrl3 = "-template.git";

async function create(projectName, options, mode) {
  console.log("begain create >>>>>>");
  const cwd = options.cwd || process.cwd();
  const targetDir = path.resolve(cwd, projectName || ".");
  const projectUrlEnd = `${projectUrl2}${mode ? mode : "simple"}${projectUrl3}`;
  let projectUrl = "";
  const existFile = fs.existsSync(targetDir);
  let promptArray = [{
      name: 'userName',
      type: 'input',
      message: `请输入${projectUrl1}用户名:`,
      default: gitUserName(),
      required: true,
    },
    {
      name: 'password',
      type: 'password',
      message: `请输入${projectUrl1}密码:`,
      required: true,
    },
    {
      name: "gitIS",
      type: "list",
      message: `是否绑定git（如果为否即只拉取项目不保留.git，如果为是可以选择切换成自己的git源）:`,
      choices: [{
        name: "否",
        value: false
      }, {
        name: "是",
        value: true
      }, ],
    },
    {
      name: "modules",
      type: "checkbox",
      message: `选择需要拉取的模块模板（不需要可以不选择拉取）:`,
      choices: modulesData
    }
  ]
  if (existFile) {
    promptArray.unshift({
      name: "action",
      type: "list",
      message: `目录项目 ${chalk.cyan(targetDir)} 已经存在. 请选择:`,
      choices: [{
          name: "覆盖",
          value: "overwrite"
        },
        {
          name: "取消",
          value: false
        },
      ],
    })
  }

  const prom = await inquirer.prompt(promptArray);
  projectUrl = `http://${encodeURIComponent(prom.userName)}:${encodeURIComponent(
    prom.password,
  )}@${projectUrlEnd} ${projectName}`;
  // console.log(projectUrl);
  if (prom.action === "overwrite") {
    console.log(`\nRemoving ${chalk.cyan(targetDir)}...`);
    fs.removeSync(targetDir);
    clone(projectUrl, projectUrlEnd, targetDir, prom)
  } else {
    clone(projectUrl, projectUrlEnd, targetDir, prom)
  }
}

/**
 * 项目基础公共模板clone
 * @param {*} projectUrl git项目带用户名密码地址
 * @param {*} projectUrlEnd 项目git不带用户名密码地址
 * @param {*} targetDir 当前要创建项目文件目录地址
 * @param {*} userName git项目用户名
 * @param {*} gitIS 是否绑定git代码库源
 */
function clone(projectUrl, projectUrlEnd, targetDir, {
  userName,
  gitIS,
  modules
}) {
  //克隆模版
  console.log(chalk.green("\n Info: 模版拉取中..."));
  exec(`git clone ${projectUrl}`, (error, stdout, stderr) => {
    if (error) {
      if (error.message.indexOf("remote: HTTP Basic: Access denied") > -1) {
        console.log(chalk.red(`\n Error: <${userName}>用户授权失败！`));
      } else {
        console.log(error.message);
      }
      process.exit();
    }
    console.log(chalk.green("\n Info: 模版拉取成功！"));
    if (gitIS === false) {
      try {
        fs.removeSync(`${targetDir}/.git`);
        console.log(chalk.green("\n Info: 已成功地删除.git文件！"));
        let modulesIndex = 0;
        createModule(modules, targetDir, modulesIndex);
      } catch (err) {
        // 处理错误
        console.log(err);
        console.log(chalk.red(`\n Error: 删除.git文件出错！`));
      }
    } else {
      changeGitOrigin(`http://${projectUrlEnd}`, targetDir, modules);
    }
    // process.exit();
  });
}

/**
 * 切换git代码源
 * @param {*} projectUrl 项目git模板地址
 * @param {*} targetDir 当前要创建项目文件目录地址
 */
async function changeGitOrigin(projectUrl, targetDir, modules) {
  //相关选项构建
  const {
    gitChangeUrl
  } = await inquirer.prompt([{
    name: "gitChangeUrl",
    type: "input",
    message: `需要切换的git地址url:`,
    default: projectUrl, // 默认值,
  }, ]);
  if (gitChangeUrl !== projectUrl) {
    let cmdRemoteOr = `git remote rm origin`;
    let cmdRemoteAdd = `git remote add origin ${gitChangeUrl}`;
    execSync(cmdRemoteOr, {
      cwd: targetDir
    }, dealError);
    execSync(cmdRemoteAdd, {
      cwd: targetDir
    }, dealError);
    // await fs.rename(`${targetDir}/README.md`, `${targetDir}/README-LS.md`);
    execSync("git pull origin master --allow-unrelated-histories", {
      cwd: targetDir
    }, dealError);

    await fs.readFile(`${targetDir}/README.md`, "utf8", function (err, data) {
      if (err) throw err;
      let newContent = data + "\r\n\r\n\r\n[English](./README-en.md) | [简体中文](./README-zh.md)";
      fs.writeFile(`${targetDir}/README.md`, newContent, "utf8", err => {
        if (err) throw err;
        console.log("success done");
        execSync("git add .", {
          cwd: targetDir
        }, dealError);
        execSync(`git commit -m '文档初始化'`, {
          cwd: targetDir
        }, dealError);
        execSync("git push origin master", {
          cwd: targetDir
        }, dealError);
      });
    });
  }
  let modulesIndex = 0;
  createModule(modules, targetDir, modulesIndex);
}

/**
 * 拉取模板进行创建生成
 * @param {*} modules 
 */
function createModule(modules, targetDir, modulesIndex) {
  if (modules.length <= 0) {
    return;
  }
  try {
    const templatePathModule = `${templatePath}/${modules[modulesIndex]}`;
    // if (fs.existsSync(templatePathModule)) {
    generate(templatePathModule, path.resolve(CWD, `${targetDir}/modules/${modules[modulesIndex]}`), err => {
      if (err) console.log(chalk.red(`\n Error: ${err}`));
      console.log(chalk.green(`\n Info: Local template <${modules[modulesIndex]}> get success`));
      modulesIndex++
      if (modulesIndex + 1 <= modules.length) createModule(modules, targetDir, modulesIndex)
    })
    // } else {
    //   console.log(chalk.red(`\n Error: Local template <${modules[modulesIndex]}> not found`));
    //   modulesIndex++
    //   if (modulesIndex + 1 <= modules.length) createModule(modules, targetDir, modulesIndex);
    // }
  } catch (error) {
    console.log(chalk.red(`\n Error: ${error}`));
    return;
  }
}

//错误统一处理
function dealError(error, mes) {
  if (error) {
    console.log(error);
    process.exit();
  }
  console.log(chalk.green(`\n Info: ${mes}`));
}

module.exports = (...args) => {
  return create(...args).catch(err => {
    console.log(chalk.red("\n Info: 项目构建失败！"));
    console.log(err);
  });
};