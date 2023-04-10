import { E } from '@mosteast/e';

/**
 * Project base error
 *
 * All custom errors should extend this error.
 */
export class Not_implemented extends E {
  status_code: number = 500;

  constructor(msg = 'Not implemented yet') {
    super(msg);
  }
}
