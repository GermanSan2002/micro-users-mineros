import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './orm.config';
import userRoutes from './routes/userRoutes';
import bodyParser from 'body-parser';

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use('/api', userRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: any) => console.log(error));

