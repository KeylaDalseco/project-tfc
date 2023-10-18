import SequelizeTeam from '../database/models/SequelizeTeams';
import { IMatcheModel, IMatches, IMatchesExtended } from '../Interfaces/matches/IMatches';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { ID, NewEntity } from '../Interfaces';
import { TeamResponse } from '../Interfaces/teams/Iteam';

export interface IMatchStats {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
}

export default class MatchModel implements IMatcheModel {
  private model = SequelizeMatches;
  totalPoints: number;

  constructor() {
    this.totalPoints = 0;
  }

  public async findAll(): Promise<IMatchesExtended[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData.map((match) => (match));
  }

  public async findProgressFalse(): Promise<IMatchesExtended[]> {
    const dbData = await this.model.findAll({
      where: {
        inProgress: false,
      },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData.map((match) => (match));
  }

  private initializeTeamData(
    timesCasa: any,
    homeTeamId: number,
    homeTeam: TeamResponse,
  ): void {
    const dadosTimesCasa = timesCasa;
    if (!dadosTimesCasa[homeTeamId]) {
      dadosTimesCasa[homeTeamId] = {
        name: homeTeam?.teamName,
        totalPoints: this.totalPoints,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
      };
    }
  }

  private static calculatePoints(
    dadosTimesHome: any,
    homeTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): void {
    const dadosTimesCasa = dadosTimesHome;
    if (homeTeamGoals > awayTeamGoals) {
      dadosTimesCasa[homeTeamId].totalPoints += 3;
      dadosTimesCasa[homeTeamId].totalVictories += 1;
    } else if (homeTeamGoals === awayTeamGoals) {
      dadosTimesCasa[homeTeamId].totalPoints += 1;
      dadosTimesCasa[homeTeamId].totalDraws += 1;
    } else {
      dadosTimesCasa[homeTeamId].totalLosses += 1;
    }
  }

  private processDataTeamHome(timesCasa: any, match: IMatchesExtended): IMatchStats[] {
    const dadosTimesCasa = timesCasa;
    const { homeTeamId, homeTeamGoals, awayTeamGoals, homeTeam } = match as IMatchesExtended;
    this.initializeTeamData(dadosTimesCasa, homeTeamId, homeTeam as TeamResponse);
    MatchModel.calculatePoints(dadosTimesCasa, homeTeamId, homeTeamGoals, awayTeamGoals);
    dadosTimesCasa[homeTeamId].totalGames += 1;
    dadosTimesCasa[homeTeamId].goalsFavor += homeTeamGoals;
    dadosTimesCasa[homeTeamId].goalsOwn += awayTeamGoals;
    return dadosTimesCasa;
  }

  private processDataTeamAway(timesCasa: any, match: IMatchesExtended): IMatchStats[] {
    const dadosTimesCasa = timesCasa;
    const { awayTeamId, homeTeamGoals, awayTeamGoals, awayTeam } = match as IMatchesExtended;
    this.initializeTeamData(dadosTimesCasa, awayTeamId, awayTeam as TeamResponse);
    MatchModel.calculatePoints(dadosTimesCasa, awayTeamId, awayTeamGoals, homeTeamGoals);
    dadosTimesCasa[awayTeamId].totalGames += 1;
    dadosTimesCasa[awayTeamId].goalsFavor += awayTeamGoals;
    dadosTimesCasa[awayTeamId].goalsOwn += homeTeamGoals;
    return dadosTimesCasa;
  }

  public async findAllProgressFalseHome(): Promise<IMatchesExtended[] | unknown[]> {
    let dadosTimesCasa: any = {};
    const dbData = await this.findProgressFalse();
    dbData.forEach((match) => {
      dadosTimesCasa = this.processDataTeamHome(dadosTimesCasa, match);
    });
    const dadosArray = Object.values(dadosTimesCasa);
    return dadosArray;
  }

  public async findAllProgressFalseAway(): Promise<IMatchesExtended[] | unknown[]> {
    let dadosTimeDeFora: any = {};
    const dbData = await this.findProgressFalse();
    dbData.forEach((match) => {
      dadosTimeDeFora = this.processDataTeamAway(dadosTimeDeFora, match);
    });
    const dadosArray = Object.values(dadosTimeDeFora);
    return dadosArray;
  }

  public async findById(id: number): Promise<IMatches | null> {
    const dbData = await this.model.findByPk(id, {
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData;
  }

  public async matchInProgress(inProgress: boolean): Promise<IMatchesExtended[]> {
    const dbData = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData.map((match) => (match));
  }

  public async updateProgress(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  public async updateMatch(id: ID, homeTeamGoals: number, awayTeamGoals:number)
    :Promise<IMatches | null> {
    const match = await this.findById(id);
    if (!match) { return null; }

    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return match;
  }

  public async createMatch(data: NewEntity<IMatches>): Promise<IMatches> {
    const newMatch = await this.model.create(data);
    return newMatch;
  }
}
