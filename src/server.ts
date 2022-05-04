import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';

import { app } from './app';

app.listen(3333, () => console.log('App is running at port 3333'));
