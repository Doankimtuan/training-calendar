import { TBlockProps } from '@/types/globals.type';
import { cn } from '@/utils/common';

export type IContainerProps = TBlockProps;

const Container = ({ className, children, ...props }: IContainerProps) => {
  return (
    <div
      {...props}
      className={cn('flex h-screen flex-col overflow-hidden', className)}
    >
      <main className="container mx-auto flex-1 xl:px-16 flex flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default Container;
