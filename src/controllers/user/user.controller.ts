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

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
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
  async recuperarContraseña(
    @Body('email') email: string,
    @Res() res: Response,
  ) {
    try {
      await this.userService.recuperarContraseña(email);
      res.status(200).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  }
}
