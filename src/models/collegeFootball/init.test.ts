import { initState } from './init';
import { CollegeFootballState } from './types';

interface TestCase {
  [key: string]: {
    expectedState: CollegeFootballState;
  };
}

const tests: TestCase = {
  default: {
    expectedState: {
      apiStatus: 'loading',
      conferenceTeams: [],
    },
  },
};

for (const testName in tests) {
  test(testName, () => {
    const testCase = tests[testName];
    expect(initState()).toEqual(testCase.expectedState);
  });
}
