import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/User';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository, // Proporciona un mock del repositorio
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash a password', async () => {
    const password = 'password';
    const hash = await service.hashPassword(password);
    expect(hash).not.toBe(password);
  });

  it('should compare passwords', async () => {
    const password = 'password';
    const hash = await service.hashPassword(password);
    const isMatch = await service.comparePassword(password, hash);
    expect(isMatch).toBe(true);
  });

  it('should generate a token', () => {
    const userId = 'user-id';
    const token = service.generateToken(userId);
    expect(token).toBeDefined();
  });

  it('should verify a token', () => {
    const userId = 'user-id';
    const token = service.generateToken(userId);
    const decoded = service.verifyToken(token);
    expect(decoded.userId).toBe(userId);
  });
});
