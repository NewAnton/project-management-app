import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

import { PrevTask } from 'components/PrevTask/PrevTask';
import { useGetTasksInColumnQuery } from 'services/kanbanApiTasks';
import { useTypedSelector } from 'hooks/useTypedSelector';

import './Card.scss';

interface ICardProps {
  title: string;
  cardId: string;
}

export function Card({ title, cardId }: ICardProps) {
  const { boardID } = useTypedSelector((state) => state.boardID);

  const { data: tasksData } = useGetTasksInColumnQuery({
    boardId: boardID,
    columnId: cardId,
  });

  return (
    <div className="board__card">
      <div className="board__card-header d-flex align-items-center justify-content-between">
        <div className="board__card-title">
          {title} <span className="board__card-count">2</span>
        </div>
        <FontAwesomeIcon className="prevcard__header-icon mr-1" icon={faTrash} />
      </div>
      <div className="board__card-container">
        {tasksData?.map((task) => (
          <Nav.Link className="board__card-link" key={task._id} as={Link} to="/task">
            <PrevTask title={task.title} description={task.description} />
          </Nav.Link>
        ))}
      </div>
      <div className="board__card-footer">
        <FontAwesomeIcon className="mr-1" icon={faPlus} size="xs" />
        Add Task
      </div>
    </div>
  );
}
