import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
const userController = new UserController();

router.post('/users', (req: Request, res: Response) => userController.crearUsuario(req, res));
router.put('/users/:id', (req: Request, res: Response) => userController.modificarUsuario(req, res));
router.delete('/users/:id', (req: Request, res: Response) => userController.eliminarUsuario(req, res));
router.post('/users/:id/block', (req: Request, res: Response) => userController.bloquearUsuario(req, res));
router.post('/users/recover-password', (req: Request, res: Response) => userController.recuperarContraseña(req, res));

export default router;
