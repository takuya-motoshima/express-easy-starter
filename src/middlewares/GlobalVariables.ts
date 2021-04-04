import path from 'path';

/**
 * Set global variables.
 * It can be accessed like "global.xxx" in all router and model classes.
 *
 * Below is a description of the variables.
 * APP_ROOT: The directory where app.js is located.
 */
export default class {
  /**
   * Mount on application.
   */
  public static mount(): void {
    // Application root path.
    global.APP_ROOT = process.cwd();
    // global.APP_ROOT = path.resolve(__dirname);
  }
}