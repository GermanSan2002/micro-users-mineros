import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../services/user/user.service';
import { CredentialsDTO } from '../../dto/credentialsDTO';
import { UserDTO } from '../../dto/userDTO';
import { Response } from 'express';
import { getMockRes } from '@jest-mock/express';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  let res: Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            loginUsuario: jest.fn(),
            crearUsuario: jest.fn(),
            modificarUsuario: jest.fn(),
            eliminarUsuario: jest.fn(),
            bloquearUsuario: jest.fn(),
            recuperarContraseña: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    res = getMockRes().res;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a token if credentials are valid', async () => {
      const credentialsDTO: CredentialsDTO = {
        email: 'test@test.com',
        password: 'password',
      };
      const token = 'valid_token';
      (userService.loginUsuario as jest.Mock).mockResolvedValue(token);

      await controller.login(credentialsDTO, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token });
    });

    it('should return a 400 error if an error occurs', async () => {
      const credentialsDTO: CredentialsDTO = {
        email: 'test@test.com',
        password: 'password',
      };
      (userService.loginUsuario as jest.Mock).mockRejectedValue(
        new Error('Invalid credentials'),
      );

      await controller.login(credentialsDTO, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });
  });

  describe('crearUsuario', () => {
    it('should create and return a new user', async () => {
      const credentialsDTO: CredentialsDTO = {
        email: 'test@test.com',
        password: 'password',
      };
      const fecha = new Date();
      const userDTO: UserDTO = {
        id: '1',
        nombre: 'John Doe',
        email: 'test@test.com',
        estado: 'active',
        fechaCreacion: fecha,
        fechaModificacion: fecha,
      };
      (userService.crearUsuario as jest.Mock).mockResolvedValue(userDTO);

      await controller.crearUsuario(credentialsDTO, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(userDTO);
    });

    it('should return a 500 error if an error occurs', async () => {
      const credentialsDTO: CredentialsDTO = {
        email: 'test@test.com',
        password: 'password',
      };
      (userService.crearUsuario as jest.Mock).mockRejectedValue(
        new Error('Error creating user'),
      );

      await controller.crearUsuario(credentialsDTO, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error creating user' });
    });
  });

  describe('modificarUsuario', () => {
    it('should update and return the user', async () => {
      const id = '1';
      const fecha = new Date();
      const userDTO: UserDTO = {
        id: '1',
        nombre: 'John Doe',
        email: 'test@test.com',
        estado: 'active',
        fechaCreacion: fecha,
        fechaModificacion: fecha,
      };
      const updatedUserDTO: UserDTO = {
        id: '1',
        nombre: 'Jane Doe',
        email: 'test2@test.com',
        estado: 'inactive',
        fechaCreacion: fecha,
        fechaModificacion: new Date(),
      };
      (userService.modificarUsuario as jest.Mock).mockResolvedValue(
        updatedUserDTO,
      );

      await controller.modificarUsuario(id, userDTO, res);

      expect(userService.modificarUsuario).toHaveBeenCalledWith(id, userDTO);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedUserDTO);
    });

    it('should return a 500 error if an error occurs', async () => {
      const id = '1';
      const userDTO: UserDTO = {
        id: '1',
        nombre: 'John Doe',
        email: 'test@test.com',
        estado: 'active',
        fechaCreacion: new Date(),
        fechaModificacion: new Date(),
      };
      (userService.modificarUsuario as jest.Mock).mockRejectedValue(
        new Error('Error updating user'),
      );

      await controller.modificarUsuario(id, userDTO, res);

      expect(userService.modificarUsuario).toHaveBeenCalledWith(id, userDTO);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error updating user' });
    });
  });

  describe('bloquearUsuario', () => {
    it('should block and return the user', async () => {
      const id = '1';
      const motivo = 'violación de términos';
      const fecha = new Date();
      const userDTO: UserDTO = {
        id: '1',
        nombre: 'John Doe',
        email: 'test@test.com',
        estado: 'blocked',
        fechaCreacion: fecha,
        fechaModificacion: new Date(),
      };
      (userService.bloquearUsuario as jest.Mock).mockResolvedValue(userDTO);

      await controller.bloquearUsuario(id, motivo, res);

      expect(userService.bloquearUsuario).toHaveBeenCalledWith(id, motivo);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(userDTO);
    });

    it('should return a 500 error if an error occurs', async () => {
      const id = '1';
      const motivo = 'violación de términos';
      (userService.bloquearUsuario as jest.Mock).mockRejectedValue(
        new Error('Error blocking user'),
      );

      await controller.bloquearUsuario(id, motivo, res);

      expect(userService.bloquearUsuario).toHaveBeenCalledWith(id, motivo);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error blocking user' });
    });
  });
});
