import {
  ApplicationEnvironment,
  CrossEnvironmentConfig,
  environment
} from './environments';

export const COLLEGE_FOOTBALL_API_URLS: CrossEnvironmentConfig<string> = {
  [ApplicationEnvironment.Production]: 'https://api.collegefootballdata.com',
  [ApplicationEnvironment.Development]: 'https://api.collegefootballdata.com',
};

export const COLLEGE_FOOTBALL_API_URL = COLLEGE_FOOTBALL_API_URLS[environment];