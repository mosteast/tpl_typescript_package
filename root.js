/*
 |--------------------------------------------------------------------------
 | Functionality related to project base directory
 |--------------------------------------------------------------------------
 | !!! THIS FILE IS LOCATION RESTRICTED, DON'T MOVE IT !!!
 */

import fs from 'fs-extra';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const { stat } = fs;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * App base path
 * @param segments
 *
 * @example Get app base dir
 */
function dir_root(...segments) {
  return resolve(__dirname, ...segments);
}

/**
 * Get env variable
 *
 * This function will make sure env is loaded
 * @param key
 */
function env(key) {
  load_env_once();
  return process.env[key];
}

function load_env_once(path) {
  if (process.env.____ENV_LOADED == '1') {
    return;
  }

  reload_env(path);
}

function reload_env(path) {
  path = path || dir_root('.env');
  stat(path, (e) => {
    if (e) {
      console.warn(`.env file not found: ${path}`);
    }
  });
  require('dotenv').config({ path });
  process.env.____ENV_LOADED = '1';
}

export { dir_root, load_env_once, reload_env, env };
