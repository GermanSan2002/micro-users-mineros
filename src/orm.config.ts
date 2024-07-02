import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Operation } from './entities/Operation';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'yourhost', // Nombre del servicio de Docker, no 'localhost'
  port: 5432,
  username: 'youruser',
  password: 'yourpassword',
  database: 'yourdatabase',
  synchronize: true,
  logging: false,
  entities: [User, Operation],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
});
