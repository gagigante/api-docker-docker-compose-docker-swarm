import { Request, Response, Router } from 'express';

import { contactRouter } from './contactRouter';

const routes = Router();

routes.use('contact', contactRouter)

export { routes };