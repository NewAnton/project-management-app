import { combineReducers } from 'redux';

import { kanbanApi } from 'services/kanbanApi';
import { boardIDReducer } from 'store/action-creators/boardIDActions';

export const rootReducer = combineReducers({
  [kanbanApi.reducerPath]: kanbanApi.reducer,
  boardID: boardIDReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
