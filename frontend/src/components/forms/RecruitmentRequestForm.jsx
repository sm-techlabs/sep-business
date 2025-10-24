import React from "react";
import DynamicForm from "../DynamicForm";
import formClient from "../../clients/formClient";

const RecruitmentRequestForm = () => {
  const fields = [
    {
      name: "contractType",
      label: "Contract Type",
      type: "text",
      placeholder: "Enter contract type",
      required: true,
    },
    {
      name: "requestingDepartment",
      label: "Requesting Department",
      type: "text",
      placeholder: "Service, Production, Financial",
      required: true,
    },
    {
      name: "yearsOfExperience",
      label: "Years of Experience Required",
      type: "number",
      placeholder: "Minimum Years of Experience",
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
      name: "jobDescription",
      label: "Job Description",
      type: "text",
      placeholder: "e.g. This job requires proficiency in...",
      required: true,
    },
  ];

  return (
    <div className="modal-form-container">
      <DynamicForm
        title="Recruitment Request"
        onSubmit={formClient.submitRecruitmentForm}
        fields={fields}
      />
    </div>
  );
};

export default RecruitmentRequestForm;
