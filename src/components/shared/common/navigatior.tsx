import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

type Props = { children: ReactNode; path: string };

const Navigator = ({ children, path }: Props) => {
  const navigate = useNavigate();
  return <span onClick={() => navigate(path)}>{children}</span>;
};

export default Navigator;
