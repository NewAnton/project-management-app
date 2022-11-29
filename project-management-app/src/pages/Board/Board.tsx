import React from 'react';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Card } from 'components/Card/Card';

import './Board.scss';

export function Board() {
  return (
    <div className="board__wrapper container-fluid">
      <Container>
        <h2 className="main__title">Board</h2>
      </Container>
      <div className="board__container row flex-row flex-nowrap mt-4 pb-4 pt-2">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Card key={idx} />
        ))}
        <div className="board__card card-btn">
          <div className="card-btn__title">
            <FontAwesomeIcon className="mr-1" icon={faPlus} size="xs" />
            Add Card
          </div>
        </div>
      </div>
    </div>
  );
}
