import { Request, Router, Response } from 'express';
import Validations from '../middleware/Validations';
import UserController from '../controllers/UserController';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validations.validateLogin,
  Validations.validateUser,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/role',
  Validations.validateToken,
);

export default router;
