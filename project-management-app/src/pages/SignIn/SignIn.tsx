import { Loading } from 'components/Loading/Loading';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { useActions } from 'hooks/useActions';
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthSignInQuery } from 'services/kanbanApiAuth';
import { SignInRequest, RequestErrorInterface } from 'types/kanbanApiTypes';

export function SignIn() {
  const [signInData, setSignInData] = useState({ login: '', password: '' });
  const { setToken } = useActions();
  const { register, handleSubmit } = useForm<SignInRequest>();
  const { data, isLoading, error, isSuccess, isError } = useAuthSignInQuery(
    { login: signInData.login, password: signInData.password },
    { skip: Boolean(!signInData.login && !signInData.password) }
  );
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsErrorModalOpen(isError);
    setIsSuccessModalOpen(isSuccess);
  }, [isError, isSuccess]);

  const onSubmitHandler: SubmitHandler<SignInRequest> = (data) => {
    setSignInData({ login: data.login, password: data.password });
  };

  const handleCloseSuccessErrorModal = () => {
    setIsSuccessModalOpen(false);
    navigate('/');
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  useEffect(() => {
    if (data) {
      setToken(data.token);
    }
  }, [data]);

  return (
    <Container>
      <h2 className="main__title">Sign In</h2>
      <ModalWindow
        show={isSuccessModalOpen}
        onHide={handleCloseSuccessErrorModal}
        title={'Success'}
      >
        <p>Successfully sign in</p>
      </ModalWindow>
      <ModalWindow show={isErrorModalOpen} onHide={handleCloseErrorModal} title={'Error'}>
        <p>{error && (error as RequestErrorInterface).data.message}</p>
      </ModalWindow>
      {isLoading ? (
        <div className="loading-wrapper">
          <Loading />
        </div>
      ) : (
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
      )}
    </Container>
  );
}
