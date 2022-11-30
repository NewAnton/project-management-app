import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignInRequest } from 'types/kanbanApiTypes';
import { useAuthSignIn } from 'hooks/useAuthSignIn';

export function SignInForm() {
  const [signInData, setSignInData] = useState({ login: '', password: '' });
  useAuthSignIn(signInData, Boolean(!signInData.login && !signInData.password));

  const { register, handleSubmit } = useForm<SignInRequest>();

  const onSubmitHandler: SubmitHandler<SignInRequest> = (data) => {
    setSignInData({ login: data.login, password: data.password });
  };

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
