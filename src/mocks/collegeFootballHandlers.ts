import { rest } from 'msw';
import { getConfig } from 'config';

import collegeFootballTeams from './cfbTeams/teams.json';
import { allTeamsUrl } from 'models/collegeFootball/api';

const collegeFootballHandlers = [
	rest.get(
    allTeamsUrl,
    (req, res, ctx) => {
      const query = req.url.searchParams;
      const conference = query.get('conference');
      // setup switch case for future use when other
      // conference data is included
      switch (conference) {
      	// Big 12 conference identifier
        case 'B12':
          return res(ctx.json(collegeFootballTeams));
        default:
          return res(ctx.json(collegeFootballTeams));
      }
    }
  ),
];

export default collegeFootballHandlers;