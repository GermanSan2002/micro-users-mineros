import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { CredentialsDTO } from '../dto/credentialsDTO';
import { UserDTO } from '../dto/userDTO';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async crearUsuario(req: Request, res: Response): Promise<void> {
    try {
      const credentialsDTO = new CredentialsDTO(req.body.email, req.body.password);
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

  async modificarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const userDTO = new UserDTO(id, req.body.nombre, req.body.email, req.body.estado, new Date(), new Date());
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

  async eliminarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
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

  async bloquearUsuario(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const motivo = req.body.motivo;
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

  async recuperarContraseña(req: Request, res: Response): Promise<void> {
    try {
      const email = req.body.email;
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
