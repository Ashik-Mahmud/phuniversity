import { Link } from "react-router-dom";

type Props = {
  firstName?: string;
  coloredName?: string;
};

const TextLogo = ({ firstName, coloredName }: Props) => {
  return (
    <Link
      to={"/"}
      className="logo text-2xl font-semibold uppercase text-center"
    >
      {firstName ? firstName : "Ph "}
      <span className="text-primary font-extrabold">
        {coloredName ? coloredName : " University"}
      </span>
    </Link>
  );
};

export default TextLogo;
