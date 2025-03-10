import { TIconProps } from '@/types/globals.type';

const EllipsisIcon = (props: TIconProps) => {
  return (
    <svg
      width="11"
      height="4"
      viewBox="0 0 11 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <ellipse
        cx="1.5"
        cy="1.60498"
        rx="1.5"
        ry="1.47981"
        fill="#726EE4"
      />
      <ellipse
        cx="5.5"
        cy="1.60498"
        rx="1.5"
        ry="1.47981"
        fill="#726EE4"
      />
      <ellipse
        cx="9.5"
        cy="1.60498"
        rx="1.5"
        ry="1.47981"
        fill="#726EE4"
      />
    </svg>
  );
};

export { EllipsisIcon };
