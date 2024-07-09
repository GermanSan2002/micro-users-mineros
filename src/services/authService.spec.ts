import { AuthService } from '../services/authService';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

describe('AuthService', () => {
  const password = 'password123';
  const hashedPassword = '$2a$10$CwTycUXWue0Thq9StjUM0uJ8o/1cOdsfBoZmrg5ZrFX9aURWkMuwK'; // Example hashed password
  const userId = '12345';
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });

  beforeAll(() => {
    process.env.JWT_SECRET = 'your_jwt_secret';
    process.env.HASH_SALT_ROUNDS = '10';
  });

  afterAll(() => {
    delete process.env.JWT_SECRET;
    delete process.env.HASH_SALT_ROUNDS;
  });

  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const result = await AuthService.hashPassword(password);
      expect(result).not.toBe(password);
      expect(await bcrypt.compare(password, result)).toBe(true);
    });
  });

  describe('comparePassword', () => {
    it('should return true for matching passwords', async () => {
      const result = await AuthService.comparePassword(password, hashedPassword);
      expect(result).toBe(true);
    });

    it('should return false for non-matching passwords', async () => {
      const result = await AuthService.comparePassword('wrongpassword', hashedPassword);
      expect(result).toBe(false);
    });
  });

  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const token = AuthService.generateToken(userId);
      expect(token).toBeDefined();
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      expect((decoded as any).userId).toBe(userId);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid JWT token', () => {
      const decoded = AuthService.verifyToken(token);
      expect(decoded).toBeDefined();
      expect((decoded as any).userId).toBe(userId);
    });

    it('should throw an error for an invalid token', () => {
      expect(() => AuthService.verifyToken('invalidtoken')).toThrow('Invalid token');
    });
  });
});
