import css from "./Button.module.css";
interface ButtonProps {
  type?: "button" | "submit" | "reset";
  styles?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Button({
  styles = "btn",
  onClick,
  children,
  type = "button",
}: ButtonProps) {
  return (
    <button type={type} className={styles ? css[styles] : ""} onClick={onClick}>
      {children}
    </button>
  );
}
