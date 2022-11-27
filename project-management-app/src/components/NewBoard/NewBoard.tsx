import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import './NewBoard.scss';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export type FormValues = {
  name: string;
  description: string;
};

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

      <Modal show={show} onHide={handleClose} centered id="add-board-form">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'black' }}>Create Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewBoardForm />
        </Modal.Body>
      </Modal>
    </>
  );

  function NewBoardForm() {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isValid },
    } = useForm<FormValues>({ mode: 'onBlur' });
    const onSubmit = (data: FormValues) => {
      const newBoardsList: FormValues[] = [];
      const boardsList = localStorage.getItem('boards');
      if (boardsList) {
        newBoardsList.push(...JSON.parse(boardsList));
      }
      newBoardsList.push(data);
      localStorage.setItem('boards', JSON.stringify(newBoardsList));
      reset();
      handleClose();
    };

    //console.log(errors);

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Board name"
          {...register('name', {
            required: 'This field is required',
            maxLength: 66,
            minLength: {
              value: 2,
              message: 'Min length is 2',
            },
          })}
        />
        <div style={{ height: '2rem', color: 'red' }}>
          {errors?.name && <p>{errors?.name?.message}</p>}
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
}

export function NewBoard() {
  // return (
  //   <>
  //     <h2 className="board__title">New Board</h2>
  //   </>
  // );
  return (
    <Container>
      <h2 className="main__title">New Board</h2>
    </Container>
  );
}
