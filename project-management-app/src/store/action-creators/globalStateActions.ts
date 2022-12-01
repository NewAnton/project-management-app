import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getToken } from 'services/getToken';

interface GlobalStateInterface {
  token: string;
}

const initialState: GlobalStateInterface = {
  token: getToken(),
};

export const globalStateActionsCreator = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string, string>) => {
      return {
        ...state,
        token: action.payload,
      };
    },
  },
});

export const globalStateActions = globalStateActionsCreator.actions;
export const globalStateReducer = globalStateActionsCreator.reducer;
