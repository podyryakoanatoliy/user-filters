import type { User } from "@/components/Users/Users";

import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";

import styles from "./UserCard.module.css";

interface UserCardProps {
  user: User;
  onDelete: (id: string | number) => void;
}

export default function UserCard({
  user: { name, status, department, country, id },
  onDelete,
}: UserCardProps) {
  return (
    <>
      <p className={styles.name}>{name}</p>
      <p className={styles.info}>{department.name}</p>
      <p className={styles.info}>{country.name}</p>
      <p className={styles.status}>{status.name}</p>
      <Button styles="deleteBtn" onClick={() => onDelete(id)}>
        <Icon href={{ name: "delete", className: "delete" }} />
      </Button>
    </>
  );
}
