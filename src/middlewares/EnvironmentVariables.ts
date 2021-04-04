import dotenv from 'dotenv';
import fs from 'fs';

/**
 * Http Optional Interface.
 */
interface EnvironmentVariablesOptions {
  path?: string;
}

/**
 * Set environment variables.
 * 
 * Read the environment variable file in options.path and set it in "process.env".
 */
export default class {
  /**
   * Mount on application.
   */
  public static mount(options?: EnvironmentVariablesOptions): void {
    // Initialize options.
    options = Object.assign({path: undefined}, options);
    if (!options.path) return;

    // Set environment variables in process.env.
    const env = dotenv.parse(fs.readFileSync(options.path))
    for (let key in env)
      process.env[key] = env[key]
  }
}