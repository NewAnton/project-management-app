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
import { useDeleteTasksByIdMutation } from 'services/kanbanApiTasks';
import { Task, Column } from 'types/kanbanApiTypes';
import { sortByField } from 'services/sortArrayByFieldOfObj';

import './Card.scss';

import { Droppable, Draggable, DragDropContext, DropResult } from 'react-beautiful-dnd';
import TaskList from 'components/TaskList/TaskList';

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
  // const [taskOrder, setTaskOrder] = useState(0);
  const [changeOrderAndCardOfTask] = useUpdateSetOfTasksMutation();

  useEffect(() => {
    if (tasksData !== undefined) {
      if (tasksData?.length > 0) {
        setArrayOfTask([...tasksData].sort(sortByField('order')));
        // setTaskOrder(tasksData[tasksData.length - 1].order + 1);
      } else {
        setArrayOfTask(tasksData);
      }
    }
  }, [tasksData]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    //draggableId - column id
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;
    console.log(result);
  };

  return (
    <div className="board__card">
      <div className="board__card-header d-flex align-items-center justify-content-between">
        <div className="board__card-title">
          {title} <span className="board__card-count">({arrayOfTask?.length} Tasks)</span>
        </div>
        <FontAwesomeIcon className="prevcard__header-icon card__delete mr-1" icon={faTrash} />
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={cardId}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="board__card-container"
            >
              {arrayOfTask.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <PrevTask
                        title={task.title}
                        description={task.description}
                        cardId={cardId}
                        taskId={task._id}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* <div
        className="board__card-footer"
        onClick={() => {
          setisNewTaskModalOpen(true);
        }}
      >
        <FontAwesomeIcon className="mr-1" icon={faPlus} size="xs" />
        Add Task
      </div> */}
      {/* <ModalWindow show={isNewTaskModalOpen} onHide={handleCloseNewTaskModal} title="New Task">
        <ModalCreateEl
          title="Name of Task"
          description="Add description"
          onHideModal={handleCloseNewTaskModal}
          boardId={boardID}
          cardId={cardId}
          showDescription={true}
          isTask={true}
          isCard={false}
          arrLength={taskOrder}
        />
      </ModalWindow> */}
    </div>
  );
}
