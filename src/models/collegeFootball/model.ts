import {
  CfbTeams,
  parseString,
  parseNumber,
} from 'models/api';
import { Teams } from './types';

import { getConferenceTeams } from './api';

export async function fetchConferenceTeams(conference: string): Promise<Teams> {
  const rawConferenceTeams = await getConferenceTeams(conference);
  const teams: Teams = [];

  for (const team of rawConferenceTeams) {
    teams.push({
      id: parseNumber(team.id),
      school: parseString(team.school),
      mascot: parseString(team.mascot),
      color: parseString(team.color),
      logo: team.logos[0],
    })
  }

  return teams;
};