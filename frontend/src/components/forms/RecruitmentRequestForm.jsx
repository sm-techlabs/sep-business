import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./modal-form.css";

const RecruitmentRequestForm = () => {
  const [formData, setFormData] = useState({
    contractType: "",
    requestingDepartment: "",
    yearsOfExperience: "",
    jobTitle: "",
    jobDescription: "",
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
          <span className="form-label">Contract type:</span>

          <label className="inline-option">
            <input
              type="radio"
              name="contractType"
              value="full_time"
              checked={formData.contractType === "full_time"}
              onChange={handleChange}
              required
            />
            Full time
          </label>

          <label className="inline-option">
            <input
              type="radio"
              name="contractType"
              value="part_time"
              checked={formData.contractType === "part_time"}
              onChange={handleChange}
            />
            Part time
          </label>
        </div>

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
          name="jobTitle"
          type="text"
          placeholder="Job title"
          value={formData.jobTitle}
          onChange={handleChange}
          required
        />
        <input
          className="modal-form__input"
          name="yearsOfExperience"
          type="text"
          placeholder="Years of experience"
          value={formData.yearsOfExperience}
          onChange={handleChange}
          required
        />
        <textarea
          className="modal-form__textarea"
          name="jobDescription"
          placeholder="Job description"
          value={formData.jobDescription}
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

export default RecruitmentRequestForm;
