import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/User';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CredentialsDTO } from './dto/credentialsDTO';
import { ConfigService } from '@nestjs/config';
import { Operation } from './entities/Operation';
import { Role } from '../roles/entities/Role';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  let operationRepository: Repository<Operation>;
  let roleRepository: Repository<Role>;
  let authService: AuthService;
  let configService: ConfigService;

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
          provide: getRepositoryToken(Role),
          useClass: Repository,
        },
        {
          provide: AuthService,
          useValue: {
            hashPassword: jest.fn().mockResolvedValue('hashedPassword'),
            generateToken: jest.fn().mockReturnValue('fakeToken'),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('http://localhost:3000'),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    operationRepository = module.get<Repository<Operation>>(getRepositoryToken(Operation));
    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
    authService = module.get<AuthService>(AuthService);
    configService = module.get<ConfigService>(ConfigService);

    // Mock the findByIds and create methods
    jest.spyOn(roleRepository, 'findByIds').mockResolvedValue([]); // Mock `findByIds` to return an empty array
    jest.spyOn(operationRepository, 'create').mockImplementation((operation) => {
      return {
        id: '1',
        tipo: operation.tipo,
        detalles: operation.detalles,
        usuario: operation.usuario,
        fecha: operation.fecha || new Date(),
      } as Operation; // Complete Operation object
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const credentialsDTO: CredentialsDTO = { email: 'test@example.com', password: 'password' };
      const savedUser = {
        id: '1',
        nombre: 'defaultName',
        email: 'test@example.com',
        password: 'hashedPassword',
        estado: 'active',
        fechaCreacion: new Date(),
        fechaModificacion: new Date(),
        roles: [],
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(userRepository, 'save').mockResolvedValue(savedUser as User);

      const result = await service.createUser(credentialsDTO);

      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email: credentialsDTO.email } });
      expect(authService.hashPassword).toHaveBeenCalledWith(credentialsDTO.password);
      expect(userRepository.save).toHaveBeenCalled();
      expect(result).toEqual({
        id: savedUser.id,
        nombre: savedUser.nombre,
        email: savedUser.email,
        estado: savedUser.estado,
        fechaCreacion: savedUser.fechaCreacion,
        fechaModificacion: savedUser.fechaModificacion,
        roles: [],
      });
    });

    it('should throw an error if email already exists', async () => {
      const credentialsDTO: CredentialsDTO = { email: 'test@example.com', password: 'password' };
      const existingUser = { email: 'test@example.com' };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(existingUser as User);

      await expect(service.createUser(credentialsDTO)).rejects.toThrowError('El email ya existe');
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const userDTO = {
        id: '1',
        nombre: 'updatedName',
        email: 'updated@example.com',
        estado: 'active',
        roles: [],
        fechaCreacion: new Date(),
        fechaModificacion: new Date(),
      };
      const existingUser = {
        id: '1',
        nombre: 'defaultName',
        email: 'test@example.com',
        estado: 'active',
        roles: [],
        fechaCreacion: new Date(),
        fechaModificacion: new Date(),
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(existingUser as User);
      jest.spyOn(userRepository, 'save').mockResolvedValue(existingUser as User);

      const result = await service.updateUser('1', userDTO);

      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' }, relations: ['roles'] });
      expect(userRepository.save).toHaveBeenCalled();
      expect(result.nombre).toEqual(userDTO.nombre);
      expect(result.email).toEqual(userDTO.email);
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.updateUser('1', {} as any)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      jest.spyOn(userRepository, 'delete').mockResolvedValue({ affected: 1 } as any);

      await expect(service.deleteUser('1')).resolves.not.toThrow();
      expect(userRepository.delete).toHaveBeenCalledWith({ id: '1' });
    });
  });

  describe('blockUser', () => {
    it('should block a user', async () => {
      const existingUser = {
        id: '1',
        nombre: 'defaultName',
        email: 'test@example.com',
        estado: 'active',
        roles: [],
        fechaCreacion: new Date(),
        fechaModificacion: new Date(),
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(existingUser as User);
      jest.spyOn(userRepository, 'save').mockResolvedValue(existingUser as User);
      jest.spyOn(operationRepository, 'save').mockResolvedValue({
        id: '1',
        tipo: 'block',
        detalles: 'testing block reason',
        usuario: existingUser,
        fecha: new Date(),
      } as Operation);

      const result = await service.blockUser('1', 'testing block reason');

      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' }, relations: ['roles'] });
      expect(userRepository.save).toHaveBeenCalled();
      expect(operationRepository.save).toHaveBeenCalled();
      expect(result.estado).toEqual('blocked');
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.blockUser('1', 'testing block reason')).rejects.toThrowError(NotFoundException);
    });
  });
});
