import { Router } from 'express';
import teamsRoute from './teams.routes';
import userRoute from './user.routes';
import matchesRoute from './matches.routes';
import leaderboardsRoute from './leaderboards.routes';

const router = Router();

router.use('/teams', teamsRoute);
router.use('/login', userRoute);
router.use('/matches', matchesRoute);
router.use('/leaderboard', leaderboardsRoute);

export default router;
