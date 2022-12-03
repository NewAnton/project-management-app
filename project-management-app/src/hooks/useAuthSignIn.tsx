// import { useJwt } from 'react-jwt';
// import { DecodedTokenInterface } from 'types/DecodedTokenInterface';
// import { SignInRequest } from 'types/kanbanApiTypes';
// import { useAuthSignInQuery } from '../services/kanbanApiAuth';
// import { useActions } from './useActions';

// export function useAuthSignIn(
//   { login, password }: SignInRequest,
//   skip: boolean
// ): DecodedTokenInterface | null {
//   console.log('sign in');

//   const { data } = useAuthSignInQuery({ login, password }, { skip });
//   const { setToken } = useActions();
//   let token = '';
//   if (data) token = data.token;

//   localStorage.setItem('token', token);
//   setToken(token);

//   const decodedData = useJwt<DecodedTokenInterface>(token);
//   return decodedData.decodedToken;
// }
