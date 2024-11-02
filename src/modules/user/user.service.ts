import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CredentialsDTO } from './dto/credentialsDTO';
import { UserDTO } from './dto/userDTO';
import { Operation } from './entities/Operation';
import { User } from './entities/User';
import { ConfigService } from '@nestjs/config';
import { ErrorManager } from '../../utils/error.manager';
import { RoleDTO } from '../roles/dto/roleDTO';
import { Role } from '../roles/entities/Role';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Operation)
    private readonly operationRepository: Repository<Operation>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(credentialsDTO: CredentialsDTO): Promise<UserDTO> {
    const { email, password } = credentialsDTO;

    const findUsuario = await this.userRepository.findOne({
      where: { email },
    });

    if (findUsuario) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'El email ya existe',
      });
    }

    const hashedPassword = await this.authService.hashPassword(password);
    const user = new User();
    user.nombre = 'defaultName';
    user.email = email;
    user.password = hashedPassword;
    user.estado = 'active';
    user.roles = []; // Iniciamos con una lista vacía de roles
    const savedUser = await this.userRepository.save(user);

    return new UserDTO(
      savedUser.id,
      savedUser.nombre,
      savedUser.email,
      savedUser.estado,
      savedUser.fechaCreacion,
      savedUser.fechaModificacion,
      savedUser.roles.map(role => new RoleDTO(role.id, role.role)), // Convertimos los roles a RoleDTO
    );
  }

  async updateUser(id: string, userDTO: UserDTO): Promise<UserDTO> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'], // Incluimos roles en la consulta
    });
    if (!user) throw new NotFoundException('User not found');

    user.nombre = userDTO.nombre || user.nombre;
    user.email = userDTO.email || user.email;
    user.estado = userDTO.estado || user.estado;
    user.fechaModificacion = new Date();

    // Actualización de roles (si están incluidos en userDTO)
    if (userDTO.roles) {
      const roles = await this.roleRepository.findByIds(userDTO.roles.map(role => role.id));
      user.roles = roles;
    }

    await this.userRepository.save(user);
    return new UserDTO(
      user.id,
      user.nombre,
      user.email,
      user.estado,
      user.fechaCreacion,
      user.fechaModificacion,
      user.roles.map(role => new RoleDTO(role.id, role.role)), // Convertimos los roles a RoleDTO
    );
  }


  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete({ id });
  }

  async blockUser(id: string, motivo: string): Promise<UserDTO> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'], // Incluimos roles en la consulta
    });
    if (!user) throw new NotFoundException('User not found');

    user.estado = 'blocked';
    user.fechaModificacion = new Date();
    await this.userRepository.save(user);

    const operation = this.operationRepository.create({
      usuario: user,
      tipo: 'block',
      detalles: motivo,
      fecha: new Date(),
    });
    await this.operationRepository.save(operation);

    return new UserDTO(
      user.id,
      user.nombre,
      user.email,
      user.estado,
      user.fechaCreacion,
      user.fechaModificacion,
      user.roles.map(role => new RoleDTO(role.id, role.role)), // Convertimos los roles a RoleDTO
    );
  }

  async recuperarContraseña(email: string): Promise<void> {
    /*
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = this.authService.generateToken(user.id); // Usa el token JWT como token de recuperación
    const resetPasswordUrl = `${this.configService.get<string>('FRONTEND_URL')}/reset-password?token=${token}`;

    const subject = 'Password Recovery';
    const text = `To reset your password, please click the following link: ${resetPasswordUrl}`;
    const html = `<p>To reset your password, please click the following link: <a href="${resetPasswordUrl}">${resetPasswordUrl}</a></p>`;

    await this.mailService.sendMail(email, subject, text, html);
    */
  }
}
