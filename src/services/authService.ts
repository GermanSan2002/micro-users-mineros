import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const saltRounds = parseInt(process.env.HASH_SALT_ROUNDS || '10', 10);
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static generateToken(userId: string): string {
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
  }

  static verifyToken(token: string): { userId: string } {
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }
    try {
      const decodedToken = jwt.verify(token, jwtSecret);
      return decodedToken as { userId: string }; // Especifica el tipo devuelto por jwt.verify
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
}
