import React from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import './PrevBoard.scss';

// interface IPrevCardProps {
//   getCurrentCard: () => void;
// }

export function PrevCard(props: { name: string; description: string }) {
  return (
    <Card bg="Light" text="dark" className="prevcard mb-4">
      <Card.Header className="d-flex justify-content-between">
        <div className="prevcard__header d-flex align-items-center">
          <FontAwesomeIcon className="prevcard__header-icon mr-1" icon={faEdit} />
          <div className="prevcard__header-description">Edit</div>
        </div>
        <div className="prevcard__header d-flex align-items-center">
          <FontAwesomeIcon className="prevcard__header-icon mr-1" icon={faTrash} />
          <div className="prevcard__header-description">Delete</div>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title> {props.name} </Card.Title>
        <Card.Text> {props.description} </Card.Text>
      </Card.Body>
    </Card>
  );
}
