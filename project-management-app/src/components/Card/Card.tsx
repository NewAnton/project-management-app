import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

import { PrevTask } from 'components/PrevTask/PrevTask';
import { useGetTasksInColumnQuery } from 'services/kanbanApiTasks';
// import { useTypedSelector } from 'hooks/useTypedSelector';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { ModalCreateEl } from 'components/ModalCreateEl/ModalCreateEl';
import { useDeleteColumnByIdMutation } from 'services/kanbanApiColumns';

import './Card.scss';

interface ICardProps {
  title: string;
  cardId: string;
  boardId: string;
}

export function Card({ title, cardId, boardId }: ICardProps) {
  // const { boardID } = useTypedSelector((state) => state.boardID);
  const [isNewTaskModalOpen, setisNewTaskModalOpen] = useState(false);
  const [deleteCard] = useDeleteColumnByIdMutation();

  const { data: tasksData } = useGetTasksInColumnQuery({
    boardId: boardId,
    columnId: cardId,
  });

  const handleCloseNewTaskModal = () => {
    setisNewTaskModalOpen(!isNewTaskModalOpen);
  };

  const handleclick = async (event: React.MouseEvent) => {
    if ((event.target as Element).closest('.card__delete')) {
      deleteCard({ boardId: boardId, columnId: cardId });
    }
  };

  return (
    <div className="board__card" onClick={handleclick}>
      <div className="board__card-header d-flex align-items-center justify-content-between">
        <div className="board__card-title">
          {title} <span className="board__card-count">{tasksData?.length}</span>
        </div>
        <FontAwesomeIcon className="prevcard__header-icon card__delete mr-1" icon={faTrash} />
      </div>
      <div className="board__card-container">
        {tasksData?.map((task) => (
          <Nav.Link className="board__card-link" key={task._id} as={Link} to="/task">
            <PrevTask
              title={task.title}
              description={task.description}
              boardId={boardId}
              cardId={cardId}
              taskId={task._id}
            />
          </Nav.Link>
        ))}
      </div>
      <div
        className="board__card-footer"
        onClick={() => {
          setisNewTaskModalOpen(true);
        }}
      >
        <FontAwesomeIcon className="mr-1" icon={faPlus} size="xs" />
        Add Task
      </div>
      <ModalWindow show={isNewTaskModalOpen} onHide={handleCloseNewTaskModal} title="New Task">
        <ModalCreateEl
          title="Name of Task"
          description="Add description"
          onHideModal={handleCloseNewTaskModal}
          boardId={boardId}
          cardId={cardId}
          showDescription={true}
          isTask={true}
          isCard={false}
        />
      </ModalWindow>
    </div>
  );
}
