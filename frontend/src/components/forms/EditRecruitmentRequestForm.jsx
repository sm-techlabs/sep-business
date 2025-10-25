import React from "react";
import DynamicForm from "../DynamicForm";
import formClient from "../../clients/formClient";

const EditRecruitmentRequestForm = () => {
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
  ],
  initialValues: {
    contractType: "Full Time Contract",
    requestingDepartment: "Service",
    yearsOfExperience: 15,
    jobTitle: "Senior Procrastinator",
    jobDescription: "Procrastinates a lot..."
  }
};

 const handleEditSubmit = async (formData) => {
    // Now you can pass both id and formData
    return await formClient.editRecruitmentForm('1', formData);
  };

  return (
    <div className="modal-form-container">
      <DynamicForm
        title={form.title}
        fields={form.fields}
        initialValues={form.initialValues}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
};

export default EditRecruitmentRequestForm;
