import { batch } from 'react-redux';
import { logger } from 'models/api';
import { AppThunk } from 'models/types';

import { fetchConferenceTeams } from './model';
import { CollegeFootballAppState, setConferenceTeams, setApiStatus } from './slice';

export const fetchConferenceTeamsAsync = (conference: string): AppThunk<CollegeFootballAppState> => async (dispatch) => {
	try {
		const conferenceTeams = await fetchConferenceTeams(conference);
		dispatch(setConferenceTeams(conferenceTeams));
		dispatch(setApiStatus('initialized'));
	} catch (error: any) {
		logger.error(error);
		dispatch(setApiStatus('error'));
	}
};