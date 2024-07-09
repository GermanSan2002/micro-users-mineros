import { AppDataSource } from '../orm.config';
import { User } from '../entities/User';
import { Operation } from '../entities/Operation';
import { UserDTO } from '../dto/userDTO';
import { CredentialsDTO } from '../dto/credentialsDTO';
import { AuthService } from './authService';

export class UserService {
  async loginUsuario(credentialsDTO: CredentialsDTO): Promise<string> {
    const userRepository = AppDataSource.getRepository(User);
    const { email, password } = credentialsDTO;
    const user = await userRepository.findOneBy({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await AuthService.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = AuthService.generateToken(user.id);
    return token;
  }

  async crearUsuario(credentialsDTO: CredentialsDTO): Promise<UserDTO> {
    const userRepository = AppDataSource.getRepository(User);
    const { email, password } = credentialsDTO;
    const hashedPassword = await AuthService.hashPassword(password);
    const user = new User();
    user.nombre = 'defaultName';
    user.email = email;
    user.password = hashedPassword;
    user.estado = 'active';
    await userRepository.save(user);
    return new UserDTO(user.id, user.nombre, user.email, user.estado, user.fechaCreacion, user.fechaModificacion);
  }

  async modificarUsuario(id: string, userDTO: UserDTO): Promise<UserDTO> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id });
    if (!user) throw new Error('User not found');
    user.nombre = userDTO.nombre;
    user.email = userDTO.email;
    user.estado = userDTO.estado;
    user.fechaModificacion = new Date();
    await userRepository.save(user);
    return new UserDTO(user.id, user.nombre, user.email, user.estado, user.fechaCreacion, user.fechaModificacion);
  }

  async eliminarUsuario(id: string): Promise<void> {
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.delete({ id });
  }

  async bloquearUsuario(id: string, motivo: string): Promise<UserDTO> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id });
    if (!user) throw new Error('User not found');
    user.estado = 'blocked';
    user.fechaModificacion = new Date();
    await userRepository.save(user);
    const operationRepository = AppDataSource.getRepository(Operation);
    const operation = operationRepository.create({ usuario: user, tipo: 'block', detalles: motivo, fecha: new Date() });
    await operationRepository.save(operation);
    return new UserDTO(user.id, user.nombre, user.email, user.estado, user.fechaCreacion, user.fechaModificacion);
  }

  async recuperarContraseña(email: string): Promise<void> {
    console.log(email);
    // Implementar la lógica de recuperación de contraseña
  }
}
