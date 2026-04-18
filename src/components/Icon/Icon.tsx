import css from "./Icon.module.css";

interface IconProps {
  href: {
    name: string;
    className: string;
  };
}

export default function Icon({ href: { name, className } }: IconProps) {
  return (
    <svg width="20px" height="20px" className={className ? css[className] : ""}>
      <use href={`/icons.svg#${name}`} />
    </svg>
  );
}
