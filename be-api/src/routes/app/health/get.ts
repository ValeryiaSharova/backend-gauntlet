import { ERRORS, HTTP_STATUS } from 'shared';

import { Handler, HealthzGet } from 'src/_generated';
import { isPostgresConnected } from 'src/integrations/postgres/connection';
import { config } from 'src/utils/navigation';

export const { onSuccess, options } = config('Health check', {
  tag: 'app',
  mode: 'status',
  roles: ['guest'],
  schema: {
    response: {
      model: 'status',
      statuses: [HTTP_STATUS.INTERNAL_SERVER],
    },
  },
});

export const handler: Handler<HealthzGet> = async (_, reply) => {
  const isConnected = await isPostgresConnected();

  if (!isConnected) {
    return reply
      .status(HTTP_STATUS.INTERNAL_SERVER)
      .send({ error: ERRORS.INTERNAL_SERVER });
  }

  return onSuccess(isConnected);
};
