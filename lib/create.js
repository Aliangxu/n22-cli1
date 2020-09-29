"use strict";

const fs = require("fs-extra");
const {
  exec,
  execSync
} = require("child_process");
const chalk = require("chalk");
const path = require("path");
const inquirer = require("inquirer");
const gitUserName = require('git-user-name')
// const userEmail = require('git-user-email')
// const Creator = require("./Creator");

const projectUrl1 = "git.n22.com.cn:8089/rad/client-";
const projectUrl3 = "-template.git";

async function create(projectName, options, mode) {
  console.log("begain create >>>>>>");
  const cwd = options.cwd || process.cwd();
  const targetDir = path.resolve(cwd, projectName || ".");
  const projectUrlEnd = `${projectUrl1}${mode ? mode : "simple"}${projectUrl3}`;
  let projectUrl = "";
  const existFile = fs.existsSync(targetDir);
  let promptArray = [{
      name: 'userName',
      type: 'input',
      message: `请输入${projectUrlEnd}用户名:`,
      default: gitUserName(),
      required: true,
    },
    {
      name: 'password',
      type: 'input',
      message: `请输入${projectUrlEnd}用密码:`,
      required: true,
    },
    {
      name: "gitIS",
      type: "list",
      message: `是否绑定git:`,
      choices: [{
        name: "否",
        value: false
      }, {
        name: "是",
        value: true
      }, ],
    },
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

  const {
    userName,
    password,
    action,
    gitIS
  } = await inquirer.prompt(promptArray);
  projectUrl = `http://${userName}:${password}@${projectUrlEnd} ${projectName}`;
  if (action === "overwrite") {
    console.log(`\nRemoving ${chalk.cyan(targetDir)}...`);
    await fs.remove(targetDir);
  }
  await clone(projectUrl, projectUrlEnd, targetDir, userName, gitIS)
}

function clone(projectUrl, projectUrlEnd, targetDir, userName, gitIS) {
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
      } catch (err) {
        // 处理错误
        console.log(err);
        console.log(chalk.red(`\n Error: 删除.git文件出错！`));
      }
    } else {
      build(`http://${projectUrlEnd}`, targetDir);
    }
    // process.exit();
  });
}

async function build(projectUrl, targetDir) {
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
    await execSync(cmdRemoteOr, {
      cwd: targetDir
    }, dealError);
    await execSync(cmdRemoteAdd, {
      cwd: targetDir
    }, dealError);
    // await fs.rename(`${targetDir}/README.md`, `${targetDir}/README-LS.md`);
    await execSync("git pull origin master --allow-unrelated-histories", {
      cwd: targetDir
    }, dealError);

    fs.readFile(`${targetDir}/README.md`, "utf8", function (err, data) {
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

    // await fs.remove(`${targetDir}/README.md`);
    // await fs.rename(`${targetDir}/README-en.md`, `${targetDir}/README.md`);
    // await exec(cmdRemoteOr, { cwd: targetDir }, (error, stdout, stderr) => {
    //   dealError(error, "删除git源成功！");
    //   exec(cmdRemoteAdd, { cwd: targetDir }, (error, stdout, stderr) => {
    //     dealError(error, "开始切换git源！");
    //     await fs.rename(`${targetDir}/README.md`, `${targetDir}/README-LS.md`);
    //     exec("git pull origin master --allow-unrelated-histories", { cwd: targetDir }, (error, stdout, stderr) => {
    //       if (error.message && error.message.indexOf("The project you were looking for could not be found") > -1) {
    //         console.log(
    //           chalk.red(
    //             "\n Error: 请检查新的数据仓库是否已经更新你的个人权限，或者确认一下切换的数据源地址是否正确！！！",
    //           ),
    //         );
    //         process.exit();
    //       }
    //       dealError(error, "切换git源成功！");
    //     });
    //   });
    // });
  } else {
    return
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