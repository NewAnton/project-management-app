import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { boardIDActions } from 'store/action-creators/boardIDActions';

const actions = {
  ...boardIDActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
