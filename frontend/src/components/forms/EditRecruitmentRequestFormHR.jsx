import React from "react";
import DynamicForm from "../DynamicForm";
import recruitmentRequestClient from "../../clients/recruitmentRequestClient";
import { useState, useEffect } from "react";

const EditRecruitmentRequestFormHR = ({ id }) => {
  
  const [initialValues, setInitialValues] = useState([])

  useEffect(() => {
  const getInitialValues = async () => {
    try {
      const response = await recruitmentRequestClient.getById(id);

      // Map API structure -> form structure
      const mapped = {
        jobTitle: response.jobTitle || "",
        minYearsOfExperience: response.minYearsOfExperience || 0,
        contractType: response.contractType || "",
        jobDescription: response.jobDescription || "",
        status: response.status || "",
      };
      setInitialValues(mapped);
    } catch (err) {
      console.error("Failed to fetch event request:", err);
    }
  };

  getInitialValues();
}, [id]);

  const form = {
    title: "Edit Recruitment Request",
    fields: [
      {
        name: "status",
        label: "Status",
        type: "dropdown",
        options:
        [
          { label: "Active", value: "Active" },
          { label: "Accepted", value: "Accepted" },
          { label: "Rejected", value: "Rejected" },
        ],
        required: true,
      },  
      {
        name: "jobTitle",
        label: "Job Title",
        type: "text",
        placeholder: "Job Title",
        required: true,
      },
      {
        name: "minYearsOfExperience",
        label: "Years of Experience Required",
        type: "number",
        placeholder: "Minimum Years of Experience",
        required: true,
      },
      {
        name: "contractType",
        label: "Contract Type",
        type: "dropdown",
        options:
        [
          { label: "Part Time", value: "Part Time" },
          { label: "Full Time", value: "Full Time" },
        ],
        required: true,
      },
      {
        name: "jobDescription",
        label: "Job Description",
        type: "text",
        placeholder: "e.g. This job requires proficiency in...",
        required: true,
      },
  ]};

  const handleEditSubmit = async (formData) => {
    return await recruitmentRequestClient.update(id, formData);
  };

  return (
    <div className="modal-form-container">
      <DynamicForm
        title={form.title}
        fields={form.fields}
        onSubmit={handleEditSubmit}
        initialValues={initialValues}
      />
    </div>
  );
};

export default EditRecruitmentRequestFormHR;
