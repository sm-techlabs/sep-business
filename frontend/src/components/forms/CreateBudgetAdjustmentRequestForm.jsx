import React from "react";
import { useState, useEffect } from "react";
import DynamicForm from "../DynamicForm";
import budgetAdjustmentRequestClient from "../../clients/budgetAdjustmentRequestClient";
import applicationClient from "../../clients/applicationClient";

const CreateBudgetAdjustmentRequestForm = () => {

  const [applicationOptions, setApplicationOptions] = useState([]);
  
  useEffect(() => {
  const fetchApplications = async () => {
    try {
      const response = await applicationClient.getAll();
      const applications = Array.isArray(response) ? response : [];

      const options = applications
        .filter((a) => a && a.id)
        .sort((a, b) => a.id - b.id)
        .map((app) => ({
          value: app.id,
          label: `Application #${app.id}`,
        }));

      setApplicationOptions(
        options.length
          ? options
          : [{ value: "", label: "⚠️ No applications found" }]
      );
    } catch (err) {
      console.error("Error fetching applications:", err);
      setApplicationOptions([
        { value: "", label: "⚠️ Failed to load applications" },
      ]);
    }
  };

  fetchApplications();
}, []);

  const form = {
    title: "Budget Adjustment Request",
    fields: [
    {
      name: "applicationId",
      label: "Application Reference",
      type: "dropdown",
      options: applicationOptions,
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
      name: "reason",
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
        onSubmit={budgetAdjustmentRequestClient.create}
      />
    </div>
  );
};

export default CreateBudgetAdjustmentRequestForm;
