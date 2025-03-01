import { SVGProps } from 'react';

export type TIconProps = SVGProps<SVGSVGElement>;

export type TBlockProps = React.HTMLAttributes<HTMLDivElement>;

export interface IExercise {
  id: string;
  name: string;
  sets: string;
  times: number;
}

export interface IWorkout {
  id: string;
  title: string;
  exercises: IExercise[];
}

export interface IDayContainer {
  workoutIds: string[];
  id: string;
}

export interface ICalendarData {
  workouts: { [key: string]: IWorkout };
  columns: { [key: string]: IDayContainer };
  columnOrder: string[];
}
