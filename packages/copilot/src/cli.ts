import { logger, yParser } from '@umijs/utils';

export async function run(opts) {
  process.env.DID_YOU_KNOW = 'none';
  const args = yParser(process.argv.slice(2), {
    alias: {
      version: ['v'],
      help: ['h'],
    },
    boolean: ['version'],
  });
  const { _, version } = args;
  // 环境变量
  let command = _[0];
  const copilotVersion = require('../package.json')?.version;

  /* 是否检测版本:
   * 1. 动态下发的检测为true
   * 2. 运行了v/dev命令
   */

  if (version || command === 'v') {
    logger.info(`copilot@${copilotVersion}`);
  }
  if (command === 'init') {
    require('./create-copilot')
      .default(process.cwd(), args)
      .catch(err => {
        console.error(`Create failed, ${err.message}`);
        console.error(err);
      });
  }
}

