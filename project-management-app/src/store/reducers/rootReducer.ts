import { combineReducers } from 'redux';

import { kanbanApi } from 'services/kanbanApi';
import { boardIDReducer } from 'store/action-creators/boardIDActions';
import { globalStateReducer } from 'store/action-creators/globalStateActions';

export const rootReducer = combineReducers({
  [kanbanApi.reducerPath]: kanbanApi.reducer,
  boardID: boardIDReducer,
  globalState: globalStateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
