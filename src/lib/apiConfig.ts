const normalizeBaseUrl = (value: string | undefined, suffix: string): string => {
  const base = (value ?? 'http://localhost:3000').trim();
  const withoutTrailingSlash = base.endsWith('/') ? base.slice(0, -1) : base;

  if (withoutTrailingSlash.endsWith(suffix)) {
    return withoutTrailingSlash;
  }

  return `${withoutTrailingSlash}${suffix}`;
};

export const resolveApiBaseUrl = (value: string | undefined): string => normalizeBaseUrl(value, '/api');

export const resolveAuthBaseUrl = (value: string | undefined): string => normalizeBaseUrl(value, '/auth');
