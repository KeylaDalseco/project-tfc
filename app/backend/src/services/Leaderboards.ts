// import { IFindById } from '../Interfaces/ICRUDModel';
// import MatchModel from '../models/MatchesModel';
// import TeamModel from '../models/TeamsModel';
// import { IMatchesExtended, IMatcheModel, IMatches } from '../Interfaces/matches/IMatches';
// import { ServiceResponse } from '../Interfaces/ServiceResponse';
// import { ID, NewEntity } from '../Interfaces';
// import { ITeam } from '../Interfaces/teams/Iteam';

// export default class MatchService {
//   constructor(
//     private matchModel: IMatcheModel = new MatchModel(),
//     private teamModel: IFindById<ITeam> = new TeamModel(),
//   ) { }

//   public async getAllMatches(): Promise<ServiceResponse<IMatchesExtended[]>> {
//     const allMatchs = await this.matchModel.findAll();
//     return { status: 'SUCCESSFUL', data: allMatchs };
//   }
// }
