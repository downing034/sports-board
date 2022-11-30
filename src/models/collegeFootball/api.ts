import { getConfig } from 'config';
import {
  fetchData,
  Convert,
  CfbTeams,
} from 'models/api';

export const allTeamsUrl = `${getConfig().COLLEGE_FOOTBALL_API_URL}/teams`;

// teams are currently only queryable as the full list or filterd
// by conference
export const buildConferenceTeamsUrl = (conference: string) =>
  `${allTeamsUrl}?conference=${conference}`;

export const getConferenceTeams = async (conference: string): Promise<CfbTeams[]> => {
  const filteredTeamsResponse = await fetchData(buildConferenceTeamsUrl(conference));
  return Convert.toCfbTeams(filteredTeamsResponse);
};