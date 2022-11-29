import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

import { useGetAllBoardsQuery } from 'services/kanbanApiBoards';
import { PrevBoard } from 'components/PrevBoard/PrevBoard';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { Loading } from 'components/Loading/Loading';

import './BoardList.scss';

export function BoardList() {
  const { isLoading, isError, data } = useGetAllBoardsQuery();
  console.log(data);

  return (
    <Container>
      <h2 className="main__title">Boards List</h2>
      {isError && <ErrorMessage message="Something went wrong..." />}
      <div className="board-list__container">
        {isLoading && <Loading />}
        {Array.from({ length: 9 }).map((_, idx) => (
          <Nav.Link className="board-list__link" key={idx} as={Link} to="/board">
            <PrevBoard />
          </Nav.Link>
        ))}
      </div>
    </Container>
  );
}
