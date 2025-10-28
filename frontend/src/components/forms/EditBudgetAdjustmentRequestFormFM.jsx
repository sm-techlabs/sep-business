import React from "react";
import { useState, useEffect } from "react";
import DynamicForm from "../DynamicForm";
import budgetAdjustmentRequestClient from "../../clients/budgetAdjustmentRequestClient";
import applicationClient from "../../clients/applicationClient";

const   EditBudgetAdjustmentRequestFormFM = ({ id }) => {

  const [applicationOptions, setApplicationOptions] = useState([]);
  const [initialValues, setInitialValues] = useState({});

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

useEffect(() => {
  const getInitialValues = async () => {
    try {
      const response = await budgetAdjustmentRequestClient.getById(id);

      // Map API structure -> form structure
      const mapped = {
        applicationId: response.applicationReferenceId || "",
        requiredAmount: response.requiredAmount || 0,
        reason: response.reason || "",
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
    title: "Budget Adjustment Request",
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
      name: "applicationId",
      label: "Application Reference",
      type: "dropdown",
      options: applicationOptions,
      required: true,
      readOnly: true,
    },
    {
      name: "requiredAmount",
      label: "Required Amount (€)",
      type: "number",
      placeholder: "Required Amount",
      required: true,
      readOnly: true,
    },
    {
      name: "reason",
      label: "Reason",
      type: "text",
      placeholder: "e.g. This amount is required for...",
      required: true,
      readOnly: true,
    },
  ]};

  const handleEditSubmit = async (formData) => {
    return await budgetAdjustmentRequestClient.update(id, formData);
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

export default EditBudgetAdjustmentRequestFormFM;
