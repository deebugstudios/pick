import React from "react";
import Head from "../javascript/Head";
import ProgressMM from "../Images/ProgressII.png";
import Button from "../javascript/Button";
import Footer from "../javascript/Footer";
import { Link } from "react-router-dom";

export default function AgentCompleted() {
  const asterik = <span id="asterik">*</span>;

  return (
    <>
      <Head />
      <div id="mainsign">
        <h2>Join Pickload as an Individual Delivery agent</h2>
        <br />
        <div>
          <img src={ProgressMM} alt="Progress" />
        </div>
        <br />
        <br />

        <form className="sign-form">
          <label htmlFor="Manufacturer">
            <span className="requiredText">Bank name</span>
            <br />
            <input
              type="text"
              className="form-field edit-field"
              name="Bankname"
            />
          </label>
          <br />

          <label htmlFor="Holdername">
            <span className="requiredText">Bank account holder's name</span>
            <br />
            <input
              type="text"
              className="form-field edit-field"
              name="Holdername"
            />
          </label>
          <br />

          <label htmlFor="AccountNumber">
            <span className="requiredText">Bank account number</span>
            <br />
            <input
              type="text"
              className="form-field edit-field"
              name="AccountNumber"
            />
          </label>
          <br />

          <label htmlFor="ConfirmNumber">
            <span className="requiredText">Confirm Bank account number</span>
            <br />
            <input
              type="text"
              className="form-field edit-field"
              name="ConfirmNumber"
            />
          </label>
          <br />

          <label htmlFor="bvn">
            <span className="requiredText">BVN</span>
            <br />
            <input type="text" className="form-field edit-field" name="bvn" />
          </label>
          <br />

          <div className="field">
            <legend className="requiredText">Account Type</legend>
            <section id="check">
              <label className="check" htmlFor="A/Ctype">
                Savings
              </label>
              <input
                id="maleCheck"
                type="checkbox"
                value="Savings"
                name="A/Ctype"
              />

              <label className="check" htmlFor="A/Ctype">
                Current
              </label>
              <input
                id="maleCheck"
                type="checkbox"
                value="Current"
                name="A/Ctype"
              />
            </section>
          </div>
          <br />

          <div id="center-button">
            <Link to="/success">
              <Button name="Submit" type="Submit" />
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
