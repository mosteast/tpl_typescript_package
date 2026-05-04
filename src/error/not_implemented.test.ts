import { E } from '@mosteast/e';
import { Not_implemented } from './not_implemented.js';

describe('Not_implemented', () => {
  it('uses the default message', () => {
    const e = new Not_implemented();
    expect(e.message).toBe('Not implemented yet');
  });

  it('accepts a custom message', () => {
    const e = new Not_implemented('coming soon');
    expect(e.message).toBe('coming soon');
  });

  it('exposes HTTP 500 status_code', () => {
    expect(new Not_implemented().status_code).toBe(500);
  });

  it('inherits E', () => {
    expect(new Not_implemented()).toBeInstanceOf(E);
  });
});
