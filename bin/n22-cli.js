#!/usr/bin/env node

"use strict";

const program = require("commander");
const minimist = require("minimist");
const chalk = require("chalk");

program.version(require("../package").version);

program
  .command("create <app-name>")
  .description("create a new project powered by n22-cli-service")
  .alias("i")
  .action((name, cmd) => {
    // console.log("%c ", "color:#00CD00", minimist(process.argv.slice(3))._);
    if (minimist(process.argv.slice(3))._.length > 2) {
      console.log(
        chalk.yellow(
          "\n Info: You provided more than one argument. The first one will be used as the app's name, the rest are ignored.",
        ),
      );
    }
    const options = cleanArgs(cmd);
    require("../lib/create")(name, options, minimist(process.argv.slice(4))._[0]);
  });

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs(cmd) {
  const args = {};
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ""));
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== "function" && typeof cmd[key] !== "undefined") {
      args[key] = cmd[key];
    }
  });
  return args;
}
