import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { ContactController } from '@/controllers/ContactController';

const contactController = new ContactController();

const contactRouter = Router();

contactRouter.get('/', contactController.index);

contactRouter.get(
  '/:id', 
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  contactController.show
);

contactRouter.post(
  '/',  
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
    },
  }),
  contactController.create,
);

contactRouter.put(
  '/:id',  
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
    },
  }),
  contactController.update,
);

contactRouter.delete(
  '/:id',
  celebrate({  
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    }
  }), 
  contactController.destroy
);

export { contactRouter };