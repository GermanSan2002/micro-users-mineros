import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from '../token/token.service';
import { CredentialsDTO } from '../user/dto/credentialsDTO';
import { UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

const mockAuthService = {
  login: jest.fn(),
};

const mockTokenService = {
  verifyToken: jest.fn(),
  refreshAccessToken: jest.fn(),
};

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res as Response;
};

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let tokenService: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: TokenService, useValue: mockTokenService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    tokenService = module.get<TokenService>(TokenService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return tokens for valid credentials', async () => {
      const res = mockResponse();
      const credentialsDTO: CredentialsDTO = { email: 'test@example.com', password: 'password' };
      const mockTokens = { accessToken: 'accessToken', refreshToken: 'refreshToken' };
      mockAuthService.login.mockResolvedValue(mockTokens);

      await controller.login(credentialsDTO, res);

      expect(authService.login).toHaveBeenCalledWith(credentialsDTO);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockTokens);
    });

    it('should return 400 for invalid credentials', async () => {
      const res = mockResponse();
      const credentialsDTO: CredentialsDTO = { email: 'test@example.com', password: 'wrongPassword' };
      mockAuthService.login.mockRejectedValue(new Error('Invalid email or password'));

      await controller.login(credentialsDTO, res);

      expect(authService.login).toHaveBeenCalledWith(credentialsDTO);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
    });
  });

  describe('checkAuth', () => {
    it('should return decoded token for valid token', async () => {
      const token = 'validToken';
      const decoded = { userId: '12345' };
      mockTokenService.verifyToken.mockReturnValue(decoded);

      const result = await controller.checkAuth(token);

      expect(tokenService.verifyToken).toHaveBeenCalledWith(token);
      expect(result).toEqual({ decoded });
    });

    it('should throw UnauthorizedException for invalid token', async () => {
      const token = 'invalidToken';
      mockTokenService.verifyToken.mockImplementation(() => {
        throw new Error();
      });

      await expect(controller.checkAuth(token)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('refreshAccessToken', () => {
    it('should return new access token for valid refresh token', async () => {
      const refreshToken = 'validRefreshToken';
      const newAccessToken = 'newAccessToken';
      mockTokenService.refreshAccessToken.mockResolvedValue(newAccessToken);

      const result = await controller.refreshAccessToken(refreshToken);

      expect(tokenService.refreshAccessToken).toHaveBeenCalledWith(refreshToken);
      expect(result).toEqual({ accessToken: newAccessToken });
    });

    it('should throw UnauthorizedException for invalid refresh token', async () => {
      const refreshToken = 'invalidRefreshToken';
      mockTokenService.refreshAccessToken.mockRejectedValue(new Error());

      await expect(controller.refreshAccessToken(refreshToken)).rejects.toThrow(UnauthorizedException);
    });
  });
});
