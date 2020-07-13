import File from './File';
const imageSize = require('image-size');
const sharp = require('sharp');
// import imageSize from 'image-size';
// import sharp from 'sharp';

export default class Media {

  /**
   * Write base64 to image
   */
  public static writeBase64Image(filePath: string, base64: string, permission: number = 0o755): Media {
    if (!this.isBase64(base64)) throw new TypeError('Not in base64 format');
    File.write(filePath, this.convertBase64ToBlob(base64), 'base64', permission);
    return this;
  }

  /**
   * Convert base64 format to blob format
   */
  public static convertBase64ToBlob(base64: string): string {
    return base64.replace(/^data:image\/[A-Za-z]+;base64,/, '');
  }

  /**
   * Return whether base64 format
   */
  public static isBase64(str: string): boolean {
    return /^data:image\/[A-Za-z]+;base64,/.test(str);
  }

  /**
   * Returns base64 file information
   */
  public static statBase64(base64: string): { blob: string, type: string } | undefined {
    const matches = base64.match(/^data:image\/([A-Za-z]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) return undefined;
    const blob = matches[2];
    const type = matches[1];
    return { blob, type };
  }

  /**
   * Returns the dimensions of the image
   */
  public static getDimensions(filePath: string): { width: number, height: number }|null {
    // const sizeOf = require('image-sizeaa');
    const { width, height } = imageSize(filePath);
    if (width == null || height == null) return null;
    return { width, height };
  }

  /**
   * Crop image
   */
  public static async crop(
    input: string,
    output: string,
    { left, top, width, height }: { left: number, top: number, width: number, height: number }
  ): Promise<void> {
    if (left < 0) left = 0;
    if (top < 0) top = 0;
    await sharp(input)
      .extract({ left, top, width, height })
      .toFile(output);
  }

  /**
   * Resize image
   *
   * @example
   * import { Media } from 'nodejs-shared';
   * 
   * // Resize to 100px width while keeping the aspect ratio.
   * Media.resize('sample.jpg', { width: 100 });
   * 
   * // Resize to 100px height while keeping the aspect ratio.
   * Media.resize('sample.jpg', { height: 100 });
   * 
   * // Resize width and height to 100px while maintaining aspect ratio. (Cover)
   * Media.resize('sample.jpg', { width: 100, height: 100 });
   * 
   * // Resize width and height to 100px while maintaining aspect ratio. (Contain)
   * Media.resize('sample.jpg', { width: 100, height: 100, contain: true });
   * 
   * // If you do not want to change the original image file, set output output destination
   * Media.resize('sample.jpg', { output: 'resized.jpg', width: 100 });
   */
  public static async resize(
    input: string,
    { width, height, output, contain = false }: { width?: number, height?: number, output?: string, contain?: boolean }
  ): Promise<void> {
    const tmp = File.getTmpPath();
    const fit = contain ? 'contain' : 'cover';
    await sharp(input)
      .resize({ width, height, fit })
      .toFile(tmp);
    sharp.cache(false);
    if (!output) output = input;
    File.rename(tmp, output);
  }
}