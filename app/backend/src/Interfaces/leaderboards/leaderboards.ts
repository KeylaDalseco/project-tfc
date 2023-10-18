import { IMatchesExtended } from '../matches/IMatches';

export interface ILeaderboards {
  id: number;
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export interface ILeaderboardsModel {
  findAllMatchsToCalculate():Promise<IMatchesExtended[]>
}
