import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Header.module.css';

interface LinkClassProps {
  isActive: boolean;
}

export default function Header() {
  const buildLinkClass = ({ isActive }: LinkClassProps) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <NavLink to="/edit" className={buildLinkClass}>
          Edit Users
        </NavLink>
        <NavLink to="/users" className={buildLinkClass}>
          Users
        </NavLink>
      </nav>
    </header>
  );
}
