import * as api from './api';
import { fetchConferenceTeams } from './model';
import { Team, Teams } from './types';
import { CfbTeams } from 'models/api';
import cfbTeams from 'mocks/cfbTeams/teams.json';

describe('fetchConferenceTeams', () => {
  test('should format conference teams', async () => {
  	const getConferenceTeamsSpy = jest.spyOn(api, 'getConferenceTeams');

  	getConferenceTeamsSpy.mockReturnValue(
  		(async () => cfbTeams)()
  	);

  	// expected data should match the mock for this team
  	const expectedLonghornsData: Team = {
  		id: 251,
  		school: 'Texas',
  		mascot: 'Longhorns',
  		color: '#EE7524',
  		logo: 'http://a.espncdn.com/i/teamlogos/ncaa/500/251.png',
  	};

  	const conferenceTeamsData = await fetchConferenceTeams('B12');
  	const longhornsData = conferenceTeamsData.find((team: Team) => team.id === 251)
    expect(longhornsData).toStrictEqual(expectedLonghornsData);
  });
});