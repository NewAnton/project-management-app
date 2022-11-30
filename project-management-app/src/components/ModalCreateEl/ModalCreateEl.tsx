import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { ErrorTextMessage } from 'components/ErrorTextMessage/ErrorTextMessage';
import { CreateEl } from 'types/kanbanApiTypes';

import './ModalCreateEl.scss';

interface ICreateElForm {
  title: string;
  description: string;
  onHideModal: () => void;
}

export function ModalCreateEl({ title, description, onHideModal }: ICreateElForm) {
  // const [signInData, setSignInData] = useState({ login: '', password: '' });
  // useAuthSignIn(signInData, Boolean(!signInData.login && !signInData.password));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEl>();

  const onSubmitHandler = (data: CreateEl) => {
    console.log(data);
  };

  return (
    <form className="sign-in-form" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="form-group">
        <label className="d-flex flex-column form__label">
          <span>{title}:</span>
          <input
            className="form__input"
            type="text"
            {...register('title', {
              required: {
                value: true,
                message: 'Task title required!',
              },
              minLength: {
                value: 2,
                message: 'Task title must contain more than 1 letter!',
              },
              maxLength: {
                value: 15,
                message: 'Task title must contain less than 15 letters!',
              },
            })}
          />
        </label>
        <div className="form__error">
          {errors.title && <ErrorTextMessage error={errors.title.message} />}
        </div>
      </div>
      <div className="form-group">
        <label className="d-flex flex-column form__label">
          <span>{description}:</span>
          <input className="form__input" type="text" {...register('description')} />
        </label>
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-4"
        onClick={() => {
          onHideModal();
        }}
      >
        Submit
      </button>
    </form>
  );
}
