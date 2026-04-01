import { NavLink } from "react-router-dom";
import clsx from "clsx";

import css from "./Header.module.css";

interface LinkClassProps {
  isActive: boolean;
}
interface navLinkProps {
  to: string;
  title: string;
}

const navLinks = [
  { to: "/edit", title: "Edit Users" },
  { to: "/users", title: "Users" },
];

export default function Header() {
  const buildLinkClass = ({ isActive }: LinkClassProps) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        {navLinks.map(({ to, title }: navLinkProps) => (
          <NavLink key={to} to={to} className={buildLinkClass}>
            {title}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
