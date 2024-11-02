// src/role/role.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/Role';
import { RoleService } from './roles.services';
import { User } from '../user/entities/User';
import { RoleController } from './role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
