import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Loading } from 'components/Loading/Loading';
import { useUpdateUserByIdMutation } from 'services/kanbanApiUsers';
import { decodeToken } from 'react-jwt';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { RequestErrorInterface } from 'types/kanbanApiTypes';
import { DecodedTokenInterface } from 'types/DecodedTokenInterface';

export function Profile() {
  interface updateUserInfo {
    name: string;
    login: string;
    password: string;
  }
  const { register, handleSubmit } = useForm<updateUserInfo>();
  const [updateUserInfo, getNewUserInfo] = useUpdateUserByIdMutation();
  const { token } = useTypedSelector((state) => state.globalState);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    setIsErrorModalOpen(getNewUserInfo.isError);
    setIsSuccessModalOpen(getNewUserInfo.isSuccess);
  }, [getNewUserInfo]);

  const onSubmitHandler: SubmitHandler<updateUserInfo> = (data) => {
    updateUserInfo({
      userId: (decodeToken(token) as DecodedTokenInterface).id || '',
      name: data.name,
      login: data.login,
      password: data.password,
    });
  };

  const handleCloseSuccessErrorModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <Container>
      <h2 className="main__title">Edit Profile</h2>
      <ModalWindow
        show={isSuccessModalOpen}
        onHide={handleCloseSuccessErrorModal}
        title={'Success'}
      >
        <p>User data has changed</p>
      </ModalWindow>
      <ModalWindow show={isErrorModalOpen} onHide={handleCloseErrorModal} title={'Error'}>
        <p>
          {getNewUserInfo.error && (getNewUserInfo.error as RequestErrorInterface).data.message}
        </p>
      </ModalWindow>
      {getNewUserInfo.isLoading ? (
        <Loading />
      ) : (
        <form className="profile-form" onSubmit={handleSubmit(onSubmitHandler)}>
          {/* <h1 className="profile-form__h1 h1"> Sign Up</h1> */}
          <div className="form-group">
            <label htmlFor="profile-form__name-input">Name</label>
            <input
              {...register('name', { required: true })}
              type="text"
              placeholder={'Name...'}
              className="form-control"
              id="profile-form__name-input"
              aria-describedby="emailHelp"
            />
            {/* <small id="emailHelp" className="form-text text-muted">
          We&apos;ll never share your email with anyone else.
        </small> */}
          </div>
          <div className="form-group">
            <label htmlFor="profile-form__login-input">Login</label>
            <input
              {...register('login', { required: true })}
              type="text"
              placeholder={'Login...'}
              className="form-control"
              id="profile-form__login-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="profile-form__password-input">Password</label>
            <input
              {...register('password', { required: true })}
              type="password"
              className="form-control"
              id="profile-form__password-input"
            />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="profile-form__check1" />
            <label className="form-check-label" htmlFor="profile-form__check1">
              I&apos;m not a robot!
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </Container>
  );
}
