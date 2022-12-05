import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

import { PrevTask } from 'components/PrevTask/PrevTask';
import { useGetTasksInColumnQuery, useUpdateSetOfTasksMutation } from 'services/kanbanApiTasks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { ModalCreateEl } from 'components/ModalCreateEl/ModalCreateEl';
import { useDeleteColumnByIdMutation } from 'services/kanbanApiColumns';
import { Task, Column } from 'types/kanbanApiTypes';
import { sortByField } from 'services/sortArrayByFieldOfObj';

import './Card.scss';

interface ICardProps {
  title: string;
  cardId: string;
  columnCard: Column;
}

export function Card({ title, cardId, columnCard }: ICardProps) {
  const { boardID } = useTypedSelector((state) => state.boardID);
  const { languageChoice } = useTypedSelector((state) => state.languageChoice);
  const { data: tasksData } = useGetTasksInColumnQuery({
    boardId: boardID,
    columnId: cardId,
  });
  const [arrayOfTask, setArrayOfTask] = useState<Task[]>([]);
  const [taskOrder, setTaskOrder] = useState(0);
  const [isNewTaskModalOpen, setisNewTaskModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  const [deleteCard] = useDeleteColumnByIdMutation();
  const [changeOrderAndCardOfTask] = useUpdateSetOfTasksMutation();

  useEffect(() => {
    if (tasksData !== undefined) {
      if (tasksData?.length > 0) {
        setArrayOfTask([...tasksData].sort(sortByField('order')));
        setTaskOrder(tasksData[tasksData.length - 1].order + 1);
      } else {
        setArrayOfTask(tasksData);
      }
    }
  }, [tasksData]);

  const handleCloseNewTaskModal = () => {
    setisNewTaskModalOpen(!isNewTaskModalOpen);
  };

  const handleclick = (event: React.MouseEvent) => {
    if ((event.target as Element).closest('.card__delete')) {
      deleteCard({ boardId: boardID, columnId: cardId });
    }
  };

  function dragStartHandler(e: React.DragEvent<HTMLElement>, taskCard: Task): void {
    setCurrentTask(taskCard);
  }

  function dragOverHandler(e: React.DragEvent<HTMLElement>): void {
    e.preventDefault();
  }

  function dropHandler(e: React.DragEvent<HTMLElement>, taskCard: Task, columnCard: Column): void {
    e.preventDefault();
    const tempTasksList = [...arrayOfTask];
    if (currentTask) {
      const currentIndex = tempTasksList.indexOf(currentTask);
      tempTasksList.splice(currentIndex, 1);
      const dropIndex = tempTasksList.indexOf(taskCard);
      tempTasksList.splice(dropIndex, 0, currentTask);
      const newTaskList = tempTasksList.map((task, index) => ({
        ...task,
        order: index,
      }));

      const arrayForServer = newTaskList.map((task) => ({
        _id: task._id,
        order: task.order,
        columnId: columnCard._id,
      }));
      changeOrderAndCardOfTask(arrayForServer);

      // setArrayOfTask(newTaskList);
    }
  }

  return (
    <div className="board__card" onClick={handleclick}>
      <div className="board__card-header d-flex align-items-center justify-content-between">
        <div className="board__card-title">
          {title} <span className="board__card-count">({arrayOfTask?.length} Tasks)</span>
        </div>
        <FontAwesomeIcon className="prevcard__header-icon card__delete mr-1" icon={faTrash} />
      </div>
      <div className="board__card-container">
        {arrayOfTask.map((task) => (
          <Nav.Link
            className="board__card-link"
            key={task._id}
            as={Link}
            to="/task"
            draggable={true}
            onDragStart={(e) => dragStartHandler(e, task)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, task, columnCard)}
          >
            <PrevTask
              title={task.title}
              description={task.description}
              cardId={cardId}
              taskId={task._id}
            />
          </Nav.Link>
        ))}
      </div>
      <div
        className="board__card-footer"
        onClick={() => {
          setisNewTaskModalOpen(true);
        }}
      >
        <FontAwesomeIcon className="mr-1" icon={faPlus} size="xs" />
        {languageChoice ? 'Add Task' : 'Добавить Задачу'}
      </div>
      <ModalWindow
        show={isNewTaskModalOpen}
        onHide={handleCloseNewTaskModal}
        title={languageChoice ? 'New Task' : 'Новая Задача'}
      >
        <ModalCreateEl
          title={languageChoice ? 'Name of Task' : 'Название Задачи'}
          description={languageChoice ? 'Add description' : 'Добавьте описание'}
          onHideModal={handleCloseNewTaskModal}
          boardId={boardID}
          cardId={cardId}
          showDescription={true}
          isTask={true}
          isCard={false}
          arrLength={taskOrder}
        />
      </ModalWindow>
    </div>
  );
}
