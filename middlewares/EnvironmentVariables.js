import dotenv from 'dotenv';
import fs from 'fs';

/**
 * Set environment variables.
 * 
 * Read the environment variable file in options.path and set it in "process.env".
 */
export default class {
  /**
   * Mount on application.
   */
  static mount(options) {
    // Initialize options.
    options = Object.assign({
      envPath: undefined
    }, options);
    if (!options.envPath) return;

    // Set environment variables in process.env.
    const env = dotenv.parse(fs.readFileSync(options.envPath))
    for (let key in env)
      process.env[key] = env[key]
  }
}