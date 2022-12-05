import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { PrevTask } from 'components/PrevTask/PrevTask';
import { useGetTasksInColumnQuery, useUpdateSetOfTasksMutation } from 'services/kanbanApiTasks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { Task, Column } from 'types/kanbanApiTypes';
import { sortByField } from 'services/sortArrayByFieldOfObj';

import './Card.scss';

import { Droppable, Draggable, DragDropContext, DropResult } from 'react-beautiful-dnd';

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
  const [updatedArrayOfTask, setUpdatedArrayOfTask] = useState<
    { _id: string; order: number; columnId: string }[]
  >([]);
  const [changeOrder, newArrayOfTask] = useUpdateSetOfTasksMutation();

  useEffect(() => {
    if (tasksData !== undefined) {
      if (tasksData?.length > 0) {
        setArrayOfTask([...tasksData].sort(sortByField('order')));
      } else {
        setArrayOfTask(tasksData);
      }
    }
  }, [tasksData]);

  useEffect(() => {
    if (updatedArrayOfTask.length) changeOrder(updatedArrayOfTask);
  }, [updatedArrayOfTask]);

  useEffect(() => {
    if (newArrayOfTask.isSuccess) {
      setArrayOfTask(newArrayOfTask.data);
    }
  }, [newArrayOfTask]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    //draggableId - column id
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    setUpdatedArrayOfTask(() => {
      const newArrayOfTask = arrayOfTask.map((task) => {
        return { _id: task._id, order: task.order, columnId: task.columnId };
      });
      newArrayOfTask[source.index].order = destination.index + 1;
      newArrayOfTask[destination.index].order = source.index + 1;
      return newArrayOfTask;
    });
    setArrayOfTask(() => {
      const newArrayOfTask = arrayOfTask.map((task) => {
        return { ...task };
      });
      newArrayOfTask[source.index].order = destination.index + 1;
      newArrayOfTask[destination.index].order = source.index + 1;
      return newArrayOfTask;
    });
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
    </div>
  );
}
