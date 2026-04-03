import { useState } from "react";

import users from "@/data/users.json";
import departments from "@/data/departments.json";
import countries from "@/data/countries.json";
import statuses from "@/data/statuses.json";

import UserList from "@/components/UsersList/UserList";
import ModalNewUser from "@/components/ModalNewUser/ModalNewUser";
import SelectComponent from "@/components/SelectComponent/SelectComponent";

import styles from "./Users.module.css";

export default function Users() {
  const [showUserForm, setShowUserForm] = useState<boolean>(false);
  const handleAddUser = () => {
    setShowUserForm(true);
    console.log("Modal was open");
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users</h1>
      <p className={styles.description}>Please add at least 3 departments...</p>
      <div className={styles.filterWrapper}>
        <SelectComponent
          placeholder="Select departments"
          isCheckBox={true}
          array={departments}
        />
        <SelectComponent placeholder="Select country" array={countries} />
        <SelectComponent placeholder="Select statuses" array={statuses} />
        <button className={styles.addUserBtn} onClick={handleAddUser}>
          Add User
        </button>
      </div>
      <UserList users={users} />
      {showUserForm && (
        <ModalNewUser
          onClose={() => {
            console.log("Modal was closed"); // прибрати лог або винести в функцію
            setShowUserForm(false);
          }}
        />
      )}
    </div>
  );
}
