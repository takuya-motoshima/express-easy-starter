import File from './File';

export default class {

  static writeBase64ToImage(filePath, base64, permission = 0o755) {
    File.write(filePath, this.base64ToBlob(base64), 'base64', permission);
    return this;
  }

  static base64ToBlob(base64) {
    return base64.replace(/^data:image\/[A-Za-z]+;base64,/, '');
  }

  static statBase64(base64) {
    const matches = base64.match(/^data:image\/([A-Za-z]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return false;
    }
    const blob = matches[2];
    const type = matches[1];
    return {blob, type};
  }
}