import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from '../user/entities/User';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TokenService } from '../token/token.service';
import * as bcrypt from 'bcryptjs';
import { NotFoundException } from '@nestjs/common';
import { CredentialsDTO } from '../user/dto/credentialsDTO';

const mockUserRepository = {
  findOneBy: jest.fn(),
};

const mockTokenService = {
  generateAccessToken: jest.fn(),
  generateRefreshToken: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;
  let tokenService: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        { provide: TokenService, useValue: mockTokenService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    tokenService = module.get<TokenService>(TokenService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('hashPassword', () => {
    it('should hash the password correctly', async () => {
      const password = 'testPassword';
      const mockHash = 'hashedPassword';
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(mockHash);

      const hash = await service.hashPassword(password);

      expect(bcrypt.hash).toHaveBeenCalledWith(password, expect.any(Number));
      expect(hash).toBe(mockHash);
    });
  });

  describe('comparePassword', () => {
    it('should return true for a matching password', async () => {
      const password = 'testPassword';
      const hashedPassword = await bcrypt.hash(password, 10);

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await service.comparePassword(password, hashedPassword);

      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toBe(true);
    });

    it('should return false for a non-matching password', async () => {
      const password = 'testPassword';
      const hashedPassword = await bcrypt.hash('differentPassword', 10);

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const result = await service.comparePassword(password, hashedPassword);

      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toBe(false);
    });
  });

  describe('login', () => {
    it('should return tokens for valid credentials', async () => {
      const credentialsDTO: CredentialsDTO = { email: 'test@example.com', password: 'password' };
      const user = {
        id: '1',
        email: 'test@example.com',
        password: await bcrypt.hash('password', 10),
        roles: ['user'],
      };

      mockUserRepository.findOneBy.mockResolvedValue(user);
      mockTokenService.generateAccessToken.mockReturnValue('accessToken');
      mockTokenService.generateRefreshToken.mockReturnValue('refreshToken');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await service.login(credentialsDTO);

      expect(userRepository.findOneBy).toHaveBeenCalledWith({ email: credentialsDTO.email });
      expect(bcrypt.compare).toHaveBeenCalledWith(credentialsDTO.password, user.password);
      expect(result).toEqual({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
    });

    it('should throw NotFoundException for invalid email', async () => {
      const credentialsDTO: CredentialsDTO = { email: 'invalid@example.com', password: 'password' };
      mockUserRepository.findOneBy.mockResolvedValue(null);

      await expect(service.login(credentialsDTO)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException for invalid password', async () => {
      const credentialsDTO: CredentialsDTO = { email: 'test@example.com', password: 'wrongPassword' };
      const user = {
        id: '1',
        email: 'test@example.com',
        password: await bcrypt.hash('password', 10),
        roles: ['user'],
      };

      mockUserRepository.findOneBy.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(service.login(credentialsDTO)).rejects.toThrow(NotFoundException);
    });
  });
});
