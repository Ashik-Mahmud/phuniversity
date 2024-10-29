import { HTMLProps } from "react";
import cn from "../../utils/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
} & HTMLProps<HTMLDivElement>;

const Container = ({ children, className, ...rest }: Props) => {
  return (
    <div {...rest} className={cn("max-w-7xl mx-auto px-8 w-full", className)}>
      {children}
    </div>
  );
};

export default Container;
