import React, { useEffect, useState } from "react";
import DynamicForm from "../DynamicForm";
import formClient from "../../clients/formClient";

const ReviewRecruitmentRequestForm = (id) => {

  const [initialValues, setInitialValues] = useState({
    contractType: "Full Time Contract",
    requestingDepartment: "Service",
    yearsOfExperience: 15,
    jobTitle: "Senior Procrastinator",
    jobDescription: "Procrastinates a lot..."
  })

  useEffect(() => {
    // Add logic to read target recruitment request (id),
    // map values to initialValues fields
    // setInitialValues = {newly-acquired-values}
  }, []);

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
  ]
};

 const handleEditSubmit = async (formData) => {
    return await formClient.updateRecruitmentRequest(id, formData);
  };

  return (
    <div className="modal-form-container">
      <DynamicForm
        title={form.title}
        fields={form.fields}
        initialValues={initialValues}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
};

export default ReviewRecruitmentRequestForm;
