'use client';
import { DragDropContext, Draggable, DropResult, Droppable } from '@hello-pangea/dnd';
import { eachDayOfInterval, endOfWeek, startOfToday, startOfWeek } from 'date-fns';

import { useState } from 'react';
import { initialData } from '@/mock/data';
import DayBlock from './DayBlock';
import TaskItem from './TaskItem';
import { DragTypes, EXERCISES_ARRAY, LIST_SETS, LIST_WORKOUTS_TITLE } from '@/utils/constants';
import { PlusIcon } from '@/components/Icons';
import { getRandomItem } from '@/utils/common';
import { cloneDeep } from 'lodash';
import { ICalendarData, IDayContainer, IExercise } from '@/types/globals.type';

const Content = () => {
  const today = startOfToday();

  const days = eachDayOfInterval({
    start: startOfWeek(new Date(today), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(today), { weekStartsOn: 1 }),
  });

  const [calendarData, setCalendarData] = useState<ICalendarData>({
    workouts: initialData.tasks,
    columns: days.reduce(
      (result, cur) => ({
        ...result,
        [cur.toISOString()]: {
          workoutIds: [],
          id: cur.toISOString(),
        },
      }),
      {} as { [key: string]: IDayContainer }
    ),
    columnOrder: days.map(day => day.toISOString()),
  });

  const handleDragByWorkout = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const sourceDay = calendarData.columns[source.droppableId];
    const destinationDay = calendarData.columns[destination.droppableId];

    const newWorkoutIds = cloneDeep(sourceDay.workoutIds);
    newWorkoutIds.splice(source.index, 1);

    if (sourceDay.id === destinationDay.id) {
      newWorkoutIds.splice(destination.index, 0, draggableId);

      const updatedSourceDay = {
        ...sourceDay,
        workoutIds: newWorkoutIds,
      };

      setCalendarData(prev => ({
        ...prev,
        columns: {
          ...prev.columns,
          [updatedSourceDay.id]: updatedSourceDay,
        },
      }));
      return;
    }

    const updatedSourceDay = {
      ...sourceDay,
      workoutIds: newWorkoutIds,
    };

    const destinationWorkoutIds = cloneDeep(destinationDay.workoutIds);
    destinationWorkoutIds.splice(destination.index, 0, draggableId);
    const updatedDestinationDay = {
      ...destinationDay,
      workoutIds: destinationWorkoutIds,
    };

    setCalendarData(prev => ({
      ...prev,
      columns: {
        ...prev.columns,
        [updatedSourceDay.id]: updatedSourceDay,
        [updatedDestinationDay.id]: updatedDestinationDay,
      },
    }));
  };

  const handleDragByExercise = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const sourceWorkout = calendarData.workouts[source.droppableId];
    const destinationWorkout = calendarData.workouts[destination.droppableId];

    const newExercises = cloneDeep(sourceWorkout.exercises);
    const movedExercise = newExercises.find((ex: IExercise) => ex.id === draggableId);
    newExercises.splice(source.index, 1);

    if (sourceWorkout.id === destinationWorkout.id) {
      if (movedExercise) {
        newExercises.splice(destination.index, 0, movedExercise);
      }

      const updatedSourceWorkout = {
        ...sourceWorkout,
        exercises: newExercises,
      };

      setCalendarData(prev => ({
        ...prev,
        workouts: {
          ...prev.workouts,
          [updatedSourceWorkout.id]: updatedSourceWorkout,
        },
      }));

      return;
    }

    const destinationExercises = cloneDeep(destinationWorkout.exercises);
    if (movedExercise) {
      destinationExercises.splice(destination.index, 0, movedExercise);
    }

    const updatedSourceWorkout = {
      ...sourceWorkout,
      exercises: newExercises,
    };

    const updatedDestinationWorkout = {
      ...destinationWorkout,
      exercises: destinationExercises,
    };

    setCalendarData(prev => ({
      ...prev,
      workouts: {
        ...prev.workouts,
        [updatedSourceWorkout.id]: updatedSourceWorkout,
        [updatedDestinationWorkout.id]: updatedDestinationWorkout,
      },
    }));
  };

  const handleDragByType = {
    [DragTypes.WORKOUT]: (result: DropResult) => handleDragByWorkout(result),
    [DragTypes.EXERCISE]: (result: DropResult) => handleDragByExercise(result),
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    handleDragByType[type as keyof typeof DragTypes](result);
  };

  const handleAddNewWorkout = (day: string) => {
    const existingDay = calendarData.columns[day];
    const newWorkoutId = `workout-${Object.keys(calendarData.workouts).length + 1}`;
    const newWorkoutIds = [...existingDay.workoutIds, newWorkoutId];

    const newDayContainer = {
      ...existingDay,
      workoutIds: newWorkoutIds,
    };

    const newWorkouts = {
      ...cloneDeep(calendarData.workouts),
      [newWorkoutId]: {
        id: newWorkoutId,
        title: getRandomItem(LIST_WORKOUTS_TITLE),
        exercises: [],
      },
    };

    setCalendarData(prev => ({
      ...prev,
      workouts: newWorkouts,
      columns: {
        ...prev.columns,
        [day]: newDayContainer,
      },
    }));
  };

  const handleAddNewExercise = (workoutId: string) => {
    const existingWorkout = calendarData.workouts[workoutId];

    const newWorkout = {
      ...existingWorkout,
      exercises: [
        ...existingWorkout.exercises,
        {
          id: `${workoutId}-exercise-${existingWorkout.exercises.length + 1}`,
          name: getRandomItem(EXERCISES_ARRAY),
          sets: getRandomItem(LIST_SETS),
          times: Math.floor(Math.random() * 10) + 1,
        },
      ],
    };

    setCalendarData(prev => ({
      ...prev,
      workouts: {
        ...prev.workouts,
        [workoutId]: newWorkout,
      },
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="py-20 flex-1 grid grid-cols-7 gap-x-2.5 overflow-hidden">
        {calendarData.columnOrder.map(day => {
          const column = calendarData.columns[day as keyof typeof calendarData.columns];

          const tasks = column.workoutIds.map(
            taskId => calendarData.workouts[taskId as keyof typeof calendarData.workouts]
          );

          return (
            <DayBlock
              className="overflow-hidden"
              key={day}
              day={new Date(day)}
              buttonAdd={
                <button
                  className="flex"
                  onClick={() => handleAddNewWorkout(day)}
                >
                  <PlusIcon />
                </button>
              }
            >
              <div className="overflow-auto px-2 pb-2 flex-1 flex flex-col">
                <Droppable
                  droppableId={day}
                  type={DragTypes.WORKOUT}
                >
                  {provided => (
                    <div
                      className="flex flex-col space-y-2 flex-1"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {tasks.map((task, index) => {
                        return (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <TaskItem
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                title={task.title}
                                isDragging={snapshot.isDragging}
                                task={task}
                                buttonAdd={
                                  <button
                                    className="flex"
                                    onClick={() => handleAddNewExercise(task.id)}
                                  >
                                    <PlusIcon />
                                  </button>
                                }
                              ></TaskItem>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </DayBlock>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default Content;
