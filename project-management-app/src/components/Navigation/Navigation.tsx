import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './Navigation.scss';

export function Navigation() {
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/">Project Management App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 nav__container" navbarScroll>
            <Nav.Link as={Link} to="/">
              Main
            </Nav.Link>
            <Nav.Link as={Link} to="/board-list">
              Board list
            </Nav.Link>
            <Nav.Link as={Link} to="/board">
              Board
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
