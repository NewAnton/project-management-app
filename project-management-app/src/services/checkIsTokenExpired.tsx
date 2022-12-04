import { isExpired } from 'react-jwt';

export function checkIsTokenExpired(token: string) {
  console.log('check');

  const isTokenExpired = isExpired(token);
  if (isTokenExpired) {
    return true;
  }
  return false;
}
