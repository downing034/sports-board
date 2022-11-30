import { ApiStatus } from '../types';
import {
  CollegeFootballState,
  Team,
  Teams,
} from './types';
import { initState } from './init';
import reducer, {
  slice,
  buildNewEmptyTeam,
  CollegeFootballAppState,
  setConferenceTeams,
  setApiStatus,
  selectState,
  selectApiStatus,
  selectConferenceTeams,
  createSelectTeamSelector,
} from './slice';

import { team1, team2, teams } from 'mocks/models/collegeFootball';

const initialState = reducer(undefined, { type: 'noop' });

function wrapRootState(state: CollegeFootballState): CollegeFootballAppState {
  return { [slice.name]: state };
}

test('initialState', () => {
  expect(initialState).toEqual(initState());
});

describe('reducers', () => {
  test('setApiStatus', () => {
    const statuses: ApiStatus[] = ['initialized', 'error', 'loading'];

    for (const status of statuses) {
      const state = reducer(initialState, setApiStatus(status));
      expect(state.apiStatus).toEqual(status);

      const nextState = reducer(state, setApiStatus(status));
      expect(nextState).toBe(state);
    }
  });

  test('setConferenceTeams', () => {
    // should update since states are equal
    const expectedConferenceTeamsState = teams

    let state = reducer(initialState, setConferenceTeams(teams));
    expect(state.conferenceTeams).toEqual(expectedConferenceTeamsState);

    const expectedUpdatedConferenceTeamsState: Teams = [];
    const updatedState = reducer(state, setConferenceTeams([]));
    expect(updatedState.conferenceTeams).toEqual(expectedUpdatedConferenceTeamsState);

    // should not update since states are equal
    state = reducer(initialState, setConferenceTeams([]));
    expect(state.conferenceTeams).toEqual(initialState.conferenceTeams);
  });
});


describe('selectors', () => {
  // this is testing basic redux reducers so it's a little
  //  overkill here since this just proved redux "works"
  test('selectApiStatus', () => {
    const initialState = initState();
    const state: CollegeFootballAppState = wrapRootState(initialState);
    expect(selectApiStatus(state)).toEqual(initialState.apiStatus);
  });

  test('selectConferenceTeams', () => {
    const initialState = initState();
    const state: CollegeFootballAppState = wrapRootState(initialState);
    expect(selectConferenceTeams(state)).toEqual(initialState.conferenceTeams);
  });

  test('createSelectTeamSelector when team is in list', () => {
    let state = wrapRootState(initialState);
    const selectTeam = createSelectTeamSelector('Texas');

    let selectedTeam: Team = selectTeam(state);
    // no team set yet so it should return default
    expect(selectedTeam).toEqual(buildNewEmptyTeam('Texas'));

    const expectedTeam: Team = team1;

    state = wrapRootState({
      ...initialState,
      conferenceTeams: [team1, team2]
    });

    selectedTeam = selectTeam(state);
    expect(selectedTeam).toEqual(expectedTeam);
  });
});

