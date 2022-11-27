import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import './BoardList.scss';
import { FormValues } from 'components/NewBoard/NewBoard';
import { Board } from 'pages/Board/Board';

export function BoardList() {
  const boards: FormValues[] = JSON.parse(
    localStorage.getItem('boards') ??
      `[{ "name": "some board", "description": "some description" }]`
  );

  return (
    <Container>
      <h2 className="main__title">Boards List</h2>
      <div className="board-list__container">
        {boards.map((board: FormValues, idx: React.Key | null | undefined) => (
          <Nav.Link className="board-list__link" key={idx} as={Link} to="/board">
            <Board {...board} />
          </Nav.Link>
        ))}
      </div>
    </Container>
  );
}
