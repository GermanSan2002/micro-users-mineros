import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('decode')
  @ApiOperation({ summary: 'Decodificar un token JWT' })
  @ApiResponse({ status: 200, description: 'Token decodificado correctamente', schema: { example: { decoded: { userId: '12345' } } } })
  @ApiResponse({ status: 401, description: 'Token inválido o expirado' })
  @ApiBody({ description: 'Token JWT a decodificar', schema: { example: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' } } })
  async decodeToken(@Body('token') token: string) {
    try {
      const decoded = this.authService.verifyToken(token);
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
      const newAccessToken = await this.authService.refreshAccessToken(refreshToken);
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
