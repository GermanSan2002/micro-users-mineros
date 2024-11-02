import { Controller, Post, Body, UnauthorizedException, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { CredentialsDTO } from '../user/dto/credentialsDTO';
import { TokenService } from '../token/token.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly tokenService: TokenService) {}

  @Post('login')
  @ApiBody({ type: CredentialsDTO })
  @ApiResponse({ status: 200, description: 'Login successful, token returned' })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
  async login(@Body() credentialsDTO: CredentialsDTO, @Res() res: Response) {
    try {
      const { accessToken, refreshToken } = await this.authService.login(credentialsDTO);
      res.status(200).json({ accessToken, refreshToken });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'Unknown error occurred' });
      }
    }
  }

  @Post('checkAuth')
  @ApiOperation({ summary: 'Decodificar un token JWT para verificar autentificacion' })
  @ApiResponse({ status: 200, description: 'Token decodificado correctamente', schema: { example: { decoded: { userId: '12345' } } } })
  @ApiResponse({ status: 401, description: 'Token inválido o expirado' })
  @ApiBody({ description: 'Token JWT a decodificar', schema: { example: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' } } })
  async checkAuth(@Body('token') token: string) {
    try {
      const decoded = this.tokenService.verifyToken(token);
      return { decoded };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refrescar el access token utilizando el refresh token' })
  @ApiResponse({ status: 200, description: 'Nuevo access token generado', schema: { example: { accessToken: 'newAccessToken' } } })
  @ApiResponse({ status: 401, description: 'Refresh token inválido o expirado' })
  @ApiBody({ description: 'Refresh token para solicitar un nuevo access token', schema: { example: { refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' } } })
  async refreshAccessToken(@Body('refreshToken') refreshToken: string) {
    try {
      const newAccessToken = await this.tokenService.refreshAccessToken(refreshToken);
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
