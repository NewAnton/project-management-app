import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

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
          <Nav.Link className="board__link" key={idx} as={Link} to="/task">
            <Card />
          </Nav.Link>
        ))}
      </div>
    </div>
  );
}
