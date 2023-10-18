import { ICRUDModelReader } from '../Interfaces/ICRUDModel';
import SequelizeTeam from '../database/models/SequelizeTeams';
import { ITeam } from '../Interfaces/teams/Iteam';

export default class TeamModel implements ICRUDModelReader<ITeam> {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { teamName }: ITeam = dbData;
    return { id, teamName };
  }
}
