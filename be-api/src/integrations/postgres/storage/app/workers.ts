import { postgres } from 'src/integrations/postgres/connection';
import { Workers } from 'src/integrations/postgres/storage/app/types';
import { joinColumns } from 'src/integrations/postgres/utils';

const COLUMNS = joinColumns<Workers>([
  'hashrate_mh',
  'last_seen_at',
  'name',
  'status',
  'user_id',
]);

export const getListWorkersByUserId = async (
  user_id: Workers['user_id']
): Promise<Workers[]> => {
  const { rows } = await postgres.query({
    text: `
      SELECT id, ${COLUMNS}
      FROM workers
      WHERE user_id = $1
      ORDER BY hashrate_mh DESC, name ASC, id ASC`,
    values: [user_id],
  });

  return rows;
};
