import React, { useState } from "react";
import Button from "./Button";
import Head from "./Head";

export default function UserSignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    console.log(formData.fullName, formData.email, formData.phoneNumber);
    setFormData({ fullName: "", email: "", phoneNumber: "" });
    e.preventDefault();
  };
  return (
    <>
      <Head />
      <div id="mainsign">
        <h2>Join Pickload as an Individual Delivery agent</h2>

        <form onSubmit={handleSubmit} className="sign-form">
          <label className="requiredText">Full name</label>
          <input
            value={formData.fullName}
            onChange={handleChange}
            type="text"
            className="form-field"
            placeholder="Enter your full name"
            name="fullName"
          />
          <br />

          <label className="requiredText">Email</label>
          <input
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="form-field"
            placeholder="Enter your Email"
            name="email"
          />
          <br />

          <label className="requiredText">Phone Number</label>
          <input
            value={formData.phoneNumber}
            onChange={handleChange}
            type="number"
            className="form-field"
            placeholder="Enter your Phone Number"
            name="phoneNumber"
          />

          <br />
          <Button name="Next" />
        </form>
      </div>
    </>
  );
}
