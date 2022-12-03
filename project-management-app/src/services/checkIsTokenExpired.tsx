import { isExpired } from 'react-jwt';

export function checkIsTokenExpired(token: string) {
  const isTokenExpired = isExpired(token);
  if (isTokenExpired) {
    localStorage.clear();
    return true;
  }
  return false;
}
