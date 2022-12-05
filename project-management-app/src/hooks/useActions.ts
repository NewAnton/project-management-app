import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { boardIDActions } from 'store/action-creators/boardIDActions';
import { globalStateActions } from 'store/action-creators/globalStateActions';

const actions = {
  ...boardIDActions,
  ...globalStateActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
