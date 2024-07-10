import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CredentialsDTO } from '../../dto/credentialsDTO';
import { Operation } from '../../entities/Operation';
import { User } from '../../entities/User';
import { UserDTO } from '../../dto/userDTO';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  let operationRepository: Repository<Operation>;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Operation),
          useClass: Repository,
        },
        {
          provide: AuthService,
          useValue: {
            comparePassword: jest.fn(),
            generateToken: jest.fn(),
            hashPassword: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    operationRepository = module.get<Repository<Operation>>(
      getRepositoryToken(Operation),
    );
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('loginUsuario', () => {
    it('should throw an error if user not found', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      const credentialsDTO = new CredentialsDTO('test@test.com', 'password');
      await expect(service.loginUsuario(credentialsDTO)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if password is invalid', async () => {
      const user = new User();
      user.email = 'test@test.com';
      user.password = 'hashedPassword';

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);
      jest.spyOn(authService, 'comparePassword').mockResolvedValue(false);

      const credentialsDTO = new CredentialsDTO('test@test.com', 'password');
      await expect(service.loginUsuario(credentialsDTO)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return a token if credentials are valid', async () => {
      const user = new User();
      user.id = '1';
      user.email = 'test@test.com';
      user.password = 'hashedPassword';

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);
      jest.spyOn(authService, 'comparePassword').mockResolvedValue(true);
      jest.spyOn(authService, 'generateToken').mockReturnValue('token');

      const credentialsDTO = new CredentialsDTO('test@test.com', 'password');
      const token = await service.loginUsuario(credentialsDTO);

      expect(token).toBe('token');
    });
  });

  describe('crearUsuario', () => {
    it('should create and return a new user', async () => {
      const credentialsDTO = new CredentialsDTO('test@test.com', 'password');
      const hashedPassword = 'hashedPassword';

      jest.spyOn(authService, 'hashPassword').mockResolvedValue(hashedPassword);

      const user = new User();
      user.id = '1'; // Asegurarse de que el id está definido aquí
      user.nombre = 'defaultName';
      user.email = 'test@test.com';
      user.password = hashedPassword;
      user.estado = 'active';

      jest
        .spyOn(userRepository, 'save')
        .mockImplementation(async (newUser: User) => {
          newUser.id = '1'; // Asegurar que el id se establece aquí
          return newUser;
        });

      const result = await service.crearUsuario(credentialsDTO);

      expect(result).toEqual(
        new UserDTO(
          '1',
          'defaultName',
          'test@test.com',
          'active',
          user.fechaCreacion,
          user.fechaModificacion,
        ),
      );
    });
  });

  describe('modificarUsuario', () => {
    it('should throw an error if user not found', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      const userDTO = new UserDTO(
        '1',
        'name',
        'test@test.com',
        'active',
        new Date(),
        new Date(),
      );
      await expect(service.modificarUsuario('1', userDTO)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should update and return the user', async () => {
      const user = new User();
      user.id = '1';
      user.nombre = 'name';
      user.email = 'test@test.com';
      user.estado = 'active';

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);

      const userDTO = new UserDTO(
        '1',
        'newName',
        'new@test.com',
        'active',
        new Date(),
        new Date(),
      );
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      const result = await service.modificarUsuario('1', userDTO);

      expect(result).toEqual(
        new UserDTO(
          '1',
          'newName',
          'new@test.com',
          'active',
          user.fechaCreacion,
          user.fechaModificacion,
        ),
      );
    });
  });

  describe('eliminarUsuario', () => {
    it('should delete the user', async () => {
      jest.spyOn(userRepository, 'delete').mockResolvedValue(undefined);

      await expect(service.eliminarUsuario('1')).resolves.toBeUndefined();
    });
  });

  describe('bloquearUsuario', () => {
    it('should block and return the user', async () => {
      const user = new User();
      user.id = '1';
      user.nombre = 'name';
      user.email = 'test@test.com';
      user.estado = 'active';

      const operation = new Operation();
      operation.usuario = user;
      operation.tipo = 'block';
      operation.detalles = 'motivo';
      operation.fecha = new Date();

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);
      jest.spyOn(operationRepository, 'create').mockReturnValue(operation);
      jest.spyOn(operationRepository, 'save').mockResolvedValue(operation);

      const result = await service.bloquearUsuario('1', 'motivo');

      expect(result).toEqual(
        new UserDTO(
          '1',
          'name',
          'test@test.com',
          'blocked',
          user.fechaCreacion,
          user.fechaModificacion,
        ),
      );
    });
  });

  describe('recuperarContraseña', () => {
    it('should call the recovery logic', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      await service.recuperarContraseña('test@test.com');

      expect(consoleSpy).toHaveBeenCalledWith('test@test.com');
    });
  });
});
