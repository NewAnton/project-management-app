import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import { useDeleteTasksByIdMutation } from 'services/kanbanApiTasks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { Task } from 'types/kanbanApiTypes';

import './PrevTask.scss';

interface IPrevTaskProps {
  title: string;
  description: string;
  cardId: string;
  taskId: string;
  getRemoveTask: (task: Task) => void;
}

export function PrevTask({ title, description, cardId, taskId, getRemoveTask }: IPrevTaskProps) {
  const { boardID } = useTypedSelector((state) => state.boardID);
  const [deleteTask] = useDeleteTasksByIdMutation();

  const handleclick = async (event: React.MouseEvent) => {
    event.preventDefault();
    if ((event.target as Element).closest('.prevcard__header-icon')) {
      const task = deleteTask({ boardId: boardID, columnId: cardId, taskId: taskId });
      const result = await task.unwrap().then((payload) => payload);
      getRemoveTask(result);
    }
  };

  return (
    <div className="prevTask__container" onClick={handleclick}>
      <div className="prevTask__header d-flex justify-content-between mb-1">
        <div className="prevTask__title">{title}</div>
        <FontAwesomeIcon className="prevcard__header-icon mr-1" icon={faClose} />
      </div>
      <div className="prevTask__description">{description}</div>
    </div>
  );
}
