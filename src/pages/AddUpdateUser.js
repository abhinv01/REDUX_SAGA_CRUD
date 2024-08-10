import {
  MDBBtn,
  MDBInput,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createUsersStart, updateUsersStart } from "../redux/actions";
import { toast } from "react-toastify";

const initialForm = { name: "", address: "", phone: "", email: "", status: "" };

const AddUpdateUser = () => {
  const [formValue, setFormValue] = useState(initialForm);
  const { name, address, phone, email, status } = formValue;
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.data);
  const { id } = useParams();
  const formRef = useRef(null);

  useEffect(() => {
    if (id && users.length === 0) {
      navigate("..");
    }
    if (id) {
      const ind = users.find((item) => item?.id?.toString() === id.toString());
      if (ind && Object.keys(ind).length > 0) {
        const { name, address, phone, email, status } = ind;
        setFormValue((prev) => ({
          ...prev,
          name,
          address,
          phone,
          email,
          status,
        }));
        setEditMode((prev) => !prev);
      }
    } else {
      setEditMode(false);
      setFormValue(initialForm);
    }
  }, [id, users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && address && phone && email && formRef.current.checkValidity()) {
      if (!editMode) {
        dispatch(createUsersStart(formValue));
        toast.success(`${name} added successfully`);
        setTimeout(() => {
          navigate("..");
        }, 500);
      } else {
        dispatch(updateUsersStart(id, formValue));
        toast.success(`Updated ${name}'s data successfully`);
        setTimeout(() => {
          navigate("..");
        }, 500);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const options = [
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Inactive",
      value: "inactive",
    },
  ];

  const onDropdownChange = (e) => {
    setFormValue({ ...formValue, status: e.target.value });
  };
  return (
    <MDBValidation
      className="row g-3"
      noValidate
      style={{ marginBlockStart: "100px" }}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <p className="fs-2 fw-bold"> {editMode ? "Edit User" : "Add User"}</p>
      <div
        className="d-flex flex-column"
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
          gap: "1rem",
        }}
      >
        <MDBValidationItem feedback="Please provide name" invalid>
          <MDBInput
            value={name}
            name="name"
            type="text"
            onChange={handleInputChange}
            label="name"
            required
          ></MDBInput>
        </MDBValidationItem>

        <MDBValidationItem feedback="Please provide email" invalid>
          <MDBInput
            value={email}
            name="email"
            type="email"
            onChange={handleInputChange}
            label="email"
            required
          ></MDBInput>
        </MDBValidationItem>

        <MDBValidationItem feedback="Please provide phone number" invalid>
          <MDBInput
            value={phone}
            name="phone"
            type="tel"
            onChange={handleInputChange}
            label="phone"
            required
          ></MDBInput>
        </MDBValidationItem>

        <MDBValidationItem feedback="Please provide address" invalid>
          <MDBInput
            value={address}
            name="address"
            type="text"
            onChange={handleInputChange}
            label="address"
            required
          ></MDBInput>
          <br></br>
          <select
            style={{
              width: "100%",
              borderRadius: "2px",
              height: "35px",

              padding: "0 6px",
            }}
            onChange={onDropdownChange}
            value={formValue.status}
          >
            <option>Please select status</option>
            {options.map((e, i) => {
              return (
                <option key={i} value={e.value}>
                  {e.label}
                </option>
              );
            })}
          </select>
        </MDBValidationItem>
      </div>
      <div className="col-12">
        <MDBBtn style={{ marginRight: "10px" }} type="submit">
          {editMode ? "Update" : "Add"}
        </MDBBtn>
        <MDBBtn type="button" onClick={() => navigate("..")}>
          Go back
        </MDBBtn>
      </div>
    </MDBValidation>
  );
};

export default AddUpdateUser;
