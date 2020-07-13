export default class File {
    /**
     * Returns the file base name
     */
    static basename(filePath: string): string;
    /**
     * Change permissions
     */
    static chmod(filePath: string, permission?: number): File;
    /**
     * Make tmp directory
     */
    static makeTmpDirectory(): string;
    /**
     * Make a directory
     */
    static makeDirectory(dirPath: string, permission?: number): File;
    /**
     * Returns whether the file exists
     */
    static existsFile(filePath: string): boolean;
    /**
     * Delete file
     */
    static deleteFile(filePath: string): void;
    /**
     * Write a file
     */
    static write(filePath: string, content?: string, options?: {} | undefined, permission?: number): File;
    /**
     * Read a file as a string
     */
    static readAsString(filePath: string): string;
    /**
     * Read file as JSON object
     */
    static readAsJson(filePath: string): {};
    /**
     * Read files in base64 format
     */
    static readAsBase64(filePath: string): string;
    /**
     * Returns file information
     */
    static getStat(filePath: string): any;
    /**
     * Returns the file modification date and time
     */
    static getFilemtime(filePath: string): number;
    /**
     * Returns the file extension
     */
    static getExtension(filePath: string): string | undefined;
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
    static find(pattern: string, option?: {}): string[];
    /**
     * Returns the tmp directory. However, the tmp directory is not created.
     */
    static getTmpDirectory(): string;
    /**
     * Returns the tmp file path. However, tmp file is not created.
     */
    static getTmpPath(ext?: string): string;
    /**
     * Return whether file
     */
    static isFile(filePath: string): boolean;
    /**
     * Rename file or directory name
     */
    static rename(fromFilePath: string, toFilePath: string): void;
}
