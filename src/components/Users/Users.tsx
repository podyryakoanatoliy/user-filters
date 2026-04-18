import { useEffect, useState } from "react";

import users from "@/data/users.json";
import departments from "@/data/departments.json";
import countries from "@/data/countries.json";
import statuses from "@/data/statuses.json";

import UserList from "@/components/UsersList/UserList";
import ModalNewUser from "@/components/ModalNewUser/ModalNewUser";
import SelectComponent from "@/components/SelectComponent/SelectComponent";
import Icon from "@/components/Icon/Icon";
import Button from "@/components/Button/Button";

import styles from "./Users.module.css";

export interface Entity {
  name: string;
  value: string;
}

export interface User {
  id: number | string;
  name: string;
  department: Entity;
  country: Entity;
  status: Entity;
}

localStorage.setItem("departments", JSON.stringify(departments));
localStorage.setItem("countries", JSON.stringify(countries));
localStorage.setItem("statuses", JSON.stringify(statuses));

export default function Users() {
  const [showUserForm, setShowUserForm] = useState<boolean>(false);
  const [selectedDeps, setSelectedDeps] = useState<Entity[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Entity | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Entity | null>(null);

  const [userList, setUserList] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      return JSON.parse(savedUsers);
    }
    const initialUsers = users.map((user, index) => ({
      ...user,
      id: (user as any).id || `user-${index}-${Date.now()}`,
    }));
    localStorage.setItem("users", JSON.stringify(initialUsers));
    return initialUsers;
  });
  console.log("userList", userList);

  useEffect(() => {
    if (selectedDeps.length < 3) {
      setSelectedCountry(null);
      setSelectedStatus(null);
    }
  }, [selectedDeps]);

  const handleAddNewUser = (newUser: User) => {
    const updated = [newUser, ...userList];
    setUserList(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  const handleDeleteUser = (id: string | number) => {
    const updated = userList.filter((user) => user.id !== id);
    setUserList(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  const handleResetFilters = () => {
    setSelectedDeps([]);
    setSelectedCountry(null);
    setSelectedStatus(null);
  };

  const isFiltersDisabled = selectedDeps.length < 3;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users</h1>
      <p className={styles.description}>Please add at least 3 departments...</p>
      <div className={styles.controls}>
        <div className={styles.filterWrapper}>
          <SelectComponent
            placeholder="Select departments"
            isCheckBox={true}
            array={departments}
            value={selectedDeps}
            onChange={setSelectedDeps}
          />
          <SelectComponent
            placeholder="Select country"
            array={countries}
            value={selectedCountry}
            onChange={setSelectedCountry}
            disabled={isFiltersDisabled}
          />
          <SelectComponent
            placeholder="Select statuses"
            array={statuses}
            value={selectedStatus}
            onChange={setSelectedStatus}
            disabled={isFiltersDisabled}
          />
          <Button styles="filterBtn" onClick={handleResetFilters}>
            <Icon href={{ name: "delete", className: "delete" }} />
          </Button>
        </div>
        <Button styles="btnAdd" onClick={() => setShowUserForm(true)}>
          Add User
        </Button>
      </div>
      <UserList users={userList} onDelete={handleDeleteUser} />
      {showUserForm && (
        <ModalNewUser
          onClose={() => setShowUserForm(false)}
          onAddUser={handleAddNewUser}
        />
      )}
    </div>
  );
}
