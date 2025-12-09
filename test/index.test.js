const { capitalizeWords, filterActiveUsers, logAction } = require('../index');

describe('capitalizeWords', () => {
  test('capitalizes each word in a simple lowercase string', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World');
  });

  test('handles empty string', () => {
    expect(capitalizeWords('')).toBe('');
  });

  test('preserves multiple spaces and capitalizes correctly', () => {
    expect(capitalizeWords('  hello   world  ')).toBe('  Hello   World  ');
  });

  test('capitalizes a single word', () => {
    expect(capitalizeWords('javascript')).toBe('Javascript');
  });

  test('works with mixed-case input', () => {
    expect(capitalizeWords('hElLo WoRlD')).toBe('HElLo WoRlD');
  });
});

describe('filterActiveUsers', () => {
  test('returns only active users', () => {
    const users = [
      { name: 'Alice', isActive: true },
      { name: 'Bob', isActive: false },
      { name: 'Carol', isActive: true },
    ];
    expect(filterActiveUsers(users)).toEqual([
      { name: 'Alice', isActive: true },
      { name: 'Carol', isActive: true },
    ]);
  });

  test('returns empty array when input is empty', () => {
    expect(filterActiveUsers([])).toEqual([]);
  });

  test('returns empty array if no users are active', () => {
    const usersAllInactive = [{ name: 'Dave', isActive: false }];
    expect(filterActiveUsers(usersAllInactive)).toEqual([]);
  });

  test('does not mutate the original array', () => {
    const users = [{ name: 'Eve', isActive: true }];
    const original = [...users];
    filterActiveUsers(users);
    expect(users).toEqual(original);
  });
});

describe('logAction', () => {
  test('returns a string containing username, action, and ISO timestamp', () => {
    const result = logAction('login', 'Alice');
    expect(typeof result).toBe('string');
    expect(result).toMatch(/^User Alice performed login at /);
    const timestamp = result.replace(/^User Alice performed login at /, '');
    expect(new Date(timestamp).toISOString()).toBe(timestamp);
  });

  test('works with different username/action', () => {
    const result = logAction('logout', 'Bob');
    expect(result).toMatch(/^User Bob performed logout at /);
  });
});
