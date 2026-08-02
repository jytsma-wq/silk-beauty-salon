import { describe, expect, it, vi } from 'vitest';
import { copyMissingKeys } from '../../../scripts/fix-missing-translations.mjs';

describe('copyMissingKeys', () => {
  it('copies ordinary keys without accepting prototype keys', () => {
    const source = JSON.parse(
      '{"safe":"value","__proto__":{"polluted":"yes"},"constructor":{"prototype":{"polluted":"yes"}},"nested":{"prototype":{"polluted":"yes"},"message":"ok"}}'
    ) as Record<string, unknown>;
    const target = { nested: {} } as Record<string, unknown>;
    const originalPrototype = Object.getPrototypeOf(target);
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    copyMissingKeys(source, target);

    expect(target.safe).toBe('value');
    expect(Object.hasOwn(target, '__proto__')).toBe(false);
    expect(Object.hasOwn(target, 'constructor')).toBe(false);
    expect(Object.hasOwn(target.nested as object, 'prototype')).toBe(false);
    expect((target.nested as Record<string, unknown>).message).toBe('ok');
    expect(Object.getPrototypeOf(target)).toBe(originalPrototype);
    expect((Object.prototype as Record<string, unknown>).polluted).toBeUndefined();
    expect(warning).toHaveBeenCalled();

    warning.mockRestore();
  });
});
