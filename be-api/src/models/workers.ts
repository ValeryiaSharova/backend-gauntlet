import { JSONSchema4 } from 'json-schema';

import { Models } from 'src/_generated';
import { Workers } from 'src/integrations/postgres/storage/app/types';

type Model = Models['workers'];

export const model: JSONSchema4 = {
  type: 'object',
  title: 'Workers dashboard',
  description: 'Workers dashboard model',
  required: ['workers', 'agg'],
  properties: {
    workers: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'name', 'status', 'last_seen_at', 'hashrate_th'],
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          status: { $ref: 'enums#/properties/workerStatus' },
          last_seen_at: { type: 'string', format: 'date-time' },
          hashrate_th: { type: 'string' },
        },
        additionalProperties: false,
      },
    },
    agg: {
      type: 'object',
      required: ['online', 'offline', 'inactive', 'total_hashrate_th'],
      properties: {
        online: { type: 'number' },
        offline: { type: 'number' },
        inactive: { type: 'number' },
        total_hashrate_th: { type: 'string' },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};

const getAgg = (workers: Workers[]): Model['agg'] => ({
  online: workers.filter((worker) => worker.status === 'online').length,
  offline: workers.filter((worker) => worker.status === 'offline').length,
  inactive: workers.filter((worker) => worker.status === 'inactive').length,
  total_hashrate_th: (
    workers.reduce((acc, worker) => acc + Number(worker.hashrate_mh), 0) /
    1000000
  ).toFixed(3),
});

export const driver = (workers: Workers[]): Model => ({
  workers: workers.map((worker) => ({
    id: worker.id,
    name: worker.name,
    status: worker.status,
    last_seen_at: worker.last_seen_at.toISOString(),
    hashrate_th: (Number(worker.hashrate_mh) / 1000000).toFixed(3),
  })),
  agg: getAgg(workers),
});
