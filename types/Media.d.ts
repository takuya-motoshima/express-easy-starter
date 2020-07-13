export default class Media {
    /**
     * Write base64 to image
     */
    static writeBase64Image(filePath: string, base64: string, permission?: number): Media;
    /**
     * Convert base64 format to blob format
     */
    static convertBase64ToBlob(base64: string): string;
    /**
     * Return whether base64 format
     */
    static isBase64(str: string): boolean;
    /**
     * Returns base64 file information
     */
    static statBase64(base64: string): {
        blob: string;
        type: string;
    } | undefined;
    /**
     * Returns the dimensions of the image
     */
    static getDimensions(filePath: string): {
        width: number;
        height: number;
    } | null;
    /**
     * Crop image
     */
    static crop(input: string, output: string, { left, top, width, height }: {
        left: number;
        top: number;
        width: number;
        height: number;
    }): Promise<void>;
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
    static resize(input: string, { width, height, output, contain }: {
        width?: number;
        height?: number;
        output?: string;
        contain?: boolean;
    }): Promise<void>;
}
