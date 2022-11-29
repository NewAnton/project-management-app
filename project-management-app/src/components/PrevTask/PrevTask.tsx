import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import './PrevTask.scss';

interface IPrevTaskProps {
  title: string;
  description: string;
}

export function PrevTask({ title, description }: IPrevTaskProps) {
  return (
    <div className="prevTask__container">
      <div className="prevTask__header d-flex justify-content-between mb-1">
        <div className="prevTask__title">{title}</div>
        <FontAwesomeIcon className="prevcard__header-icon mr-1" icon={faClose} />
      </div>
      <div className="prevTask__description">{description}</div>
    </div>
  );
}
