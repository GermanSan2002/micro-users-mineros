import { Module } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';

@Module({
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
