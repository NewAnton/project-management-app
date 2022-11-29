import React from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import './PrevBoard.scss';

interface IPrevBoardProps {
  title: string;
  description: string;
  // getCurrentCard: () => void;
}

export function PrevBoard(props: IPrevBoardProps) {
  return (
    <Card bg="Light" text="dark" className="prevboard mb-4">
      <Card.Header className="d-flex justify-content-between">
        <div className="prevboard__header d-flex align-items-center">
          <FontAwesomeIcon className="prevboard__header-icon mr-1" icon={faEdit} />
          <div className="prevboard__header-description">Edit</div>
        </div>
        <div className="prevboard__header d-flex align-items-center">
          <FontAwesomeIcon className="prevboard__header-icon mr-1" icon={faTrash} />
          <div className="prevboard__header-description">Delete</div>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title> {props.title} </Card.Title>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
