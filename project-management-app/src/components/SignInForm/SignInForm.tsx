import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignInRequest } from 'types/kanbanApiTypes';
import { useAuthSignInQuery } from 'services/kanbanApiAuth';
import { useActions } from 'hooks/useActions';

interface SignUpForm {
  onSubmitAction: () => void;
}

export function SignInForm({ onSubmitAction }: SignUpForm) {
  const [signInData, setSignInData] = useState({ login: '', password: '' });
  const { setToken } = useActions();
  const { register, handleSubmit } = useForm<SignInRequest>();
  const { data } = useAuthSignInQuery(
    { login: signInData.login, password: signInData.password },
    { skip: Boolean(!signInData.login && !signInData.password) }
  );

  const onSubmitHandler: SubmitHandler<SignInRequest> = (data) => {
    setSignInData({ login: data.login, password: data.password });
    onSubmitAction();
  };

  useEffect(() => {
    if (data) setToken(data.token);
  }, [data]);

  return (
    <form className="sign-in-form" onSubmit={handleSubmit(onSubmitHandler)}>
      {/* <h1 className="sign-in-form__h1 h1"> Sign In</h1> */}
      <div className="form-group">
        <label htmlFor="sign-in-form__login-input">Login</label>
        <input
          {...register('login', { required: true })}
          type="text"
          placeholder={'Login...'}
          className="form-control"
          id="sign-in-form__login-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="sign-in-form__password-input">Password</label>
        <input
          {...register('password', { required: true })}
          type="password"
          className="form-control"
          id="sign-in-form__password-input"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
