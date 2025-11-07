create table watcher_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  payload_hash bytea not null unique,        -- sha256(payload)
  scope text not null default 'dashboard',
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table workers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  last_seen_at timestamptz not null,
  hashrate_mh numeric(18,3) not null,        -- без float/double
  status text not null check (status in ('online','offline','inactive'))
);

create index on workers (user_id);

INSERT INTO workers (user_id, name, last_seen_at, hashrate_mh, status)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Worker-Alpha', now() - interval '5 minutes', 325421000.000, 'online'),
  ('00000000-0000-0000-0000-000000000001', 'Worker-Beta',  now() - interval '1 hour',    212883000.000, 'offline'),
  ('00000000-0000-0000-0000-000000000002', 'Worker-Gamma', now() - interval '2 days',    145052000.000, 'inactive'),
  ('00000000-0000-0000-0000-000000000002', 'Worker-Delta', now() - interval '10 minutes',412000000.000, 'online');

INSERT INTO watcher_links (user_id, payload_hash, expires_at, revoked_at)
VALUES
  ('00000000-0000-0000-0000-000000000001', decode('bb82030dbc2bcaba32a90bf2e207a84a856fc5f033b77c480836ab6f77f40f19','hex'), now() + interval '7 days', null),
  ('00000000-0000-0000-0000-000000000001', decode('3eb4ea2b0f0332acd6d6c234fe4a00479473cc94886b0f679bd225fc5ca3b3f8','hex'), now() + interval '3 days', null),
  ('00000000-0000-0000-0000-000000000002', decode('08caa1c9b279fb37142edb6ed987b65a5fc241e17307178a48157aa2f1aba887','hex'), now() + interval '1 day', now() - interval '1 hour'),
  ('00000000-0000-0000-0000-000000000002', decode('fdb0eae70ccb66761527e407350073b5d4821cf266131d15243c4173de6e9f14','hex'), now() + interval '10 days', null);
