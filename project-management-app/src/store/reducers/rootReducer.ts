import { combineReducers } from 'redux';
import { kanbanApi } from 'services/kanbanApi';

export const rootReducer = combineReducers({
  [kanbanApi.reducerPath]: kanbanApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
