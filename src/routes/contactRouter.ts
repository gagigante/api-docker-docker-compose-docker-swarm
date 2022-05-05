import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { ContactController } from '@/controllers/ContactController';

const contactController = new ContactController();

const contactRouter = Router();

contactRouter.get('/', contactController.index);

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
  '/',  
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
  '/',
  celebrate({  
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    }
  }), 
  contactController.destroy
);

export { contactRouter };