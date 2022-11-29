import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

import {
  useCreateBoardMutation,
  useDeleteBoardByIdMutation,
  useGetAllBoardsQuery,
} from 'services/kanbanApiBoards';
import { useGetColumnsInBoardQuery } from 'services/kanbanApiColumns';
import { PrevBoard } from 'components/PrevBoard/PrevBoard';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { Loading } from 'components/Loading/Loading';
import { useCreateColumnInBoardMutation } from 'services/kanbanApiColumns';

import './BoardList.scss';
import { FormValues } from 'components/NewBoard/NewBoard';
import { Board } from 'pages/Board/Board';

export function BoardList() {
  const { isLoading, isError, data: boardsData } = useGetAllBoardsQuery();
  const { data: columnsData } = useGetColumnsInBoardQuery('638601fb7d51b3a61a8eb7c9');

  const [addColumn] = useCreateColumnInBoardMutation();
  const [deleteBoard] = useDeleteBoardByIdMutation();
  const [createBoard] = useCreateBoardMutation();
  console.log(boardsData);

  const funcAddCol = () => {
    addColumn({
      id: '638601fb7d51b3a61a8eb7c9',
      title: 'Column 5 for Board 3',
      order: 5,
    });
    console.log('a');
  };

  const funcDel = () => {
    deleteBoard('638601247d51b3a61a8eb7c5');
  };

  const funcCreate = () => {
    createBoard({
      title: JSON.stringify({ title: 'fours board', description: 'description for fours board' }),
      owner: 'I am',
      users: ['only me'],
    });
  };

  console.log(columnsData);

  const clickHandlerBoard = (boardId: string) => {
    console.log(boardId);
  };

  const boards: FormValues[] = JSON.parse(
    localStorage.getItem('boards') ??
      `[{ "name": "some board", "description": "some description" }]`
  );

  return (
    <Container>
      <h2 className="main__title" onClick={funcAddCol}>
        Boards List
      </h2>
      {isError && <ErrorMessage message="Something went wrong..." />}
      <div className="board-list__container">
        {isLoading && <Loading />}
        {boardsData?.map((board) => (
          <Nav.Link
            onClick={() => clickHandlerBoard(board._id)}
            className="board-list__link"
            key={board._id}
            as={Link}
            to="/board"
          >
            <PrevBoard
              title={JSON.parse(board.title).title}
              description={JSON.parse(board.title).description}
            />
          </Nav.Link>
        ))}
      </div>
    </Container>
  );
}
