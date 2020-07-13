import fs from 'fs';
const fse = require('fs-extra');
// import * as fse from 'fs-extra';
import path from 'path';
import os from 'os';
import uniqid from 'uniqid';
import moment from "moment";
import glob from 'glob';
import mimeTypes from 'mime-types';

export default class File {

  /**
   * Returns the file base name
   */
  public static basename(filePath: string): string {
    return path.basename(filePath, path.extname(filePath));
  }

  /**
   * Change permissions
   */
  public static chmod(filePath: string, permission: number = 0o755): File {
    fs.chmodSync(filePath, permission);
    return this;
  }

  /**
   * Make tmp directory
   */
  public static makeTmpDirectory(): string {
    const tmp = `${this.getTmpDirectory()}/${uniqid()}/`;
    this.makeDirectory(tmp);
    return tmp;
  }

  /**
   * Make a directory
   */
  public static makeDirectory(dirPath: string, permission: number = 0o755): File {
    if (this.existsFile(dirPath)) return this;
    fse.mkdirsSync(dirPath);
    this.chmod(dirPath, permission);
    return this;
  }

  /**
   * Returns whether the file exists
   */
  public static existsFile(filePath: string): boolean {
    try {
      fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Delete file
   */
  public static deleteFile(filePath: string): void {
    if (!this.existsFile(filePath)) return;
    fs.unlinkSync(filePath);
  }

  /**
   * Write a file
   */
  public static write(filePath: string, content: string = '', options: {}|undefined = undefined, permission: number = 0o755): File {
    this.deleteFile(filePath);
    const dirName = path.dirname(filePath);
    this.makeDirectory(dirName);
    fs.writeFileSync(filePath, content, options);
    this.chmod(filePath, permission);
    return this;
  }

  /**
   * Read a file as a string
   */
  public static readAsString(filePath: string): string {
    return fs.readFileSync(filePath).toString();
  }

  /**
   * Read file as JSON object
   */
  public static readAsJson(filePath: string): {} {
    return JSON.parse(this.readAsString(filePath));
  }

  /**
   * Read files in base64 format
   */
  public static readAsBase64(filePath: string): string {
    const content =  fs.readFileSync(filePath, { encoding: 'base64' });
    const mime = mimeTypes.lookup(filePath);
    return `data:${mime};base64,${content}`;
  }

  /**
   * Returns file information
   */
  public static getStat(filePath: string): any {
    return fs.statSync(filePath);
  }

  /**
   * Returns the file modification date and time
   */
  public static getFilemtime(filePath: string): number {
    return moment(this.getStat(filePath).mtime).unix();
  }

  /**
   * Returns the file extension
   */
  public static getExtension(filePath: string): string|undefined {
    const ext = path.extname(filePath);
    return ext ? ext.split('.').pop() : undefined;
  }

  /**
   * Find file
   *
   * @example
   * import { File } from 'nodejs-shared';
   * 
   * File.find('**\/*.js');
   * File.find('**\/glo?.js');
   * File.find('**\/*[0-9]*.js');
   *
   * @param  {string} pattern
   * @return {string[]}
   */
  public static find(pattern: string, option: {} = {}) {
    return glob.sync(pattern, { nodir: false, ...option });
  }

  /**
   * Returns the tmp directory. However, the tmp directory is not created.
   */
  public static getTmpDirectory(): string {
    return os.tmpdir();
  }

  /**
   * Returns the tmp file path. However, tmp file is not created.
   */
  public static getTmpPath(ext?: string): string {
    let filePath = `${this.getTmpDirectory()}/${uniqid()}`;
    if (ext) filePath += `.${ext}`;
    return filePath;
  }

  /**
   * Return whether file
   */
  public static isFile(filePath: string): boolean {
    try {
      const stats = fs.statSync(filePath);
      return stats.isFile();
    } catch {
      return false;
    }
  }

  /**
   * Rename file or directory name
   */
  public static rename(fromFilePath: string, toFilePath: string): void {
    fs.renameSync(fromFilePath, toFilePath);
  }
}