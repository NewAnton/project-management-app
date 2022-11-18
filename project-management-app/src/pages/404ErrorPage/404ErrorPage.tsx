import React from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export function ErrorPage404() {
  return (
    <Card className="p-3 bg-light" style={{ maxWidth: '20rem', margin: '10rem auto' }}>
      <FontAwesomeIcon style={{ color: 'var(--bs-warning)' }} icon={faTriangleExclamation} />
      <Card.Body>
        <Card.Title className="text-center">This page does not exist</Card.Title>
      </Card.Body>
    </Card>
  );
}
