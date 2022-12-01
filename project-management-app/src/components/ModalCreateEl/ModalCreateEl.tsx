import React from 'react';
import { useForm } from 'react-hook-form';

import { ErrorTextMessage } from 'components/ErrorTextMessage/ErrorTextMessage';
import { CreateEl, Task } from 'types/kanbanApiTypes';
import { useCreateTaskInColumnMutation } from 'services/kanbanApiTasks';

import './ModalCreateEl.scss';

interface ICreateElForm {
  title: string;
  description: string;
  boardId: string;
  cardId: string;
  onHideModal: () => void;
  getTask: (task: Task) => void;
}

export function ModalCreateEl({
  title,
  description,
  onHideModal,
  boardId,
  cardId,
  getTask,
}: ICreateElForm) {
  const [createTask] = useCreateTaskInColumnMutation<Task>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEl>();

  const onSubmitHandler = async (data: CreateEl) => {
    onHideModal();
    const newTask = createTask({
      boardId: boardId,
      columnId: cardId,
      title: data.title,
      order: 0,
      description: data.description,
      userId: '0',
      users: ['string'],
    });
    const result = await newTask.unwrap().then((payload) => payload);
    getTask(result);
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
          <input
            className="form__input"
            type="text"
            {...register('description', {
              required: {
                value: true,
                message: 'Task description required!',
              },
              minLength: {
                value: 2,
                message: 'Task description must contain more than 1 letter!',
              },
              maxLength: {
                value: 50,
                message: 'Task description must contain less than 50 letters!',
              },
            })}
          />
        </label>
        <div className="form__error">
          {errors.description && <ErrorTextMessage error={errors.description.message} />}
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-2">
        Submit
      </button>
    </form>
  );
}
