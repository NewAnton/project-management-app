import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuthSignUpMutation } from 'services/kanbanApiAuth';
import { SignInRequest, SignUpRequest } from 'types/kanbanApiTypes';

interface SignUpForm {
  onSubmitAction: () => void;
}

export function SignUpForm({ onSubmitAction }: SignUpForm) {
  const [signUpRequest] = useAuthSignUpMutation();

  const { register, handleSubmit } = useForm<SignUpRequest>();

  const onSubmitHandler: SubmitHandler<SignInRequest> = () => {
    signUpRequest;
    onSubmitAction();
  };

  return (
    <form className="sign-up-form" onSubmit={handleSubmit(onSubmitHandler)}>
      {/* <h1 className="sign-up-form__h1 h1"> Sign Up</h1> */}
      <div className="form-group">
        <label htmlFor="sign-up-form__name-input">Name</label>
        <input
          {...register('name', { required: true })}
          type="text"
          placeholder={'Name...'}
          className="form-control"
          id="sign-up-form__name-input"
          aria-describedby="emailHelp"
        />
        {/* <small id="emailHelp" className="form-text text-muted">
          We&apos;ll never share your email with anyone else.
        </small> */}
      </div>
      <div className="form-group">
        <label htmlFor="sign-up-form__login-input">Login</label>
        <input
          {...register('login', { required: true })}
          type="text"
          placeholder={'Login...'}
          className="form-control"
          id="sign-up-form__login-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="sign-up-form__password-input">Password</label>
        <input
          {...register('password', { required: true })}
          type="password"
          className="form-control"
          id="sign-up-form__password-input"
        />
      </div>
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id="sign-up-form__check1" />
        <label className="form-check-label" htmlFor="sign-up-form__check1">
          I&apos;m not a robot!
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
