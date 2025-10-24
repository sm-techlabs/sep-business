import React from "react";
import DynamicForm from "./DynamicForm";
import formClient from "../../clients/formClient";

const RegisteredEventRequestForm = () => {
  const fields = [
    {
      name: "eventType",
      label: "Event Type",
      type: "text",
      placeholder: "e.g. Conference, Birthday, Wedding...",
      required: true,
    },
    {
      name: "startsOn",
      label: "Start Date",
      type: "date",
      required: true,
    },
    {
      name: "endsOn",
      label: "End Date",
      type: "date",
      required: true,
    },
    {
      name: "estimatedBudget",
      label: "Estimated Budget (€)",
      type: "number",
      required: true,
      placeholder: "Enter estimated cost",
    },
    {
      name: "expectedNumberOfAttendees",
      label: "Expected Number of Attendees",
      type: "number",
      placeholder: "e.g. 50",
      required: true
    },
    {
      name: "recordNumber",
      label: "Client Record Number",
      type: "number",
      placeholder: "Enter your assigned record number",
      required: true,
    },
    {
      name: "preferences",
      label: "Preferences",
      type: "checkbox-group",
      options: [
        { name: "decorations", description: "Decorations" },
        { name: "parties", description: "Parties" },
        { name: "photosOrFilming", description: "Photos or Filming" },
        { name: "breakfastLunchDinner", description: "Breakfast, Lunch or Dinner" },
        { name: "softHotDrinks", description: "Soft or Hot Drinks" },
      ],
    }

  ];

  return (
    <div className="modal-form-container">
      <DynamicForm
        title="New Event Request - Registered Client"
        onSubmit={formClient.submitEventRequestForRegistered}
        fields={fields}
      />
    </div>
  );
};

export default RegisteredEventRequestForm;
