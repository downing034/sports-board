export type ApiStatus = 'loading' | 'initialized' | 'error';

import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type AppThunk<StateType, ReturnType = void> = ThunkAction<
	ReturnType,
	StateType,
	unknown,
	Action<string>
>;