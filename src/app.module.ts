import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/user.controller';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/user/entities/User';
import { Operation } from './modules/user/entities/Operation';
import { DataSourceConfig } from './database/data.source';
import { MailModule } from './modules/mail/mail.module';
import { AuthService } from './modules/auth/auth.service';
import { UserService } from './modules/user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que el ConfigModule esté disponible en todo el proyecto sin necesidad de importarlo en cada módulo
      envFilePath: '.env', // Especifica la ruta al archivo .env
    }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    TypeOrmModule.forFeature([User, Operation]),
    UserModule,
    AuthModule,
    MailModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, AuthService],
})
export class AppModule {}
