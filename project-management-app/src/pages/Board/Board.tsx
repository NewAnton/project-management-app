import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

import { PrevCard } from 'components/PrevCard/PrevCard';

import './Board.scss';

export function Board() {
  return (
    <>
      <Container>
        <h2 className="main__title">Board</h2>
      </Container>
      <div className="board__container">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Nav.Link className="board__link" key={idx} as={Link} to="/task">
            <PrevCard />
          </Nav.Link>
        ))}
      </div>
    </>
  );
}
