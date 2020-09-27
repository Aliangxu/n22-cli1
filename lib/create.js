"use strict";

const fs = require("fs-extra");
const { exec, execSync } = require("child_process");
const chalk = require("chalk");
const path = require("path");
const inquirer = require("inquirer");
// const Creator = require("./Creator");

const projectUrl1 = "http://git.n22.com.cn:8089/rad/client-";
const projectUrl3 = "-template.git";

async function create(projectName, options, mode) {
  console.log("begain create >>>>>>");
  const cwd = options.cwd || process.cwd();
  const targetDir = path.resolve(cwd, projectName || ".");
  const projectUrl = `${projectUrl1}${mode ? mode : "simple"}${projectUrl3} ${projectName}`;
  let cmdStr = `git clone ${projectUrl}`;

  if (fs.existsSync(targetDir)) {
    const { action } = await inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: `目录项目 ${chalk.cyan(targetDir)} 已经存在. 请选择:`,
        choices: [
          { name: "覆盖", value: "overwrite" },
          { name: "取消", value: false },
        ],
      },
      {
        name: "gitIS",
        type: "list",
        message: `是否绑定git:`,
        choices: [
          { name: "是", value: true },
          { name: "否", value: false },
        ],
      },
    ]);
    if (!action) {
      return;
    } else if (action === "overwrite") {
      console.log(`\nRemoving ${chalk.cyan(targetDir)}...`);

      await fs.remove(targetDir);
    }
  }
  //克隆模版
  console.log(chalk.green("\n Info: 模版拉取中..."));
  await exec(cmdStr, (error, stdout, stderr) => {
    if (error) {
      console.log(error);
      process.exit();
    }
    console.log(chalk.green("\n Info: 模版拉取成功！"));
    build(projectUrl, targetDir);
    // process.exit();
  });
}

async function build(projectUrl, targetDir) {
  //相关选项构建
  const { gitChangeUrl } = await inquirer.prompt([
    {
      name: "gitChangeUrl",
      type: "input",
      message: `需要切换的git地址url:`,
      default: projectUrl, // 默认值,
    },
  ]);
  if (gitChangeUrl !== projectUrl) {
    let cmdRemoteOr = `git remote rm origin`;
    let cmdRemoteAdd = `git remote add origin ${gitChangeUrl}`;
    await execSync(cmdRemoteOr, { cwd: targetDir }, dealError);
    await execSync(cmdRemoteAdd, { cwd: targetDir }, dealError);
    // await fs.rename(`${targetDir}/README.md`, `${targetDir}/README-LS.md`);
    await execSync("git pull origin master --allow-unrelated-histories", { cwd: targetDir }, dealError);

    fs.readFile(`${targetDir}/README.md`, "utf8", function (err, data) {
      if (err) throw err;
      let newContent = data + "\r\n\r\n\r\n[English](./README-en.md) | [简体中文](./README-zh.md)";
      fs.writeFile(`${targetDir}/README.md`, newContent, "utf8", err => {
        if (err) throw err;
        console.log("success done");
        execSync("git add .", { cwd: targetDir }, dealError);
        execSync(`git commit -m '文档初始化'`, { cwd: targetDir }, dealError);
        execSync("git push origin master", { cwd: targetDir }, dealError);
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
