import { fetchConferenceTeamsAsync } from './thunk';
import { setConferenceTeams, setApiStatus } from './slice';
import * as model from './model';
import { initState } from './init';
import { Team, Teams } from './types';
import { makeMockStore } from 'testUtils';
import { testStore } from 'mocks/models/testStore';

import { team1, team2, teams } from 'mocks/models/collegeFootball';

describe('fetchConferenceTeamsAsync', () => {
  test('fetchConferenceTeamsAsync', async () => {
    const store = makeMockStore(testStore);

    const fetchConferenceTeamsSpy = jest.spyOn(model, 'fetchConferenceTeams');
    fetchConferenceTeamsSpy.mockReturnValue((async () => teams)());

    await store.dispatch(fetchConferenceTeamsAsync('B12'));

    const actions = store.getActions();

    expect(actions).toEqual([
      setConferenceTeams(teams),
      setApiStatus('initialized'),
    ]);

    fetchConferenceTeamsSpy.mockRestore();
  });

  test('fetchCdpsAsync failure', async () => {
    const store = makeMockStore({ collegeFootball: initState() });
    const fetchConferenceTeamsSpy = jest.spyOn(model, 'fetchConferenceTeams');

    fetchConferenceTeamsSpy.mockImplementation(() => {
      throw new Error('this thing did not load');
    });
    await store.dispatch(fetchConferenceTeamsAsync('B12'));

    expect(store.getActions()).toEqual([setApiStatus('error')]);

    fetchConferenceTeamsSpy.mockRestore();
  });
});


