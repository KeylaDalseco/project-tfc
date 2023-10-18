import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => matchController.leaderboardsHome(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => matchController.leaderboardsAway(req, res),
);

export default router;
