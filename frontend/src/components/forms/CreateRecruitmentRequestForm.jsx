import React from "react";
import DynamicForm from "../DynamicForm";
import formClient from "../../clients/formClient";
import recruitmentRequestClient from "../../clients/recruitmentRequestClient";

const CreateRecruitmentRequestForm = () => {
  const form = {
    title: "Create Recruitment Request",
    fields: [
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

  return (
    <div className="modal-form-container">
      <DynamicForm
        title={form.title}
        fields={form.fields}
        onSubmit={recruitmentRequestClient.create}
      />
    </div>
  );
};

export default CreateRecruitmentRequestForm;
