import crypto from 'crypto';

import { WorkersDashboard } from 'src/_generated';

const sortKeys = (obj: Record<string, unknown>): Record<string, unknown> =>
  Object.keys(obj)
    .sort()
    .reduce<Record<string, unknown>>((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});

export const getETag = (result: WorkersDashboard) => {
  const sorted = JSON.stringify(
    sortKeys(result as unknown as Record<string, unknown>),
    null,
    0
  );

  return crypto.createHash('sha256').update(sorted).digest('hex');
};
