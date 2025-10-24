import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./modal-form.css";

const FinancialRequestForm = () => {
  const [formData, setFormData] = useState({
    requestingDepartment: "",
    projectReference: "",
    requiredAmount: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form submitted:\n${JSON.stringify(formData, null, 2)}`);
  };


  return (
    <div className="modal-form-container">
      <form className="modal-form" onSubmit={handleSubmit}>
        <h1 className="modal-form__title">New Recruitment Request</h1>
        <div className="form-row">
          <span className="form-label">Requesting department:</span>

          <div className="options-wrap">
            <label className="inline-option">
              <input
                type="radio"
                name="requestingDepartment"
                value="administration"
                checked={formData.requestingDepartment === "administration"}
                onChange={handleChange}
                required
              />
              Administration
            </label>

            <label className="inline-option">
              <input
                type="radio"
                name="requestingDepartment"
                value="services"
                checked={formData.requestingDepartment === "services"}
                onChange={handleChange}
              />
              Services
            </label>

            <label className="inline-option">
              <input
                type="radio"
                name="requestingDepartment"
                value="production"
                checked={formData.requestingDepartment === "production"}
                onChange={handleChange}
              />
              Production
            </label>

            <label className="inline-option">
              <input
                type="radio"
                name="requestingDepartment"
                value="financial"
                checked={formData.requestingDepartment === "financial"}
                onChange={handleChange}
              />
              Financial
            </label>
          </div>
        </div>
        
        <input
          className="modal-form__input"
          name="projectReference"
          type="text"
          placeholder="Project reference"
          value={formData.projectReference}
          onChange={handleChange}
          required
        />
        <input
          className="modal-form__input"
          name="requiredAmount"
          type="text"
          placeholder="Required amount"
          value={formData.requiredAmount}
          onChange={handleChange}
          required
        />
        <textarea
          className="modal-form__textarea"
          name="reason"
          placeholder="Reason"
          value={formData.reason}
          onChange={handleChange}
          rows={4}
        />
        <button className="modal-form__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FinancialRequestForm;
