// import { async } from "@firebase/util";
import React, { useContext, useState } from "react";
import { RiderContext } from "../Contexts/RiderContext";
import "./paymentdetails.css";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

const ChangePaymentDetails = () => {
  const value = useContext(RiderContext);
  const { riderdata, token } = value;

  const [loading, setLoading] = useState(false);
  const [finalData, setFinalData] = useState({});
  const [parcelType, setParcelType] = useState("savings");
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleType = (e) => {
    setParcelType(e.target.value);
  };

  const [formData, setFormData] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
    accountType: "",
    bvn: "",
  });

  const navigate = useNavigate();
  // console.log(riderdata?.fullname.toLowerCase() === formData.bankName.toLowerCase())

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const changeDetails = async (e) => {
    e.preventDefault();
    if (
      riderdata?.fullname.toLowerCase() !== formData.accountName.toLowerCase()
    ) {
      setErrMessage(
        "Please Your Bank Account Holder Name Should Match Your Profile Name"
      );
      setTimeout(() => {
        setErrMessage("");
        setFormData({
          bankName: "",
          accountName: "",
          accountNumber: "",
          accountType: "",
          bvn: "",
        });
      }, 4000);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_bank_account_change_request/change_bank_account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: JSON.parse(token),
            new_bank_name: formData.bankName,
            new_account_no: formData.accountNumber,
            new_account_name: formData.accountName,
            new_account_type: parcelType,
            new_bvn: formData.bvn,
          }),
        }
      );
      const data = await res.json();
      const finalData = await data;
      setMessage("Request Sent Successfully");
      setTimeout(() => {
        setMessage("");
      }, 4000);
      setLoading(false);
      setFinalData(finalData?.request);
      setFormData({
        bankName: "",
        accountName: "",
        accountNumber: "",
        accountType: "",
        bvn: "",
      });
      navigate("/agent-profile");
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(formData)

  return (
    <div className="iiii">
      <section className="payment-details-section">
        <div className="payment-details-wrapper">
          <span className="green-message">{message}</span>
          <span className="red-message">{errMessage}</span>
          <form className="payment-details-form" onSubmit={changeDetails}>
            <label htmlFor="bankName">Bank Name</label> <br />
            <input
              type="text"
              name="bankName"
              id="bankName"
              onChange={handleChange}
              value={formData.bankName}
            />{" "}
            <br />
            <label htmlFor="holderName">Bank account holder name</label> <br />
            <input
              type="text"
              name="accountName"
              id="holderName"
              onChange={handleChange}
              value={formData.accountName}
            />{" "}
            <br />
            <label htmlFor="accountNumber">Bank account number</label> <br />
            <input
              type="number"
              name="accountNumber"
              id="acountNumber"
              onChange={handleChange}
              value={formData.accountNumber}
            />{" "}
            <br />
            <label htmlFor="accountType">Account type</label>
            <br />
            <select
              type="text"
              name="accountType"
              id="accountType"
              onChange={handleType}
              value={parcelType}
            >
              <option value="savings">Savings</option>
              <option value="current">Current</option>
            </select>{" "}
            <br />
            <label htmlFor="bvn">Bvn</label>
            <br />
            <input
              type="number"
              name="bvn"
              id="bvn"
              onChange={handleChange}
              value={formData.bvn}
            />
            <br />
            {/* <div className={finalData?.status === "pending" ? "hidden" : "shown"}>

            </div> */}
            <button
              type="submit"
              className="payment-btn margin-top"
              disabled={loading}
            >
              {loading ? (
                <ClipLoader color={"black"} loading={loading} size={30} />
              ) : (
                "Save and update"
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ChangePaymentDetails;
