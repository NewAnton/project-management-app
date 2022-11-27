import React from 'react';
import Container from 'react-bootstrap/Container';

import { Card } from 'components/Card/Card';

import './Board.scss';
import { FormValues } from 'components/NewBoard/NewBoard';

export function Board(board: FormValues) {
  return (
    <div className="board__wrapper container-fluid">
      <Container>
        <h2 className="main__title">{board.name}</h2>
      </Container>
      <div className="board__container row flex-row flex-nowrap mt-4 pb-4 pt-2">{<Card />}</div>
    </div>
  );
}
