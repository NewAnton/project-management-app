import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import './PrevBoard.scss';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { ModalCreateEl } from 'components/ModalCreateEl/ModalCreateEl';
import { useDeleteBoardByIdMutation } from 'services/kanbanApiBoards';
import { useActions } from 'hooks/useActions';

interface IPrevBoardProps {
  title: string;
  description: string;
  boardId: string;
}

export function PrevBoard({ title, description, boardId }: IPrevBoardProps) {
  const { changeBoardID } = useActions();
  const [isUpdateBoardModalOpen, setUpdateBoardModalOpen] = useState(false);
  // const [deleteBoard] = useDeleteBoardByIdMutation();
  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    changeBoardID(boardId);
    handleOpenUpdateBoardModal();
  };

  const handleOpenUpdateBoardModal = () => {
    setUpdateBoardModalOpen(true);
  };
  const handleCloseUpdateBoardModal = () => {
    setUpdateBoardModalOpen(false);
  };

  // const handleCard = (event: React.MouseEvent) => {
  //   console.log('card');
  //   console.log(event.target);
  // };

  return (
    <Card bg="Light" text="dark" className="prevboard mb-4">
      <Card.Header className="d-flex justify-content-between">
        <div className="prevboard__header d-flex align-items-center" onClick={handleEdit}>
          <FontAwesomeIcon className="prevboard__header-icon mr-1" icon={faEdit} />
          <div onClick={(event: React.MouseEvent) => event.stopPropagation()}>
            <ModalWindow
              show={isUpdateBoardModalOpen}
              onHide={handleCloseUpdateBoardModal}
              title="Board editing"
            >
              <ModalCreateEl
                title="Name of Board"
                description="Description"
                onHideModal={handleCloseUpdateBoardModal}
                boardId={boardId}
                showDescription={true}
                isTask={false}
                isCard={false}
                isBoard={true}
              />
            </ModalWindow>
          </div>
          <div className="prevboard__header-description">Edit</div>
        </div>
        <div
          className="prevboard__header d-flex align-items-center"
          onClick={() => {
            console.log('del');
          }}
        >
          <FontAwesomeIcon className="prevboard__header-icon mr-1" icon={faTrash} />
          <div className="prevboard__header-description">Delete</div>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title> {title} </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
