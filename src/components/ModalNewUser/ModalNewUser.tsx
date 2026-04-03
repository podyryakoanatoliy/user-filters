import { useId, useState } from "react";

import departments from "@/data/departments.json";
import countries from "@/data/countries.json";
import statuses from "@/data/statuses.json";

import SelectComponent from "../SelectComponent/SelectComponent";

import css from "./ModalNewUser.module.css";

interface ModalNewUserProps {
  onClose: () => void;
}

export default function ModalNewUser({ onClose }: ModalNewUserProps) {
  const id = useId();
  const [formData, setFormData] = useState({
    fullName: "",
    department: "",
    country: "",
    status: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    onClose();
  };

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={css.title}>ADD USER</h2>

        <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.grid}>
            <div className={css.field}>
              <label htmlFor={id + "-full-name"}>Full Name</label>
              <input
                id={id + "-full-name"}
                type="text"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
              />
            </div>

            <div className={css.field}>
              <label>Department</label>
              <SelectComponent
                placeholder="Select department"
                array={departments}
                modal={true}
                onSelect={(val) => handleInputChange("department", val)}
              />
            </div>

            <div className={css.field}>
              <label>Country</label>
              <SelectComponent
                placeholder="Select country"
                array={countries}
                modal={true}
                onSelect={(val) => handleInputChange("country", val)}
              />
            </div>

            <div className={css.field}>
              <label>Status</label>
              <SelectComponent
                placeholder="Select status"
                array={statuses}
                modal={true}
                onSelect={(val) => handleInputChange("status", val)}
              />
            </div>
          </div>

          <div className={css.actions}>
            <button type="button" className={css.btnCancel} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={css.btnAdd}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
