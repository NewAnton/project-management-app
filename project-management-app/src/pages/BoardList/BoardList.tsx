import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

import { PrevBoard } from 'components/PrevBoard/PrevBoard';

import './BoardList.scss';

export function BoardList() {
  return (
    <Container>
      <h2 className="main__title">Boards List</h2>
      <div className="board-list__container">
        {Array.from({ length: 9 }).map((_, idx) => (
          <Nav.Link className="board-list__link" key={idx} as={Link} to="/board">
            <PrevBoard />
          </Nav.Link>
        ))}
      </div>
    </Container>
  );
}
