import { IWorkout, TBlockProps } from '@/types/globals.type';
import { cn } from '@/utils/common';
import { TYPE_EXERCISE } from '@/utils/constants';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import React, { forwardRef } from 'react';
import { EllipsisIcon } from '../Icons/ellipsis';

interface IComponentProps extends TBlockProps {
  isDragging?: boolean;
  title: string;
  task: IWorkout;
  buttonAdd: React.ReactNode;
}

const TaskItem = forwardRef<HTMLDivElement, IComponentProps>(
  ({ isDragging, className, title, task, buttonAdd, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          'shadow-card p-1 border border-border-card rounded-md bg-white',
          {
            'bg-gray-300': isDragging,
          },
          className
        )}
      >
        <div className="flex justify-between items-center px-2">
          <h3 className="line-clamp-1 text-xs font-bold text-primary uppercase">{title}</h3>
          <button className="flex">
            <EllipsisIcon />
          </button>
        </div>
        <Droppable
          droppableId={task.id}
          type={TYPE_EXERCISE}
        >
          {provided => (
            <div
              className="flex flex-col space-y-2 my-2"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {task.exercises.map((ex, index) => {
                return (
                  <Draggable
                    key={ex.id}
                    draggableId={ex.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        key={ex.id}
                        className={cn(
                          'flex shadow-card rounded-md flex-col p-1 border border-border-card bg-white',
                          { 'bg-blue-100': snapshot.isDragging }
                        )}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p className="text-right text-xs text-black font-semibold">{ex.name}</p>
                        <p className="flex justify-between items-center">
                          <span className="text-muted-300 text-xs font-bold text-[10px]">
                            {ex.times}x
                          </span>
                          <span className="text-muted-400 text-[10px] font-normal line-clamp-1 max-w-[85%]">
                            {ex.sets}
                          </span>
                        </p>
                      </div>
                    )}
                  </Draggable>
                );
              })}

              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <div className="flex justify-end">{buttonAdd}</div>
      </div>
    );
  }
);

TaskItem.displayName = 'TaskItem';

export default TaskItem;
