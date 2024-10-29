import cn from "@/utils/cn";

type Props = {
  title: string;
  element: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
};

const Title = ({ title, element = "h2", className }: Props) => {
  switch (element) {
    case "h1":
      return (
        <h1 className={cn("text-2xl font-semibold font-poppins", className)}>
          {title}
        </h1>
      );
    case "h2":
      return (
        <h2 className={cn("text-2xl font-semibold font-poppins", className)}>
          {title}
        </h2>
      );
    case "h3":
      return (
        <h3 className={cn("text-2xl font-semibold font-poppins", className)}>
          {title}
        </h3>
      );
    case "h4":
      return (
        <h4 className={cn("text-2xl font-semibold font-poppins", className)}>
          {title}
        </h4>
      );
    case "h5":
      return (
        <h5 className={cn("text-2xl font-semibold font-poppins", className)}>
          {title}
        </h5>
      );
    case "h6":
      return (
        <h6 className={cn("text-2xl font-semibold font-poppins", className)}>
          {title}
        </h6>
      );
    default:
      return (
        <div className={cn("text-2xl font-semibold font-poppins", className)}>
          {title}
        </div>
      );
  }
  return <div>{title}</div>;
};

export default Title;
