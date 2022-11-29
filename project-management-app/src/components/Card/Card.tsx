import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

import { PrevTask } from 'components/PrevTask/PrevTask';

import './Card.scss';

interface ICardProps {
  title: string;
}

export function Card({ title }: ICardProps) {
  return (
    <div className="board__card">
      <div className="board__card-header d-flex align-items-center justify-content-between">
        <div className="board__card-title">
          {title} <span className="board__card-count">2</span>
        </div>
        <FontAwesomeIcon className="prevcard__header-icon mr-1" icon={faTrash} />
      </div>
      <div className="board__card-container">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Nav.Link className="board__card-link" key={idx} as={Link} to="/task">
            <PrevTask />
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
