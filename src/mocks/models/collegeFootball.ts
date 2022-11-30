import {
  Team,
  Teams,
} from 'models/collegeFootball/types';

export const team1: Team = {
  id: 1,
  school: 'Texas',
  mascot: 'Longhorns',
  color: '#123456',
  logo: ''
};

export const team2: Team = {
  id: 1,
  school: 'Texas Tech',
  mascot: 'Red Raiders',
  color: '#987654',
  logo: ''
};

export const teams: Teams = [team1, team2];