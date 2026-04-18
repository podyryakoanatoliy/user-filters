import type { User } from "@/components/Users/Users";

import UserCard from "@/components/UserCard/UserCard";

import styles from "./UserList.module.css";

interface UserListProps {
  users: User[];
  onDelete: (id: string | number) => void;
}
const tableHeaders = ["Full Name", "Department", "Country", "Status"];

export default function UserList({ users, onDelete }: UserListProps) {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        {tableHeaders.map((header) => (
          <p key={header}>{header}</p>
        ))}
      </div>

      <ul className={styles.list}>
        {users.map((user) => (
          <li key={user.name} className={styles.listItem}>
            <UserCard user={user} onDelete={onDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
}
