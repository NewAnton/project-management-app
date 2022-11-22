import React from 'react';
import Container from 'react-bootstrap/Container';

import { Card } from 'components/Card/Card';

import './Board.scss';

export function Board() {
  return (
    <div className="board__wrapper container-fluid">
      <Container>
        <h2 className="main__title">Board</h2>
      </Container>
      <div className="board__container row flex-row flex-nowrap mt-4 pb-4 pt-2">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Card key={idx} />
        ))}
      </div>
    </div>
  );
}
