import { TestState } from 'testUtils';
import { ApiStatus } from 'models/types';
import { team1, team2, teams } from './collegeFootball';

const apiStatus: ApiStatus = 'initialized';

export const testStore: TestState = {
	collegeFootball: {
		apiStatus,
		conferenceTeams: teams
	}
};