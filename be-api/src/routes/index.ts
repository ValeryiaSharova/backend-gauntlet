import * as app from 'src/routes/app';
import { router } from 'src/utils/navigation';

export const routes = router({
  '/public/w/:token/dashboard': {
    GET: app.publicRoutes.get,
  },
});
