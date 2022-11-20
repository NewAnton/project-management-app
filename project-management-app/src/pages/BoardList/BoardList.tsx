import React from 'react';
import Container from 'react-bootstrap/Container';

import { PrevCard } from 'components/PrevCard/PrevCard';

import './BoardList.scss';

export function BoardList() {
  return (
    <Container>
      <h2 className="board-list__title">Boards</h2>
      <div className="board-list__container">
        {Array.from({ length: 11 }).map((_, idx) => (
          <PrevCard key={idx} />
        ))}
      </div>
    </Container>
  );
}
