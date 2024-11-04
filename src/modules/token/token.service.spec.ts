import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { Repository } from 'typeorm';
import { User } from '../user/entities/User';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { Role } from '../roles/entities/Role';

const mockUserRepository = {
  findOne: jest.fn(),
};

describe('TokenService', () => {
  let service: TokenService;
  let userRepository: Repository<User>;

  const jwtSecret = process.env.JWT_SECRET || 'jwt-secret';
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateAccessToken', () => {
    it('should generate an access token with user ID and roles', () => {
      const userId = '1';
      const roles: Role[] = [{ id: '1', role: 'user' } as Role];
      const token = service.generateAccessToken(userId, roles);

      const decoded = jwt.verify(token, jwtSecret) as { userId: string; roles: string[] };
      expect(decoded.userId).toBe(userId);
      expect(decoded.roles).toEqual(['user']);
    });
  });

  describe('generateRefreshToken', () => {
    it('should generate a refresh token with user ID', () => {
      const userId = '1';
      const token = service.generateRefreshToken(userId);

      const decoded = jwt.verify(token, refreshTokenSecret) as { userId: string };
      expect(decoded.userId).toBe(userId);
    });
  });

  describe('verifyToken', () => {
    it('should verify and decode a valid token', () => {
      const userId = '1';
      const token = jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });

      const decoded = service.verifyToken(token);
      expect(decoded.userId).toBe(userId);
    });

    it('should throw an error for an invalid token', () => {
      const invalidToken = 'invalidToken';
      expect(() => service.verifyToken(invalidToken)).toThrow('Invalid token');
    });
  });

  describe('refreshAccessToken', () => {
    it('should return a new access token for a valid refresh token', async () => {
      const refreshToken = jwt.sign({ userId: '1' }, refreshTokenSecret, { expiresIn: '7d' });
      const user = { id: '1', roles: [{ id: '1', role: 'user' } as Role] };
      mockUserRepository.findOne.mockResolvedValue(user);

      const newAccessToken = await service.refreshAccessToken(refreshToken);

      const decoded = jwt.verify(newAccessToken, jwtSecret) as { userId: string; roles: string[] };
      expect(decoded.userId).toBe(user.id);
      expect(decoded.roles).toEqual(['user']);
    });

    it('should throw an error for an invalid refresh token', async () => {
      const invalidRefreshToken = 'invalidRefreshToken';
      await expect(service.refreshAccessToken(invalidRefreshToken)).rejects.toThrow('Invalid or expired refresh token');
    });

    it('should throw an error if user is not found', async () => {
      const refreshToken = jwt.sign({ userId: 'nonExistentUser' }, refreshTokenSecret, { expiresIn: '7d' });
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.refreshAccessToken(refreshToken)).rejects.toThrow('User not found');
    });
  });
});
