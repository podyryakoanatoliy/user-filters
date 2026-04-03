import styles from "./UserCard.module.css";

interface User {
  name: string;
  status: {
    name: string;
    value: string;
  };
  department: {
    name: string;
    value: string;
  };
  country: {
    name: string;
    value: string;
  };
}

interface UserCardProps {
  user: User;
}

export default function UserCard({
  user: { name, status, department, country },
}: UserCardProps) {
  return (
    <>
      <p className={styles.name}>{name}</p>
      <p className={styles.info}>{department.name}</p>
      <p className={styles.info}>{country.name}</p>
      <p className={styles.status}>{status.name}</p>
      <button className={styles.deleteBtn}>
        <svg width="20" height="20">
          <use href="/icons.svg#trash-icon" />
        </svg>
      </button>
    </>
  );
}
