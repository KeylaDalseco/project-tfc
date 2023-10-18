import { IFindById } from '../Interfaces/ICRUDModel';
import MatchModel, { IMatchStats } from '../models/MatchesModel';
import TeamModel from '../models/TeamsModel';
import { IMatchesExtended, IMatcheModel, IMatches } from '../Interfaces/matches/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ID, NewEntity } from '../Interfaces';
import { ITeam } from '../Interfaces/teams/Iteam';

interface ValidationResult {
  status: 'SUCCESS' | 'EQUAL' | 'NOT_FOUND';
  data: { message: string };
}

export default class MatchService {
  constructor(
    private matchModel: IMatcheModel = new MatchModel(),
    private teamModel: IFindById<ITeam> = new TeamModel(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatchesExtended[]>> {
    const allMatchs = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatchs };
  }

  public async leaderboardsHome(): Promise<ServiceResponse<IMatchStats[] | unknown[]>> {
    const allMatchs = await this.matchModel.findAllProgressFalseHome();
    return { status: 'SUCCESSFUL', data: allMatchs };
  }

  public async leaderboardsAway(): Promise<ServiceResponse<IMatchStats[] | unknown[]>> {
    const allMatchs = await this.matchModel.findAllProgressFalseAway();
    return { status: 'SUCCESSFUL', data: allMatchs };
  }

  public async findById(id: number):Promise<ServiceResponse<IMatchesExtended | null>> {
    const match = await this.matchModel.findById(id);
    if (!match) return { status: 'NOT_FOUND', data: { message: `match ${id} not found` } };
    return { status: 'SUCCESSFUL', data: match };
  }

  public async matchInProgress(inProgress: boolean): Promise<ServiceResponse<IMatchesExtended[]>> {
    const allMatches = await this.matchModel.matchInProgress(inProgress);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async updateMatches(id: number): Promise<ServiceResponse<{ message: string }>> {
    await this.matchModel.updateProgress(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatchPoints(id: ID, homeTeamGoals:number, awayTeamGoals:number):
  Promise<ServiceResponse<IMatchesExtended | { message: string }>> {
    const matchFound = await this.matchModel.findById(id);
    if (!matchFound) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };

    await this.matchModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCCESSFUL', data: { message: 'Match updated' } };
  }

  public async validateMatch(homeTeamId: number, awayTeamId:number)
    :Promise <ValidationResult> {
    if (homeTeamId === awayTeamId) {
      return { status: 'EQUAL',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    const homeTeam = await this.teamModel.findById(homeTeamId);
    const awayTeam = await this.teamModel.findById(awayTeamId);

    if (homeTeam === null || awayTeam === null) {
      return { status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' } };
    }
    return {
      status: 'SUCCESS',
      data: { message: 'Validation passed successfully' },
    };
  }

  public async createMatch(match:NewEntity<IMatches>):
  Promise<ServiceResponse<IMatches | ValidationResult>> {
    const { status, data } = await this.validateMatch(match.homeTeamId, match.awayTeamId);
    if (status !== 'NOT_FOUND') {
      const newMatch = await this.matchModel.createMatch(match);
      return { status: 'CREATED', data: newMatch };
    }
    return { status: 'NOT_FOUND', data };
  }
}
