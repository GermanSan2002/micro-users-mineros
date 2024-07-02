import { AppDataSource } from '../orm.config';
import { User } from '../entities/User';
import { Operation } from '../entities/Operation';
import { UserDTO } from '../dto/userDTO';
import { CredentialsDTO } from '../dto/credentialsDTO';

export class UserService {
  async crearUsuario(credentialsDTO: CredentialsDTO): Promise<UserDTO> {
    const userRepository = AppDataSource.getRepository(User);
    const { email, password } = credentialsDTO;
    const user = userRepository.create({ nombre: 'defaultName', email, password, estado: 'active' });
    await userRepository.save(user);
    return new UserDTO(user.id, user.nombre, user.email, user.estado, user.fechaCreacion, user.fechaModificacion);
  }

  async modificarUsuario(id: string, userDTO: UserDTO): Promise<UserDTO> {
    const userRepository = AppDataSource.getRepository(User);
    let user = await userRepository.findOneBy({ id });
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
    let user = await userRepository.findOneBy({ id });
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
    // Implementar la lógica de recuperación de contraseña
  }
}
