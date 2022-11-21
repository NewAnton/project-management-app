import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import './PrevCard.scss';

export function PrevCard() {
  return (
    <div className="board__card">
      <div className="board__card-header d-flex align-items-center justify-content-between">
        <div className="board__card-title">
          First Card <span className="board__card-count">2</span>
        </div>
        <FontAwesomeIcon className="prevcard__header-icon mr-1" icon={faTrash} />
      </div>
    </div>
  );
}
