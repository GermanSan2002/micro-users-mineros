import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const saltRounds = parseInt(process.env.HASH_SALT_ROUNDS || '10', 10);
const jwtSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';

if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}
if (!refreshTokenSecret) {
  throw new Error('REFRESH_TOKEN_SECRET is not defined in the environment variables');
}

@Injectable()
export class AuthService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  generateToken(userId: string): string {
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
  }

  generateAccessToken(userId: string): string {
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
  }

  generateRefreshToken(userId: string): string {
    if (!refreshTokenSecret) {
      throw new Error('REFRESH_TOKEN_SECRET is not defined');
    }
    return jwt.sign({ userId }, refreshTokenSecret, { expiresIn: '7d' });
  }

  verifyToken(token: string): { userId: string } {
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }
    try {
      const decodedToken = jwt.verify(token, jwtSecret);
      return decodedToken as { userId: string };
    } catch (err) {
      throw new Error('Invalid token');
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const decoded = jwt.verify(refreshToken, refreshTokenSecret) as { userId: string };
      return this.generateAccessToken(decoded.userId);
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }
}
