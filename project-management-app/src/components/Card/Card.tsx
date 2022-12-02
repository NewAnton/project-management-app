import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

import { PrevTask } from 'components/PrevTask/PrevTask';
import { useGetTasksInColumnQuery } from 'services/kanbanApiTasks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { ModalCreateEl } from 'components/ModalCreateEl/ModalCreateEl';
import { useDeleteColumnByIdMutation } from 'services/kanbanApiColumns';
import { useDeleteTasksByIdMutation } from 'services/kanbanApiTasks';
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
  const { data: tasksData } = useGetTasksInColumnQuery({
    boardId: boardID,
    columnId: cardId,
  });
  const [arrayOfTask, setArrayOfTask] = useState<Task[]>([]);
  const [isNewTaskModalOpen, setisNewTaskModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [currentCard, setCurrentCard] = useState<Column | null>(null);
  const [deleteCard] = useDeleteColumnByIdMutation();
  const [deleteTask] = useDeleteTasksByIdMutation();

  useEffect(() => {
    if (tasksData !== undefined) {
      if (tasksData?.length > 1) {
        setArrayOfTask([...tasksData].sort(sortByField('order')));
      } else {
        setArrayOfTask(tasksData);
      }
      console.log(arrayOfTask);
    }
  }, [tasksData]);

  const handleCloseNewTaskModal = () => {
    setisNewTaskModalOpen(!isNewTaskModalOpen);
  };
  // console.log('cc', currentCard?._id);

  const handleclick = (event: React.MouseEvent) => {
    if ((event.target as Element).closest('.card__delete')) {
      deleteCard({ boardId: boardID, columnId: cardId });
    }
    // console.log(tasksData);
  };

  function dragStartHandler(
    e: React.DragEvent<HTMLElement>,
    taskCard: Task,
    columnCard: Column
  ): void {
    setCurrentTask(taskCard);
    setCurrentCard(columnCard);
    console.log(currentTask);
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLElement>): void {
    // (e.target as HTMLElement).style.border = 'none';
    // console.log('taskCaoord');
  }

  function dragEndHandler(e: React.DragEvent<HTMLElement>): void {
    // (e.target as HTMLElement).style.border = 'none';
    // (e.target as HTMLElement).style.background = 'var(--secondary-color)';
  }

  function dragOverHandler(e: React.DragEvent<HTMLElement>): void {
    e.preventDefault();
    // (e.target as HTMLElement).style.boxShadow =
    //   'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px';
    // (e.target as HTMLElement).style.background = 'var(--bs-gray-400)';
    // if ((e.target as HTMLElement).className == 'prevTask__container') {
    //   // (e.target as HTMLElement).style.borderColor = 'coral';
    //   (e.target as HTMLElement).style.border = '.15rem solid var(--header-bg)';
    //   console.log('ssd');
    // }
  }

  function dropHandler(e: React.DragEvent<HTMLElement>, taskCard: Task, columnCard: Column): void {
    e.preventDefault();
    // console.log(tasksData);
    const id = currentCard?._id;
    // console.log('dropCurr', id);
    // console.log('drop', columnCard._id);
    // if (currentTask) {
    //   console.log(currentTask);
    // }
    // if (currentCard?._id !== columnCard._id) {
    //   console.log(currentCard?._id);
    //   console.log(columnCard._id);
    // } else if (currentCard?._id === columnCard._id) {
    //   console.log('ff');
    //   console.log(currentCard?._id);
    //   console.log(columnCard._id);
    // }

    // (e.target as HTMLElement).style.background = 'var(--secondary-color)';
  }

  return (
    <div className="board__card" onClick={handleclick}>
      <div className="board__card-header d-flex align-items-center justify-content-between">
        <div className="board__card-title">
          {title} <span className="board__card-count">({tasksData?.length} Tasks)</span>
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
            onDragStart={(e) => dragStartHandler(e, task, columnCard)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
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
        Add Task
      </div>
      <ModalWindow show={isNewTaskModalOpen} onHide={handleCloseNewTaskModal} title="New Task">
        <ModalCreateEl
          title="Name of Task"
          description="Add description"
          onHideModal={handleCloseNewTaskModal}
          boardId={boardID}
          cardId={cardId}
          showDescription={true}
          isTask={true}
          isCard={false}
          arrLength={tasksData?.length}
        />
      </ModalWindow>
    </div>
  );
}
