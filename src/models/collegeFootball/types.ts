import { ApiStatus } from 'models/types';

export interface CollegeFootballState {
	apiStatus: ApiStatus;
	conferenceTeams: Teams
}

export interface Team {
	id: number;
	school: string;
	mascot: string;
	color: string;
	logo: string;
};

export type Teams = Team[];