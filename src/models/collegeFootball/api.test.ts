import { CfbTeams } from 'models/api';
import { server, rest } from 'mocks/server';
import cfbTeams from 'mocks/cfbTeams/teams.json';

import {
  allTeamsUrl,
  getConferenceTeams,
} from './api';

describe('models/collegeFootball/api', () => {
  test('getConferenceTeams', async () => {
    const big12Teams = await getConferenceTeams('B12');
    expect(big12Teams).toEqual(cfbTeams);
  });
});