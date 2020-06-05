import fs from 'fs';
import fsExtra from "fs-extra";
import path from 'path';
import os from 'os';
import uniqid from 'uniqid';
import moment from "moment";
import glob from 'glob';
import mimeTypes from 'mime-types';

export default class {

  static basename(filePath) {
    return path.basename(filePath, path.extname(filePath));
  }

  static chmod(filePath, permission = 0o755) {
    fs.chmodSync(filePath, permission);
    return this;
  }

  static makeTmpDirectory() {
    const tmp = `${this.getTmpDirectory()}/${uniqid()}/`;
    this.makeDirectory(tmp);
    return tmp;
  }

  static makeDirectory(dir, permission = 0o755) {
    if (this.existsFile(dir)) {
      return this;
    }
    fsExtra.mkdirsSync(dir);
    this.chmod(dir, permission);
    return this;
  }

  static existsFile(filePath) {
    try {
      fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
      return true;
    } catch (ignore) {
      return false;
    }
  }

  static removeFile(filePath) {
    if (!this.existsFile(filePath)) {
      return;
    }
    fs.unlinkSync(filePath);
  }

  static write(filePath, content = '', options, permission = 0o755) {
    this.removeFile(filePath);
    const dir = path.dirname(filePath);
    this.makeDirectory(dir);
    fs.writeFileSync(filePath, content, options);
    this.chmod(filePath, permission);
    return this;
  }

  static readAsString(filePath) {
    return fs.readFileSync(filePath).toString();
  }

  static readAsJson(filePath) {
    return JSON.parse(this.readAsString(filePath));
  }

  static readAsBase64(filePath) {
    const base64 =  fs.readFileSync(filePath, { encoding: 'base64' });
    const mime = mimeTypes.lookup(filePath);
    return `data:${mime};base64,${base64}`;
  }

  static getStat(filePath) {
    return fs.statSync(filePath);
  }

  static getFilemtime(filePath) {
    return moment(this.getStat(filePath).mtime).unix().toString();
  }

  static getExtension(filePath) {
    return path.extname(filePath).split('.').pop();
  }

  /**
   * @example
   * 
   * File.glob('**\/*.js');
   * File.glob('**\/glo?.js');
   * File.glob('**\/*[0-9]*.js');
   *
   * @param  {string} pattern
   * @return {string[]}
   */
  static glob(pattern, option = {}) {
    return glob.sync(pattern, { nodir: false, ...option });
  }

  static getTmpDirectory() {
    return os.tmpdir();
  }

  static getTmpPath(ext) {
    let filePath = `${this.getTmpDirectory()}/${uniqid()}`;
    if (ext) {
      filePath += `.${ext}`;
    }
    return filePath;
  }

  static isFile(filePath) {
    try {
      const stats = fs.statSync(filePath);
      return stats.isFile();
    } catch (ignore) {
      return false;
    }
  }

  static async renameFile(fromFilePath, toFilePath) {
    return fs.rename(fromFilePath, toFilePath);
  }
}