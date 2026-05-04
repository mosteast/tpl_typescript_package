import { invalid_map } from './message.js';

describe('invalid_map', () => {
  it('serializes string and number values', () => {
    expect(invalid_map({ a: 11, b: 'bb' })).toBe('a=11, b="bb"');
  });

  it('returns empty string for an empty map', () => {
    expect(invalid_map({})).toBe('');
  });

  it('uses JSON.stringify for nested structures', () => {
    expect(invalid_map({ nested: { y: true }, arr: [1, 'z'] })).toBe('nested={"y":true}, arr=[1,"z"]');
  });

  it('respects insertion order of keys', () => {
    expect(invalid_map({ z: 1, a: 2 })).toBe('z=1, a=2');
  });
});
