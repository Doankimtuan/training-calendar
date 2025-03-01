import { TIconProps } from '@/types/globals.type';

const PlusIcon = (props: TIconProps) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <ellipse
        cx="6"
        cy="5.91925"
        rx="6"
        ry="5.91925"
        fill="#A0A8B1"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 4.93271V2.95963H5V4.93271H3V6.90579H5V8.87887H7V6.90579H9V4.93271H7Z"
        fill="white"
      />
    </svg>
  );
};

export { PlusIcon };
