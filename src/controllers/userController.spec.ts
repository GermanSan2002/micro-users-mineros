import request from 'supertest';
import express, { Express } from 'express';
import { UserController } from '../controllers/userController';
import { UserService } from '../services/userService';
import { CredentialsDTO } from '../dto/credentialsDTO';
import { UserDTO } from '../dto/userDTO';

jest.mock('../services/userService');

describe('UserController', () => {
  let app: Express;
  let userController: UserController;
  let userServiceMock: jest.Mocked<UserService>;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    userController = new UserController();
    app.post('/login', (req, res) => userController.login(req, res));
    app.post('/usuarios', (req, res) => userController.crearUsuario(req, res));
    app.put('/usuarios/:id', (req, res) => userController.modificarUsuario(req, res));
    app.delete('/usuarios/:id', (req, res) => userController.eliminarUsuario(req, res));
    app.post('/usuarios/:id/bloquear', (req, res) => userController.bloquearUsuario(req, res));
    app.post('/recuperar-contraseña', (req, res) => userController.recuperarContraseña(req, res));

    userServiceMock = new UserService() as jest.Mocked<UserService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return token on successful login', async () => {
      const credentialsDTO = new CredentialsDTO('test@example.com', 'password123');
      const token = 'mockToken';
      userServiceMock.loginUsuario.mockResolvedValueOnce(token);

      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(200);
      expect(response.body.token).toBe(token);
      expect(userServiceMock.loginUsuario).toHaveBeenCalledWith(credentialsDTO);
    });

    it('should return 400 on invalid login', async () => {
      userServiceMock.loginUsuario.mockRejectedValueOnce(new Error('Invalid email or password'));

      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'wrongpassword' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid email or password');
    });
  });

  describe('crearUsuario', () => {
    it('should create a new user', async () => {
      const credentialsDTO = new CredentialsDTO('newuser@example.com', 'password123');
      const userDTO = new UserDTO('1', 'defaultName', 'newuser@example.com', 'active', new Date(), new Date());
      userServiceMock.crearUsuario.mockResolvedValueOnce(userDTO);

      const response = await request(app)
        .post('/usuarios')
        .send({ email: 'newuser@example.com', password: 'password123' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(userDTO);
      expect(userServiceMock.crearUsuario).toHaveBeenCalledWith(credentialsDTO);
    });

    it('should return 500 on error', async () => {
      userServiceMock.crearUsuario.mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app)
        .post('/usuarios')
        .send({ email: 'newuser@example.com', password: 'password123' });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Database error');
    });
  });

  describe('modificarUsuario', () => {
    it('should modify a user', async () => {
      const id = '1';
      const userDTO = new UserDTO(id, 'Updated Name', 'updated@example.com', 'active', new Date(), new Date());
      const updatedUserDTO = new UserDTO(id, 'Updated Name', 'updated@example.com', 'active', new Date(), new Date());
      userServiceMock.modificarUsuario.mockResolvedValueOnce(updatedUserDTO);
  
      const response = await request(app)
        .put(`/usuarios/${id}`)
        .send({ nombre: 'Updated Name', email: 'updated@example.com', estado: 'active' });
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedUserDTO);
      expect(userServiceMock.modificarUsuario).toHaveBeenCalledWith(id, userDTO);
    });
  
    it('should return 500 on error', async () => {
      const id = '1';
      userServiceMock.modificarUsuario.mockRejectedValueOnce(new Error('Database error'));
  
      const response = await request(app)
        .put(`/usuarios/${id}`)
        .send({ nombre: 'Updated Name', email: 'updated@example.com', estado: 'active' });
  
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Database error');
    });
  
    it('should return 500 on unknown error', async () => {
      const id = '1';
      userServiceMock.modificarUsuario.mockRejectedValueOnce('Unknown error');
  
      const response = await request(app)
        .put(`/usuarios/${id}`)
        .send({ nombre: 'Updated Name', email: 'updated@example.com', estado: 'active' });
  
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Unknown error occurred');
    });
  });
  
  describe('eliminarUsuario', () => {
    it('should delete a user', async () => {
      const id = '1';
      userServiceMock.eliminarUsuario.mockResolvedValueOnce();
  
      const response = await request(app).delete(`/usuarios/${id}`);
  
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
      expect(userServiceMock.eliminarUsuario).toHaveBeenCalledWith(id);
    });
  
    it('should return 500 on error', async () => {
      const id = '1';
      userServiceMock.eliminarUsuario.mockRejectedValueOnce(new Error('Database error'));
  
      const response = await request(app).delete(`/usuarios/${id}`);
  
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Database error');
    });
  
    it('should return 500 on unknown error', async () => {
      const id = '1';
      userServiceMock.eliminarUsuario.mockRejectedValueOnce('Unknown error');
  
      const response = await request(app).delete(`/usuarios/${id}`);
  
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Unknown error occurred');
    });
  });  

  describe('bloquearUsuario', () => {
    it('should block a user', async () => {
      const id = '1';
      const motivo = 'Razón de bloqueo';
      const userDTO = new UserDTO(id, 'Usuario Bloqueado', 'bloqueado@example.com', 'blocked', new Date(), new Date());
      userServiceMock.bloquearUsuario.mockResolvedValueOnce(userDTO);
  
      const response = await request(app)
        .put(`/usuarios/${id}/bloquear`)
        .send({ motivo });
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual(userDTO);
      expect(userServiceMock.bloquearUsuario).toHaveBeenCalledWith(id, motivo);
    });
  
    it('should return 500 on error', async () => {
      const id = '1';
      const motivo = 'Razón de bloqueo';
      userServiceMock.bloquearUsuario.mockRejectedValueOnce(new Error('Database error'));
  
      const response = await request(app)
        .put(`/usuarios/${id}/bloquear`)
        .send({ motivo });
  
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Database error');
    });
  
    it('should return 500 on unknown error', async () => {
      const id = '1';
      const motivo = 'Razón de bloqueo';
      userServiceMock.bloquearUsuario.mockRejectedValueOnce('Unknown error');
  
      const response = await request(app)
        .put(`/usuarios/${id}/bloquear`)
        .send({ motivo });
  
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Unknown error occurred');
    });
  });  
  
  describe('recuperarContraseña', () => {
    it('should trigger password recovery', async () => {
      const email = 'usuario@example.com';
      userServiceMock.recuperarContraseña.mockResolvedValueOnce();
  
      const response = await request(app)
        .post('/usuarios/recuperar-contraseña')
        .send({ email });
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual({});
      expect(userServiceMock.recuperarContraseña).toHaveBeenCalledWith(email);
    });
  
    it('should return 500 on error', async () => {
      const email = 'usuario@example.com';
      userServiceMock.recuperarContraseña.mockRejectedValueOnce(new Error('Database error'));
  
      const response = await request(app)
        .post('/usuarios/recuperar-contraseña')
        .send({ email });
  
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Database error');
    });
  
    it('should return 500 on unknown error', async () => {
      const email = 'usuario@example.com';
      userServiceMock.recuperarContraseña.mockRejectedValueOnce('Unknown error');
  
      const response = await request(app)
        .post('/usuarios/recuperar-contraseña')
        .send({ email });
  
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Unknown error occurred');
    });
  });  
});
