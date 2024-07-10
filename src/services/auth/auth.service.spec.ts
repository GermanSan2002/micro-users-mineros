import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
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
