const REDACTED = '[REDACTED]';
const credentialKey = /^(?:authorization|proxy[-_]?authorization|token|access[-_]?token|refresh[-_]?token|id[-_]?token|password|client[-_]?secret|api[-_]?key)$/i;

export const redactTelemetryText = (value: string): string => {
  // Axios keeps serialized JSON/form bodies in config.data, even on errors.
  if (value.trimStart().startsWith('{') || value.trimStart().startsWith('[')) {
    try {
      return JSON.stringify(redactTelemetry(JSON.parse(value)));
    } catch {
      // Non-JSON diagnostic text is handled below.
    }
  }
  return value
    .replace(/\b(Bearer|Basic)\s+[^\s"'<>]+/gi, `$1 ${REDACTED}`)
    .replace(/(\b[a-z][a-z\d+.-]*:\/\/)[^/\s?#@]+@/gi, `$1${REDACTED}@`)
    .replace(/(^|[?&#;\s])([^=?&#;\s]+)=([^&#;\s"'<>]*)/g, (match, separator, key) => {
      try {
        return credentialKey.test(decodeURIComponent(key)) ? `${separator}${key}=${REDACTED}` : match;
      } catch {
        return match;
      }
    });
};

/**
 * Copy diagnostics before handing them to telemetry. Never scrub live request
 * objects in place: their credentials still have to reach the intended service.
 * Do not retain prototypes/toJSON hooks that could serialize the original data.
 */
export const redactTelemetry = (value: unknown): unknown => {
  const ancestors = new WeakSet<object>();

  const copy = (item: unknown): unknown => {
    if (typeof item === 'string') return redactTelemetryText(item);
    if (typeof item === 'function') return undefined;
    if (item === null || typeof item !== 'object') return item;
    if (ancestors.has(item)) return '[Circular]';
    ancestors.add(item);

    try {
      if (item instanceof Date) {
        return Number.isFinite(Date.prototype.getTime.call(item)) ? Date.prototype.toISOString.call(item) : null;
      }
      if (Array.isArray(item)) return item.map(copy);

      const result: Record<string, unknown> | Error = item instanceof Error
        ? new Error(redactTelemetryText(item.message))
        : {};

      if (item instanceof Error && result instanceof Error) {
        result.name = redactTelemetryText(item.name);
        result.stack = item.stack ? redactTelemetryText(item.stack) : undefined;
      }

      for (const [key, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(item))) {
        if (!descriptor.enumerable && !(item instanceof Error && key === 'cause')) continue;
        // Avoid invoking accessors while logging an arbitrary SDK/network object.
        const safeValue = credentialKey.test(key)
          ? REDACTED
          : 'value' in descriptor ? copy(descriptor.value) : '[Accessor]';
        Object.defineProperty(result, key, { value: safeValue, enumerable: descriptor.enumerable, writable: true, configurable: true });
      }
      return result;
    } finally {
      ancestors.delete(item);
    }
  };

  return copy(value);
};
