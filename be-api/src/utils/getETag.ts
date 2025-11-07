import crypto from 'crypto';

import { WorkersDashboard } from 'src/_generated';

const sortKeys = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map((item) => sortKeys(item));
  }

  if (value && typeof value === 'object') {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = sortKeys((value as Record<string, unknown>)[key]);
        return acc;
      }, {});
  }

  return value;
};

export const getETag = (result: WorkersDashboard) => {
  const sorted = JSON.stringify(
    sortKeys(result as unknown as Record<string, unknown>),
    null,
    0
  );

  return crypto.createHash('sha256').update(sorted).digest('hex');
};

export const checkLastSeenAt = (
  updatedData: WorkersDashboard,
  cachedData: WorkersDashboard
): WorkersDashboard => {
  const cache = new Map(
    cachedData.workers.map((worker) => [worker.id, worker])
  );

  const result = updatedData.workers.map((worker) => {
    const previous = cache.get(worker.id);

    if (!previous) {
      return worker;
    }

    const diff = Math.abs(
      Date.parse(worker.last_seen_at) - Date.parse(previous.last_seen_at)
    );

    return diff < 60000
      ? { ...worker, last_seen_at: previous.last_seen_at }
      : worker;
  });

  return { ...updatedData, workers: result };
};
