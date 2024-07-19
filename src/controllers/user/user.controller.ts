import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CredentialsDTO } from '../../dto/credentialsDTO';
import { UserDTO } from '../../dto/userDTO';
import { UserService } from '../../services/user/user.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiBody({ type: CredentialsDTO })
  @ApiResponse({ status: 200, description: 'Login successful, token returned' })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
  async login(@Body() credentialsDTO: CredentialsDTO, @Res() res: Response) {
    try {
      const token = await this.userService.loginUsuario(credentialsDTO);
      res.status(200).json({ token });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'Unknown error occurred' });
      }
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CredentialsDTO })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async crearUsuario(
    @Body() credentialsDTO: CredentialsDTO,
    @Res() res: Response,
  ) {
    try {
      const userDTO = await this.userService.crearUsuario(credentialsDTO);
      res.status(201).json(userDTO);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: UserDTO })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async modificarUsuario(
    @Param('id') id: string,
    @Body() userDTO: UserDTO,
    @Res() res: Response,
  ) {
    try {
      const updatedUser = await this.userService.modificarUsuario(id, userDTO);
      res.status(200).json(updatedUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async eliminarUsuario(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.userService.eliminarUsuario(id);
      res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  }

  @Patch(':id/block')
  @ApiOperation({ summary: 'Block a user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ schema: { example: { motivo: 'Reason for blocking' } } })
  @ApiResponse({ status: 200, description: 'User blocked successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async bloquearUsuario(
    @Param('id') id: string,
    @Body('motivo') motivo: string,
    @Res() res: Response,
  ) {
    try {
      const userDTO = await this.userService.bloquearUsuario(id, motivo);
      res.status(200).json(userDTO);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  }

  @Post('recover-password')
  @ApiOperation({ summary: 'Recover password' })
  @ApiBody({ schema: { example: { email: 'user@example.com' } } })
  @ApiResponse({ status: 200, description: 'Password recovery email sent' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async recuperarContraseña(
    @Body('email') email: string,
    @Res() res: Response,
  ) {
    try {
      await this.userService.recuperarContraseña(email);
      res.status(200).send({ message: 'Password recovery email sent' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  }
}
