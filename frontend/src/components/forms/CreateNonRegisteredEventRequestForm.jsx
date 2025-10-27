import React from "react";
import DynamicForm from "../DynamicForm";
import formClient from "../../clients/formClient";

const CreateNonRegisteredEventRequestForm = () => {

  const form = {
    title: "New Event Request - Non Registered Client",
    fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "New Customer Name",
      required: true,
    },
    {
      name: "email",
      label: "E-mail",
      type: "text",
      placeholder: "client@business.com",
      required: true,
    },
    {
      name: "businessCode",
      label: "Business Code",
      type: "text",
      placeholder: "Business identifier",
      required: true,
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      placeholder: "e.g. El. Venizelou 20, Thessaloniki 546 24, Greece",
      required: true,
    },
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
  ]};

  return (
    <div className="modal-form-container">
      <DynamicForm
        title={form.title}
        fields={form.fields}
        onSubmit={formClient.createEventRequestForNonRegistered}
      />
    </div>
  );
};

export default CreateNonRegisteredEventRequestForm;
