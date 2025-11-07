import { postgres } from 'src/integrations/postgres/connection';
import { WatcherLinks } from 'src/integrations/postgres/storage/app/types';
import { joinColumns } from 'src/integrations/postgres/utils';

const COLUMNS = joinColumns<WatcherLinks>([
  'expires_at',
  'payload_hash',
  'revoked_at',
  'user_id',
]);

export const getWatcherLinkByPayloadHash = async (
  payload_hash: WatcherLinks['payload_hash']
): Promise<WatcherLinks | undefined> => {
  const { rows } = await postgres.query({
    text: `
      SELECT id, ${COLUMNS}
      FROM watcher_links
      WHERE payload_hash = $1 AND revoked_at IS NULL AND expires_at > now()`,
    values: [payload_hash],
  });

  return rows[0];
};
