import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './orm.config';
import userRoutes from './routes/userRoutes';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use('/api', userRoutes);

    const PORT = parseInt(process.env.DB_PORT || '3000', 10);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => console.log(error.message));

