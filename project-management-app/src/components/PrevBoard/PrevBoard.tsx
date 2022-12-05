import React from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import { useTypedSelector } from 'hooks/useTypedSelector';

import './PrevBoard.scss';

interface IPrevBoardProps {
  title: string;
  description: string;
}

export function PrevBoard({ title, description }: IPrevBoardProps) {
  const { languageChoice } = useTypedSelector((state) => state.languageChoice);

  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('edit');
  };

  return (
    <Card bg="Light" text="dark" className="prevboard mb-4">
      <Card.Header className="d-flex justify-content-between">
        <div className="prevboard__header d-flex align-items-center" onClick={handleEdit}>
          <FontAwesomeIcon className="prevboard__header-icon mr-1" icon={faEdit} />
          <div className="prevboard__header-description">
            {languageChoice ? 'Edit' : 'Редактировать'}
          </div>
        </div>
        <div className="prevboard__header d-flex align-items-center">
          <FontAwesomeIcon className="prevboard__header-icon mr-1" icon={faTrash} />
          <div className="prevboard__header-description">
            {languageChoice ? 'Delete' : 'Удалить'}
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title> {title} </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
