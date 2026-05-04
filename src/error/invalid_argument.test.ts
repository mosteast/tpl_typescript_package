import { EID_common } from '@mosteast/common_eid';
import { E_level } from '../type/internal.js';
import { Invalid_argument, Invalid_argument_external } from './invalid_argument.js';

describe('Invalid_argument', () => {
  it('serializes an argument map into the message', () => {
    const a = 1,
      b = 'B',
      c = { x: 1 };

    const e = new Invalid_argument({ a, b, c });

    expect(e.message).toBe('Invalid arguments: a=1, b="B", c={"x":1}');
  });

  it('accepts a plain string message', () => {
    const e = new Invalid_argument('aaa');

    expect(e.message).toBe('aaa');
  });

  it('appends solution for string message', () => {
    const e = new Invalid_argument('a', 'b');
    expect(e.message).toBe('a (Solution: b)');
  });

  it('appends solution for map message', () => {
    const e = new Invalid_argument({ n: 2 }, 'try again');
    expect(e.message).toBe('Invalid arguments: n=2 (Solution: try again)');
  });

  it('throws when map is paired with a non-string second argument', () => {
    expect(() => new Invalid_argument({ x: 1 }, { hint: 1 } as never)).toThrow(/Invalid argument/);
  });
});

describe('Invalid_argument_external', () => {
  it('inherits invalid_argument eid and sets external level and 403', () => {
    const e = new Invalid_argument_external('bad');

    expect(e.eid).toBe(EID_common.invalid_argument);
    expect(e.level).toBe(E_level.external);
    expect(e.status_code).toBe(403);
    expect(e.message).toBe('bad');
  });
});
