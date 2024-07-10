import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CredentialsDTO } from '../../dto/credentialsDTO';
import { UserDTO } from '../../dto/userDTO';
import { Operation } from '../../entities/Operation';
import { User } from '../../entities/User';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Operation)
    private readonly operationRepository: Repository<Operation>,
    private readonly authService: AuthService,
  ) {}

  async loginUsuario(credentialsDTO: CredentialsDTO): Promise<string> {
    const { email, password } = credentialsDTO;
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }

    const isPasswordValid = await this.authService.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid email or password');
    }

    const token = this.authService.generateToken(user.id);
    return token;
  }

  async crearUsuario(credentialsDTO: CredentialsDTO): Promise<UserDTO> {
    const { email, password } = credentialsDTO;
    const hashedPassword = await this.authService.hashPassword(password);
    const user = new User();
    user.nombre = 'defaultName';
    user.email = email;
    user.password = hashedPassword;
    user.estado = 'active';
    await this.userRepository.save(user);
    return new UserDTO(
      user.id,
      user.nombre,
      user.email,
      user.estado,
      user.fechaCreacion,
      user.fechaModificacion,
    );
  }

  async modificarUsuario(id: string, userDTO: UserDTO): Promise<UserDTO> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    user.nombre = userDTO.nombre;
    user.email = userDTO.email;
    user.estado = userDTO.estado;
    user.fechaModificacion = new Date();
    await this.userRepository.save(user);
    return new UserDTO(
      user.id,
      user.nombre,
      user.email,
      user.estado,
      user.fechaCreacion,
      user.fechaModificacion,
    );
  }

  async eliminarUsuario(id: string): Promise<void> {
    await this.userRepository.delete({ id });
  }

  async bloquearUsuario(id: string, motivo: string): Promise<UserDTO> {
    const user = await this.userRepository.findOneBy({ id });
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
    );
  }

  async recuperarContraseña(email: string): Promise<void> {
    console.log(email);
    // Implementar la lógica de recuperación de contraseña
  }
}
