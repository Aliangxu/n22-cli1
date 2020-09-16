// const path = require("path");
// const debug = require("debug");
// const inquirer = require("inquirer");
const EventEmitter = require("events");
// const Generator = require("./Generator");
// const cloneDeep = require("lodash.clonedeep");
// const sortObject = require("./util/sortObject");
// const getVersions = require("./util/getVersions");
// const PackageManager = require("./util/ProjectPackageManager");
// const { clearConsole } = require("./util/clearConsole");
// const PromptModuleAPI = require("./PromptModuleAPI");
// const writeFileTree = require("./util/writeFileTree");
// const { formatFeatures } = require("./util/features");
// const loadLocalPreset = require("./util/loadLocalPreset");
// const loadRemotePreset = require("./util/loadRemotePreset");
// const generateReadme = require("./util/generateReadme");
// const { resolvePkg, isOfficialPlugin } = require("@vue/cli-shared-utils");

// const { defaults, saveOptions, loadOptions, savePreset, validatePreset, rcPath } = require("./options");

// const {
//   chalk,
//   execa,
//   semver,

//   log,
//   warn,
//   error,

//   hasGit,
//   hasProjectGit,
//   hasYarn,
//   hasPnpm3OrLater,
//   hasPnpmVersionOrLater,

//   exit,
//   loadModule,
// } = require("@vue/cli-shared-utils");

const isManualMode = answers => answers.preset === "__manual__";

module.exports = class Creator extends EventEmitter {
  constructor(name, context, promptModules) {
    super();

    this.name = name;
    this.context = process.env.VUE_CLI_CONTEXT = context;
    const { presetPrompt, featurePrompt } = this.resolveIntroPrompts();

    this.presetPrompt = presetPrompt;
    this.featurePrompt = featurePrompt;
    // this.outroPrompts = this.resolveOutroPrompts()
    // this.injectedPrompts = []
    // this.promptCompleteCbs = []
    // this.afterInvokeCbs = []
    // this.afterAnyInvokeCbs = []

    this.run = this.run.bind(this);

    // const promptAPI = new PromptModuleAPI(this)
    // promptModules.forEach(m => m(promptAPI))
  }

  async create(cliOptions = {}, preset = null) {
    console.log("%c >>>>>>>>0", "color:#00CD00");
  }

  run(command, args) {
    if (!args) {
      [command, ...args] = command.split(/\s+/);
    }
    return execa(command, args, { cwd: this.context });
  }

  // getPresets() {
  //   const savedOptions = loadOptions();
  //   return Object.assign({}, savedOptions.presets, defaults.presets);
  // }

  resolveIntroPrompts() {
    // const presets = this.getPresets();
    // const presetChoices = Object.entries(presets).map(([name, preset]) => {
    //   let displayName = name;
    //   if (name === "default") {
    //     displayName = "Default";
    //   } else if (name === "__default_vue_3__") {
    //     displayName = "Default (Vue 3 Preview)";
    //   }

    //   return {
    //     name: `${displayName} (${formatFeatures(preset)})`,
    //     value: name,
    //   };
    // });
    const presetPrompt = {
      name: "preset",
      type: "list",
      message: `Please pick a preset:`,
      choices: [
        // ...presetChoices,
        {
          name: "Manually select features",
          value: "__manual__",
        },
      ],
    };
    const featurePrompt = {
      name: "features",
      when: isManualMode,
      type: "checkbox",
      message: "Check the features needed for your project:",
      choices: [],
      pageSize: 10,
    };
    return {
      presetPrompt,
      featurePrompt,
    };
  }

  // resolveOutroPrompts() {
  //   const outroPrompts = [
  //     {
  //       name: "useConfigFiles",
  //       when: isManualMode,
  //       type: "list",
  //       message: "Where do you prefer placing config for Babel, ESLint, etc.?",
  //       choices: [
  //         {
  //           name: "In dedicated config files",
  //           value: "files",
  //         },
  //         {
  //           name: "In package.json",
  //           value: "pkg",
  //         },
  //       ],
  //     },
  //     {
  //       name: "save",
  //       when: isManualMode,
  //       type: "confirm",
  //       message: "Save this as a preset for future projects?",
  //       default: false,
  //     },
  //     {
  //       name: "saveName",
  //       when: answers => answers.save,
  //       type: "input",
  //       message: "Save preset as:",
  //     },
  //   ];

  //   // ask for packageManager once
  //   const savedOptions = loadOptions();
  //   if (!savedOptions.packageManager && (hasYarn() || hasPnpm3OrLater())) {
  //     const packageManagerChoices = [];

  //     if (hasYarn()) {
  //       packageManagerChoices.push({
  //         name: "Use Yarn",
  //         value: "yarn",
  //         short: "Yarn",
  //       });
  //     }

  //     if (hasPnpm3OrLater()) {
  //       packageManagerChoices.push({
  //         name: "Use PNPM",
  //         value: "pnpm",
  //         short: "PNPM",
  //       });
  //     }

  //     packageManagerChoices.push({
  //       name: "Use NPM",
  //       value: "npm",
  //       short: "NPM",
  //     });

  //     outroPrompts.push({
  //       name: "packageManager",
  //       type: "list",
  //       message: "Pick the package manager to use when installing dependencies:",
  //       choices: packageManagerChoices,
  //     });
  //   }

  //   return outroPrompts;
  // }
};
