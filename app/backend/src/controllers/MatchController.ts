import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { status, data } = await this.matchService.getAllMatches();
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async leaderboardsHome(_req: Request, res: Response) {
    const { status, data } = await this.matchService.leaderboardsHome();
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async leaderboardsAway(_req: Request, res: Response) {
    const { status, data } = await this.matchService.leaderboardsAway();
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.findById(Number(id));
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async matchInProgress(req: Request, res: Response) {
    const inProgressQuery = req.query.inProgress === 'true';
    const { status, data } = await this.matchService.matchInProgress(inProgressQuery);
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async finishedMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.updateMatches(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateMatchPoints(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this.matchService
      .updateMatchPoints(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const match = {
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true,
    };
    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }
    const { status, data } = await this.matchService.createMatch(match);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
