import { AppDataSource } from '../orm.config';
import { User } from '../entities/User';
import { CredentialsDTO } from '../dto/credentialsDTO';
import { UserService } from './userService';

describe('UserService', () => {
  let userService: UserService;

  beforeAll(async () => {
    await AppDataSource.initialize();
    userService = new UserService();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    // Limpiar datos de prueba antes de cada test
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.clear();
  });

  it('should create a new user', async () => {
    const credentialsDTO = new CredentialsDTO('test@example.com', 'password123');
    const userDTO = await userService.crearUsuario(credentialsDTO);

    expect(userDTO).toHaveProperty('id');
    expect(userDTO.email).toBe('test@example.com');
  });

  it('should not login with incorrect credentials', async () => {
    const credentialsDTO = new CredentialsDTO('test@example.com', 'password123');
    await userService.crearUsuario(credentialsDTO);

    const invalidCredentialsDTO = new CredentialsDTO('test@example.com', 'wrongpassword');
    await expect(userService.loginUsuario(invalidCredentialsDTO)).rejects.toThrow('Invalid email or password');
  });

  it('should login with correct credentials', async () => {
    const credentialsDTO = new CredentialsDTO('test@example.com', 'password123');
    await userService.crearUsuario(credentialsDTO);

    const token = await userService.loginUsuario(credentialsDTO);
    expect(token).toBeDefined();
  });
});
