import { FC, PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
  active?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ onClick, children}) => <button onClick={onClick}>{children}</button>;

export default Button;
