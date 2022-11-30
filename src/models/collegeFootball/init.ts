import { CollegeFootballState } from './types';

export function initState(): CollegeFootballState {
  return {
    apiStatus: 'loading',
    conferenceTeams: [],
  };
}
