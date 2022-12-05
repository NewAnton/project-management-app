import React, { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';

import { Loading } from 'components/Loading/Loading';
import { useDeleteUserByIdMutation } from 'services/kanbanApiUsers';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { RequestErrorInterface } from 'types/kanbanApiTypes';
import { DecodedTokenInterface } from 'types/DecodedTokenInterface';
import { useActions } from 'hooks/useActions';

export function DeleteUser() {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deleteUser, deleteUserResponse] = useDeleteUserByIdMutation();
  const { token } = useTypedSelector((state) => state.globalState);
  const { setToken } = useActions();

  useEffect(() => {
    if (deleteUserResponse.isSuccess) {
      setToken('');
      localStorage.removeItem('token');
    } else {
      setIsErrorModalOpen(deleteUserResponse.isError);
    }
  }, [deleteUserResponse]);

  useEffect(() => {
    setIsErrorModalOpen(deleteUserResponse.isError);
  }, [deleteUserResponse]);

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handleDeleteUserButton = () => {
    setIsConfirmModalOpen(true);
  };

  return (
    <>
      <ModalWindow show={isErrorModalOpen} onHide={handleCloseErrorModal} title={'Error'}>
        <p>
          {deleteUserResponse.error &&
            (deleteUserResponse.error as RequestErrorInterface).data.message}
        </p>
      </ModalWindow>
      <ModalWindow show={isConfirmModalOpen} onHide={handleCloseConfirmModal} title={'Confirm'}>
        {deleteUserResponse.isLoading && !deleteUserResponse.isSuccess ? (
          <Loading />
        ) : (
          <>
            <p>Are you sure?</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                deleteUser((decodeToken(token) as DecodedTokenInterface).id || '');
              }}
            >
              YES
            </button>
            <button type="button" className="btn btn-primary" onClick={handleCloseConfirmModal}>
              NO
            </button>{' '}
          </>
        )}
      </ModalWindow>
      <button type="button" className="btn btn-primary" onClick={handleDeleteUserButton}>
        Delete User
      </button>
    </>
  );
}
