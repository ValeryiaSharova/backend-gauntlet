import { ERRORS, HTTP_STATUS } from 'shared';

import {
  Handler,
  Error as PublicError,
  PublicWTokenDashboardGet,
  WorkersDashboard,
} from 'src/_generated';
import { WatcherLinks } from 'src/integrations/postgres/storage/app/types';
import { getListWorkersByUserId } from 'src/integrations/postgres/storage/app/workers';
import { models } from 'src/models';
import { decodeToken } from 'src/utils/decodeToken';
import { checkLastSeenAt, getETag } from 'src/utils/getETag';
import { config } from 'src/utils/navigation';

const cache = new Map<string, { result: WorkersDashboard; eTag: string }>();

export const { onSuccess, options } = config('Get workers dashboard', {
  tag: 'app',
  mode: 'getItem',
  roles: ['guest'],
  schema: {
    params: {
      type: 'object',
      required: ['token'],
      properties: {
        token: { type: 'string' },
      },
      additionalProperties: false,
    },
    response: {
      model: 'workers',
      statuses: [HTTP_STATUS.NOT_FOUND, HTTP_STATUS.NOT_MODIFIED],
    },
  },
});

export const handler: Handler<PublicWTokenDashboardGet> = async (
  request,
  reply
) => {
  const { token } = request.params;
  const prevETag = request.headers['if-none-match'];

  let watcher_links: WatcherLinks;

  try {
    watcher_links = await decodeToken(token);
  } catch (error) {
    const payload: PublicError = { error: ERRORS.NOT_FOUND };

    return reply.status(HTTP_STATUS.NOT_FOUND).send(payload);
  }

  const workers = await getListWorkersByUserId(watcher_links.user_id);

  const readyWorkers = models.workers.driver(workers);

  const cachedData = cache.get(watcher_links.user_id);
  const result = cachedData
    ? checkLastSeenAt(readyWorkers, cachedData.result)
    : readyWorkers;

  const eTag = getETag(result);

  if (prevETag === eTag) {
    return reply.status(HTTP_STATUS.NOT_MODIFIED).send();
  }

  void reply.header('ETag', eTag);

  cache.set(watcher_links.user_id, { result, eTag });

  return onSuccess(result);
};
