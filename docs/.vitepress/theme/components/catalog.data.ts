import fs from 'fs';
import path from 'path';
// import * as siteDataRef from 'vitepress/client/app/data';

// ignore path list
const IGNORE_PATH_LIST = ['pwa'];

export default {
  watch: './*.md',
  load(watchedFiles, b) {
    console.log('watchedFiles=>', watchedFiles);
    // const fullPath = path.join(__dirname, '../', link) + '.md'
    // TODO 读取所有目录文件~
    const dirs = fs.readdirSync(__dirname);
    console.log(dirs, __dirname);

    console.log(process.argv);
    console.log(process.cwd());
    // console.log('siteDataRef=>', siteDataRef);
    return [];
  },
};
