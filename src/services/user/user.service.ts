import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CredentialsDTO } from '../../dto/credentialsDTO';
import { UserDTO } from '../../dto/userDTO';
import { Operation } from '../../entities/Operation';
import { User } from '../../entities/User';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { ErrorManager } from '../../utils/error.manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Operation)
    private readonly operationRepository: Repository<Operation>,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
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

    const findUsuario = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (findUsuario) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'El email ya existe',
      });
    }

    const hashedPassword = await this.authService.hashPassword(password);
    const user = new User();
    console.log(hashedPassword);
    console.log(email);
    user.nombre = 'defaultName';
    user.email = email;
    user.password = hashedPassword;
    user.estado = 'active';
    console.log(JSON.stringify(user, null, 2));
    const savedUser = await this.userRepository.save(user);
    return new UserDTO(
      savedUser.id,
      savedUser.nombre,
      savedUser.email,
      savedUser.estado,
      savedUser.fechaCreacion,
      savedUser.fechaModificacion,
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
  }
}
