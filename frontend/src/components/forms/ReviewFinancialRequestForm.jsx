import React, { useEffect, useState } from "react";
import DynamicForm from "../DynamicForm";
import formClient from "../../clients/formClient";
import HR from "../cards/HR";

const ReviewFinancialRequestForm = (id) => {

  const [initialValues, setInitialValues] = useState({
    requestingDepartment: "Service",
    projectReference: "ef1220",
    requiredAmound: 5000,
    Reason: "Not enough money",
    HRDecision: "The staffing issue has been solved by outsourcing",
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
      name: "projectReference",
      label: "Project Reference",
      type: "text",
      placeholder: "Project Reference",
      required: true,
    },
    {
      name: "requiredAmount",
      label: "Required Amount (SEK)",
      type: "number",
      placeholder: "Required Amount",
      required: true,
    },
    {
      name: "Reason",
      label: "Reason",
      type: "text",
      placeholder: "e.g. This amount is required for...",
      required: true,
    },
    {
      name: "HRDecision",
      label: "Decision from HR",
      type: "string",
      placeholder: "The staffing issue has been solved by outsourcing",
      required: true
    }
  ]};

 const handleEditSubmit = async (formData) => {
    return await formClient.updateFinancialRequest(id, formData);
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

export default ReviewFinancialRequestForm;
