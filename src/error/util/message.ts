import { trim } from 'lodash-es';
import { T_object } from '../../type/internal.js';

/**
 * Serialize invalid map
 *
 * From:
 * { name: 'wrong_name', age: 'wrong_age' }
 * to:
 * "name='wrong_name', age='wrong_age'"
 *
 * @param map
 */
export function invalid_map(map: T_object): string {
  let partial = '';

  for (const key in map) {
    partial += `${key}=${JSON.stringify(map[key])}, `;
  }

  return trim(partial, ', ');
}
