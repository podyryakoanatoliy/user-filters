import { useId } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import SelectComponent from "@/components/SelectComponent/SelectComponent";
import type { Entity } from "@/components/Users/Users";
import type { User } from "@/components/Users/Users";

import css from "./ModalNewUser.module.css";
import Button from "../Button/Button";

interface FormValues {
  fullName: string;
  department: string;
  country: string;
  status: string;
}

interface ModalNewUserProps {
  onClose: () => void;
  onAddUser: (user: User) => void;
}

const departments: Entity[] = JSON.parse(
  localStorage.getItem("departments") || "[]",
);
const countries: Entity[] = JSON.parse(
  localStorage.getItem("countries") || "[]",
);
const statuses: Entity[] = JSON.parse(localStorage.getItem("statuses") || "[]");

const UserSchema = Yup.object().shape({
  fullName: Yup.string().min(3, "Too short!").required("Required"),
  department: Yup.string().required("Please select a department"),
  country: Yup.string().required("Please select a country"),
  status: Yup.string().required("Please select a status"),
});

export default function ModalNewUser({
  onClose,
  onAddUser,
}: ModalNewUserProps) {
  const id = useId();

  const initialValues: FormValues = {
    fullName: "",
    department: "",
    country: "",
    status: "",
  };

  const handleSubmit = (values: FormValues) => {
    const newUser: User = {
      id: Date.now(),
      name: values.fullName,
      department: departments.find((d) => d.value === values.department)!,
      country: countries.find((c) => c.value === values.country)!,
      status: statuses.find((s) => s.value === values.status)!,
    };

    onAddUser(newUser);
    onClose();
  };

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={css.title}>ADD USER</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={UserSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className={css.form}>
              <div className={css.grid}>
                <div className={css.field}>
                  <label htmlFor={id + "-full-name"}>Full Name</label>
                  <Field
                    className={css.input}
                    id={id + "-full-name"}
                    type="text"
                    name="fullName"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className={css.error}
                  />
                </div>

                <div className={css.field}>
                  <label htmlFor={id + "-department"}>Department</label>
                  <SelectComponent
                    placeholder="Select department"
                    array={departments}
                    modal={true}
                    value={values.department}
                    onSelect={(val) => setFieldValue("department", val)}
                  />
                  <ErrorMessage
                    name="department"
                    component="div"
                    className={css.error}
                  />
                </div>

                <div className={css.field}>
                  <label htmlFor={id + "-country"}>Country</label>
                  <SelectComponent
                    placeholder="Select country"
                    array={countries}
                    modal={true}
                    value={values.country}
                    onSelect={(val) => setFieldValue("country", val)}
                  />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className={css.error}
                  />
                </div>

                <div className={css.field}>
                  <label htmlFor={id + "-status"}>Status</label>
                  <SelectComponent
                    placeholder="Select status"
                    array={statuses}
                    modal={true}
                    value={values.status}
                    onSelect={(val) => setFieldValue("status", val)}
                  />
                  <ErrorMessage
                    name="status"
                    component="div"
                    className={css.error}
                  />
                </div>
              </div>
              <div className={css.actions}>
                <Button styles="btnCancel" onClick={() => onClose()}>
                  Cancel
                </Button>
                <Button type="submit" styles="btnAdd">
                  Save User
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
