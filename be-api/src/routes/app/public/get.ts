import { config } from 'src/utils/navigation';

export const { onSuccess, options } = config('Mock', {
  tag: 'app',
  mode: 'status',
  roles: ['guest'],
  schema: {
    response: {
      model: 'status',
      errors: [],
    },
  },
});

export const handler = () => onSuccess(true);
