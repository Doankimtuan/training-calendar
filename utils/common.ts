import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getRandomItem = <T>(array: T[]) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};
