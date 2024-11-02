import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/User';
import { TokenService } from './token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
