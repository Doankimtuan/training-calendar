import { format, isEqual, startOfToday } from 'date-fns';
import React, { forwardRef } from 'react';
import { TBlockProps } from '../../types/globals.type';
import { cn } from '@/utils/common';

interface IComponentProps extends TBlockProps {
  day: Date;
  buttonAdd: React.ReactNode;
}

const today = startOfToday();

const DayBlock = forwardRef<HTMLDivElement, IComponentProps>(
  ({ day, className, children, buttonAdd, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('rounded-md flex flex-col', className)}
        {...props}
      >
        <h3 className={cn('mb-2 text-muted-200 text-xs font-semibold uppercase')}>
          {format(day, 'eee')}
        </h3>
        <div className="bg-bg-gray flex-1 flex flex-col overflow-hidden">
          <div className="flex justify-between items-center mb-2 px-2 pt-2">
            <p
              className={cn('text-xs text-muted-100 font-semibold', {
                'text-primary font-bold': isEqual(day, today),
              })}
            >
              {format(day, 'dd')}
            </p>
            {buttonAdd}
          </div>
          {children}
        </div>
      </div>
    );
  }
);

DayBlock.displayName = 'DayBlock';

export default DayBlock;
