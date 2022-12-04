import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useEffect, useMemo } from 'react';

import { Navigation } from './components/Navigation/Navigation';
import { Main } from 'pages/Main/Main';
import { BoardList } from 'pages/BoardList/BoardList';
import { Board } from 'pages/Board/Board';
import { Profile } from 'pages/Profile/Profile';
import { Task } from 'components/Task/Task';
import { ErrorPage404 } from 'pages/404ErrorPage/404ErrorPage';
import { Footer } from 'components/Footer/Footer';
import { useTypedSelector } from 'hooks/useTypedSelector';

import './App.scss';
import { checkIsTokenExpired } from 'services/checkIsTokenExpired';

export function App() {
  const { boardID } = useTypedSelector((state) => state.boardID);
  const { token } = useTypedSelector((state) => state.globalState);
  const navigate = useNavigate();

  const isTokenExpired = useMemo(() => checkIsTokenExpired(token), [token]);

  useEffect(() => {
    navigate('/');
  }, [isTokenExpired]);

  return (
    <>
      <header className="header">
        <Navigation isTokenExpired={isTokenExpired} />
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/board-list" element={<BoardList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/board" element={<Board boardId={boardID} />} />
          <Route path="/task" element={<Task />} />
          <Route path="*" element={<ErrorPage404 />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
