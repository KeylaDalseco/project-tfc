export interface ITeam {
  id: number;
  teamName: string;
}

export type ITeamModel = ITeam;

export type TeamResponse = Omit<ITeam, 'id'>;
