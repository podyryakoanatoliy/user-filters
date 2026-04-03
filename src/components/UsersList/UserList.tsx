import UserCard from "@/components/UserCard/UserCard";

import styles from "./UserList.module.css";

interface User {
  name: string;
  department: { name: string; value: string };
  country: { name: string; value: string };
  status: { name: string; value: string };
}

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <p>Full Name</p>
        <p>Department</p>
        <p>Country</p>
        <p>Status</p>
      </div>

      <ul className={styles.list}>
        {users.map((user) => (
          <li key={user.name} className={styles.listItem}>
            <UserCard user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
}
