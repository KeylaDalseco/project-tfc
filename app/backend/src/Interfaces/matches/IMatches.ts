import { TeamResponse } from '../teams/Iteam';

export interface IMatches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IMatchesWithTeam extends IMatches {
  homeTeam: {
    teamName: string,
  },
  awayTeam: {
    teamName: string,
  }
}

export interface IMatchesExtended extends IMatches {
  homeTeam?: TeamResponse;
  awayTeam?: TeamResponse;
}

export interface IMatcheModel {
  findAll():Promise<IMatchesExtended[]>,
  findById(id:number):Promise<IMatches | null>,
  matchInProgress(inProgress:boolean): Promise<IMatchesExtended[]>,
  updateProgress(id:number): Promise<void>,
  updateMatch(id:number, homeTeamGoals: number, awayTeamGoals:number):Promise<IMatches | null>,
  createMatch(data: Partial<IMatches>):Promise<IMatches>,
  findAllProgressFalseHome():Promise<IMatchesExtended[] | unknown[]>,
  findAllProgressFalseAway():Promise<IMatchesExtended[] | unknown[]>
}
