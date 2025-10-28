import React from "react";
import DynamicForm from "../DynamicForm";
import formClient from "../../clients/formClient";

const CreateFinancialRequestForm = () => {
  const form = {
    title: "Financial Request",
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
      label: "Required Amount (€)",
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
  ]};

  return (
    <div className="modal-form-container">
      <DynamicForm
        title={form.title}
        fields={form.fields}
        onSubmit={formClient.createFinancialRequest}
      />
    </div>
  );
};

export default CreateFinancialRequestForm;
