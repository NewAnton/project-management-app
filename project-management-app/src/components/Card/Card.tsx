import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

import { PrevTask } from 'components/PrevTask/PrevTask';

import './Card.scss';

export function Card() {
  return (
    <div className="board__card">
      <div className="board__card-header d-flex align-items-center justify-content-between">
        <div className="board__card-title">
          First Card <span className="board__card-count">2</span>
        </div>
        <FontAwesomeIcon className="prevcard__header-icon mr-1" icon={faTrash} />
      </div>
      <div className="board__card-container">
        {Array.from({ length: 6 }).map((_, idx) => (
          <PrevTask key={idx} />
        ))}
      </div>
      <div className="board__card-footer">
        <FontAwesomeIcon className="element__star mr-1" icon={faPlus} size="xs" />
        Add Task
      </div>
    </div>
  );
}
