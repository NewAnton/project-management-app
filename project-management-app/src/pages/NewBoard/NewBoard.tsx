import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';

import './NewBoard.scss';

import { FieldValues, useForm } from 'react-hook-form';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

type FormValues = {
  boardName: string;
  description: string;
};

const boards: FieldValues[] = [];

export default function NewBoardForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: 'onBlur' });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    boards.push(data);
    localStorage.setItem('boards', JSON.stringify(boards));
    reset();
  };

  //console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Board name"
        {...register('boardName', {
          required: 'This field is required',
          maxLength: 66,
          minLength: {
            value: 2,
            message: 'Min length is 2',
          },
        })}
      />
      <div style={{ height: '2rem', color: 'red' }}>
        {errors?.boardName && <p>{errors?.boardName?.message}</p>}
      </div>
      <input
        type="text"
        placeholder="Description"
        {...register('description', { required: false, maxLength: 66 })}
      />

      <input type="submit" disabled={!isValid} />
    </form>
  );
}

export function NewBoardFormModal() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <button
        style={{
          background: 'none',
          border: 'none',
        }}
        className="navbar__link"
        onClick={() => handleShow()}
      >
        <FontAwesomeIcon className="element__star mr-1" icon={faPlus} size="xs" />
        New Board
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'black' }}>Create Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewBoardForm />
        </Modal.Body>
      </Modal>
    </>
  );
}

export function NewBoard() {
  return (
    <>
      <h2 className="board__title">New Board</h2>
    </>
  );
  return (
    <Container>
      <h2 className="main__title">New Board</h2>
    </Container>
  );
}
