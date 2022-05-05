import { Router } from 'express';

import { contactRouter } from './contactRouter';

const routes = Router();

routes.use('/contacts', contactRouter)

export { routes };