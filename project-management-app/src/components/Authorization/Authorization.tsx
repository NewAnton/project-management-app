import React from 'react';
import { useAuthSignInQuery } from '../../services/kanbanApi';

export function Authorization() {
  const useAuthorization = () => {
    // const { token } = useAuthSignInQuery();
    // localStorage.setItem('token', token);
  };

  return (
    <>
      <h1>Authorization</h1>
    </>
  );
}
