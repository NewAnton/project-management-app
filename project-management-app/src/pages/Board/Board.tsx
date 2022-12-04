import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Card } from 'components/Card/Card';
import { Loading } from 'components/Loading/Loading';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { useGetColumnsInBoardQuery } from 'services/kanbanApiColumns';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { ModalCreateEl } from 'components/ModalCreateEl/ModalCreateEl';
import { useParams } from 'react-router-dom';

import './Board.scss';

export function Board() {
  const urlParams = useParams();
  const boardId = (urlParams.id || '').toString();

  const { isLoading, isError, data: cardsData } = useGetColumnsInBoardQuery(boardId);
  const [isNewCardModalOpen, setIsNewCardModalOpen] = useState(false);

  const handleCloseNewCardModal = () => {
    setIsNewCardModalOpen(!isNewCardModalOpen);
  };

  return (
    <div className="board__wrapper container-fluid">
      <Container>
        <h2 className="main__title">Board</h2>
      </Container>
      {isError ? (
        <ErrorMessage message="Something went wrong..." />
      ) : (
        <div className="board__container row flex-row flex-nowrap mt-4 pb-4 pt-2">
          {isLoading && <Loading />}
          {cardsData?.map((card) => (
            <Card title={card.title} cardId={card._id} boardId={boardId} key={card._id} />
          ))}
          <div
            className="board__card card-btn"
            onClick={() => {
              setIsNewCardModalOpen(true);
            }}
          >
            <div className="card-btn__title">
              <FontAwesomeIcon className="mr-1" icon={faPlus} size="xs" />
              Add Card
            </div>
          </div>
        </div>
      )}
      <ModalWindow show={isNewCardModalOpen} onHide={handleCloseNewCardModal} title="New Card">
        <ModalCreateEl
          title="Name of Card"
          onHideModal={handleCloseNewCardModal}
          boardId={boardId}
          showDescription={false}
          isTask={false}
          isCard={true}
        />
      </ModalWindow>
    </div>
  );
}
