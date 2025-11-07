import { EnumsWorkerStatus } from 'src/_generated';
import { UID } from 'src/types';

export type WatcherLinks = {
  id: UID;
  user_id: UID;
  payload_hash: Buffer;
  scope: string;
  expires_at: Date;
  revoked_at: Date | null;
  created_at: Date;
};

export type Workers = {
  id: UID;
  user_id: UID;
  name: string;
  last_seen_at: Date;
  hashrate_mh: number;
  status: EnumsWorkerStatus;
};
