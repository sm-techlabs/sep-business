import React, { useEffect, useState } from "react";
import DynamicForm from "../DynamicForm";
import formClient from "../../clients/formClient";
import customerClient from "../../clients/customerClient";

const CreateRegisteredEventRequestForm = () => {

  const [clientOptions, setClientOptions] = useState([])

  useEffect(() => {
  const fetchClients = async () => {
    try {
      const response = await customerClient.getClients(); // should call GET /clients
      const clients = Array.isArray(response) ? response : [];

      // Ensure the structure matches expected shape
      const options = clients
        .filter(client => client && client.id && client.name)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(client => ({
          value: client.id,
          label: `${client.name} (${client.businessCode || "N/A"})`,
        }));

      if (options.length === 0) {
        console.warn("No clients found.");
      }
      setClientOptions(options);
    } catch (error) {
      console.error("Error fetching clients:", error);

      // Optional: show a fallback option in the dropdown
      setClientOptions([
        { value: "", label: "⚠️ Failed to load clients" },
      ]);
    }
  };

  fetchClients();
}, []);

  
  const form = {
    title: "New Event Request - Registered Client",
    fields: [
    {
      name: "recordNumber",
      label: "Client Record",
      type: "dropdown",
      placeholder: "Select a Client Record",
      options: clientOptions,
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

  ]
  }

  return (
    <div className="modal-form-container">
      <DynamicForm
        title={form.title}
        onSubmit={formClient.createEventRequestForRegistered}
        fields={form.fields}
      />
    </div>
  );
};

export default CreateRegisteredEventRequestForm;
