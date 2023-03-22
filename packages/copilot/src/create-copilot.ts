import {
    BaseGenerator,
    execa,
    getGitInfo,
    installWithNpmClient,
    logger,
    prompts,
  } from '@umijs/utils';
  import 'zx/globals';
  
  import { existsSync, readdirSync } from 'fs';
  import { join } from 'path';
  
  const testData = {
    name: 'test',
    description: 'nothing',
    author: 'xxx',
    version: require('../package').version,
    npmClient: 'pnpm',
    registry: 'http://npm.in.za/',
  };
  
  export default async (cwd, args = {}) => {
    const gitURL = 'http://gitlab.in.za/jiamin.zhan/za-form-template.git';
  
    let npmClient: any = 'pnpm';
    let registry = 'https://registry.npmjs.org/';
    let appTemplate = 'simple';
    const { username, email } = await getGitInfo();
    let author = email && username ? `${username} <${email}>` : '';
    let description = 'Rapid construction of h5 application by castor';
    let name = 'yakin-admin';
  
    // test ignore prompts
      const response = await prompts(
          [
              {
                  type: 'text',
                  name: 'projectName',
                  message: `项目名称：`,
              },
              {
                  type: 'text',
                  name: 'author',
                  message: `项目开发人：`,
              },
              {
                  type: 'text',
                  name: 'description',
                  message: `项目描述：`,
              },				
              {
                  type: 'select',
                  name: 'appTemplate',
                  message: '选择模板：',
                  choices: [
                      { title: '基础中台模板', value: 'simple-admin-template', selected: true },
                      { title: '微前端主应用', value: 'micro-parent-template' },
                      { title: '微前端子应用', value: 'micro-chiild-template' },
                  ],
              },
              {
                  type: 'select',
                  name: 'npmClient',
                  message: '选择npm包下载方式：',
                  choices: [
                      { title: 'yarn', value: 'yarn', selected: true },
                      { title: 'pnpm', value: 'pnpm' },
                      { title: 'cnpm', value: 'cnpm' },
                      { title: 'npm', value: 'npm' },
                  ],
              },
              {
                  type: 'select',
                  name: 'registry',
                  message: '选择npm包下载源：',
                  choices: [
                      {
                          title: 'zafast (http://npm.in.za/)[推荐使用，官方升级Npm源，提供更快速度]',
                          value: 'http://npm.in.za/',
                          selected: true,
                      },
                      {
                          title: 'zati（http://nexus.in.za/repository/npm_group/）',
                          value: 'http://nexus.in.za/repository/npm_group/',
                      },
                      {
                          title: 'npm（https://registry.npmjs.org/）',
                          value: 'https://registry.npmjs.org/',
                      },
                      {
                          title: 'taobao（https://registry.npmmirror.com）',
                          value: 'https://registry.npmmirror.com',
                      },
                  ],
              },
          ],
          {
              onCancel() {
                  process.exit(1);
              },
          }
      );
      name = response.projectName || 'yakin-admin';
      npmClient = response.npmClient;
      registry = response.registry;
      appTemplate = response.appTemplate;
      author = response.author;
      description = response.description;
  
    const targetPath = name ? join(cwd, name) : cwd;
  
    const version = require('../package').version;
    const demoDir = `${name}-copy`;
    if (existsSync(targetPath)) {
      console.log(`🙈 folder already exists，Please check`);
      process.exit(1);
    }
  
    execa.execaSync('git', ['clone', '-b', 'main', gitURL, demoDir, '--depth=1']);
  
    const generator = new BaseGenerator({
      path: join(cwd, demoDir),
      target: targetPath,
      data: {
            name,
            version: version.includes('-canary.') ? version : `^${version}`,
            npmClient,
            registry,
            author,
            description,
          },
    });
    await generator.run();
  
    execa.execaSync('rm', ['-rf', demoDir, 'node_modules']);
    initGit(targetPath);
    // 在这里只保留模版文件
    logger.ready(`🙈 git clone success,targetPath:`, targetPath);
    await readdirSync(targetPath).forEach(async file => {
      // 遍历文件夹,删除非模版的
      if (file !== appTemplate) {
        execa.execaSync('rm', ['-rf', `${targetPath}/${file}`]);
      }
    });
    execa.execaSync('mv', [
      `${targetPath}/${appTemplate}`,
      `./${appTemplate}}`,
    ]);
    execa.execaSync('rm', ['-rf', `${targetPath}`]);
    execa.execaSync('mv', [
      join(cwd, `${appTemplate}}`),
      targetPath,
    ]);
    installWithNpmClient({ npmClient, cwd: targetPath });
  
    await $`clear`;
    logger.ready(`🚚 Initialization project succeeded`);
    logger.ready(`✨ cd ${name} && npm run start`);
  };
  
  async function initGit(targetPath) {
    const isGit = existsSync(join(targetPath, '.git'));
    if (isGit) {
      try {
        execa.execaCommandSync('git remote remove origin', { cwd: targetPath });
        logger.ready(`Git initialized successfully`);
      } catch {
        logger.error(`Initial the git repo failed`);
      }
    }
  }
  