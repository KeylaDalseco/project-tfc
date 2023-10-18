const match = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: true,
};

const matches = [match];

const matchesUpdate = {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 3,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: true,
  };

const updateMatch = {
  homeTeamGoals: 7,
  awayTeamGoals: 1,
};

const matchesWithoutId =  {
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: true,
}

const matchesInvalidId=  {
  homeTeamId: 1000,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: true,
}

const matchesWithoutHomeId=  {
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: true,
}

export {
  match,
  matches,
  updateMatch,
  matchesWithoutId,
  matchesInvalidId,
  matchesWithoutHomeId,
  matchesUpdate,
};