import React from "react";
import DynamicForm from "../DynamicForm";
import formClient from "../../clients/formClient";

const CreateRecruitmentRequestForm = () => {
  const form = {
    title: "Recruitment Request",
    fields: [
    {
      name: "contractType",
      label: "Contract Type",
      type: "text",
      placeholder: "Enter contract type",
      required: true,
    },
    {
      name: "requesingDepartment",
      label: "Requesting Department",
      type: "checkbox-group",
      options: [
        { name: "administraion", description: "Administration" },
        { name: "services", description: "Services" },
        { name: "production", description: "Production" },
        { name: "financial", description: "Financial" },
      ],
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
  ]};

  return (
    <div className="modal-form-container">
      <DynamicForm
        title={form.title}
        fields={form.fields}
        onSubmit={formClient.createRecruitmentRequest}
      />
    </div>
  );
};

export default CreateRecruitmentRequestForm;
