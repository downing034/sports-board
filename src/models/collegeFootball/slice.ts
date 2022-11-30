import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { ApiStatus } from 'models/types';
import { CollegeFootballState, Team, Teams } from './types';
import { initState } from './init';

export const buildNewEmptyTeam = (school: string) => {
	return (
		{
			id: 0,
			school,
			mascot: '',
			color: '#000000',
			logo: '',
		}
	)
};

export const initialState = initState();

export const slice = createSlice({
	name: 'collegeFootball',
	initialState,
	reducers: {
		setConferenceTeams(state: CollegeFootballState, action: PayloadAction<Teams>) {
			if (state.conferenceTeams !== action.payload) {
				state.conferenceTeams = action.payload;
			}
		},
		setApiStatus(state: CollegeFootballState, action: PayloadAction<ApiStatus>) {
			if (state.apiStatus !== action.payload) {
				state.apiStatus = action.payload;
			}
		}
	}
});

export const { setConferenceTeams, setApiStatus } = slice.actions;

export type CollegeFootballAppState = { [slice.name]: CollegeFootballState };

export const selectState = (state: CollegeFootballAppState) => state.collegeFootball;

export const selectApiStatus = createSelector(selectState, (state) => state.apiStatus);

export const selectConferenceTeams = createSelector(selectState, (state) => state.conferenceTeams);

export const createSelectTeamSelector = (school: string) => {
	return createSelector(selectConferenceTeams, (conferenceTeams: Teams): Team => {
		// explicitly set a team with type Team so function can
		// have a typed return value
		let team: Team = buildNewEmptyTeam(school);

		for (const conferenceTeam of conferenceTeams) {
			if (conferenceTeam.school.toLowerCase() === school.toLowerCase()) {
				team = conferenceTeam;
			} else {
				continue;
			}
		};

		return team;
	});
};

export default slice.reducer;