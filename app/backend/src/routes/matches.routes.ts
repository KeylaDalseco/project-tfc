import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middleware/Validations';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (inProgress !== undefined) {
    matchController.matchInProgress(req, res);
  } else {
    matchController.getAllMatches(req, res);
  }
});

router.post(
  '/',
  Validations.auth,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

router.patch(
  '/:id/finish',
  Validations.auth,
  (req: Request, res: Response) => matchController.finishedMatch(req, res),
);

router.patch(
  '/:id',
  Validations.auth,
  (req:Request, res: Response) => matchController.updateMatchPoints(req, res),
);

router.get(
  '/:id',
  (req: Request, res: Response) => matchController.findById(req, res),
);

export default router;
