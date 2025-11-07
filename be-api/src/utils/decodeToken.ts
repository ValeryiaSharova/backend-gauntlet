import crypto from 'crypto';

import { getWatcherLinkByPayloadHash } from 'src/integrations/postgres/storage/app/watcher_links';

export const decodeToken = async (token: string) => {
  const bs58check = await import('bs58check');

  const payload = bs58check.default.decode(token);
  const payload_hash = crypto.createHash('sha256').update(payload).digest();

  const watcher_links = await getWatcherLinkByPayloadHash(payload_hash);

  if (!watcher_links) {
    throw new Error('Invalid token');
  }

  return watcher_links;
};
