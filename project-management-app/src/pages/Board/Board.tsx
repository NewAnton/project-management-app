import React from 'react';
import Container from 'react-bootstrap/Container';

import { Card } from 'components/Card/Card';
import { Loading } from 'components/Loading/Loading';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { useGetColumnsInBoardQuery } from 'services/kanbanApiColumns';

import './Board.scss';

interface IBoardProps {
  boardId: string;
}

export function Board({ boardId }: IBoardProps) {
  const { isLoading, isError, data: cardsData } = useGetColumnsInBoardQuery(boardId);

  return (
    <div className="board__wrapper container-fluid">
      <Container>
        <h2 className="main__title">Board</h2>
        {isError && <ErrorMessage message="Something went wrong..." />}
      </Container>
      <div className="board__container row flex-row flex-nowrap mt-4 pb-4 pt-2">
        {isLoading && <Loading />}
        {cardsData?.map((card) => (
          <Card title={card.title} cardId={card._id} key={card._id} />
        ))}
      </div>
    </div>
  );
}
