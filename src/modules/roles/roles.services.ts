// src/role/role.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from './entities/Role';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleDTO } from './dto/roleDTO';
import { User } from '../user/entities/User';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async setUsers(roleId: string, usersId: string[]): Promise<any> {
    // Verificamos que el rol existe
    const role = await this.roleRepository.findOneBy({ id: roleId });
    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }

    // Buscamos los usuarios especificados por sus IDs
    const users = await this.userRepository.find({
      where: { id: In(usersId) },
      relations: ['roles'], // Incluimos la relación roles
    });

    // Verificamos si algunos IDs de usuarios no fueron encontrados
    if (users.length !== usersId.length) {
      const foundUserIds = users.map(user => user.id);
      const missingUserIds = usersId.filter(id => !foundUserIds.includes(id));
      throw new NotFoundException(`Users with IDs ${missingUserIds.join(', ')} not found`);
    }

    // Agregamos el rol a cada usuario que aún no lo tenga asignado
    users.forEach(user => {
      if (!user.roles.some(r => r.id === role.id)) {
        user.roles.push(role);
      }
    });

    // Guardamos los usuarios actualizados con los nuevos roles asignados
    await this.userRepository.save(users);

    return {
      message: `Role with ID ${roleId} successfully assigned to users`,
      users: users.map(user => ({ id: user.id, roles: user.roles.map(role => role.role) })),
    };
  }

  async createRole(roleDTO: RoleDTO): Promise<any> {
    return await this.roleRepository.save(roleDTO);
  }

  async update(roleDTO: RoleDTO): Promise<any> {
    const role = await this.roleRepository.findOneBy({ id: roleDTO.id });
    if (!role) throw new NotFoundException('Role not found');
    role.role = roleDTO.role || role.role; 

    return await this.roleRepository.save(role);
  }

  async deleteRole(roleId: string): Promise<any> {
    return await this.roleRepository.delete(roleId);
  }
}
