import { globalStateActions } from 'store/action-creators/globalStateActions';

export function authSignOut() {
  console.log('push');

  localStorage.removeItem('token');
  globalStateActions.setToken('');
}
