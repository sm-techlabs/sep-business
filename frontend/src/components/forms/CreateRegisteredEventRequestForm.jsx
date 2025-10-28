import React, { useEffect, useState, useMemo } from "react";
import DynamicForm from "../DynamicForm";
import customerClient from "../../clients/customerClient";
import eventRequestClient from "../../clients/eventRequestClient";

const CreateRegisteredEventRequestForm = () => {

  const [clientOptions, setClientOptions] = useState([])

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await customerClient.getClients();
        const clients = Array.isArray(response) ? response : [];

        const options = clients
          .filter((c) => c && c.id && c.name)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((client) => ({
            value: client.id,
            label: `${client.name} (${client.businessCode || "N/A"})`,
          }));

        setClientOptions(options.length ? options : [{ value: "", label: "⚠️ No clients found" }]);
      } catch (err) {
        console.error("Error fetching clients:", err);
        setClientOptions([{ value: "", label: "⚠️ Failed to load clients" }]);
      }
    };

    fetchClients();
  }, []);

  // Memoize the fields array so its identity is stable across renders
  const fields = useMemo(() => ([
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
  ]), [clientOptions]);

  return (
    <div className="modal-form-container">
      <DynamicForm
        title="New Event Request - Registered Client"
        onSubmit={eventRequestClient.createRegistered}
        fields={fields}
      />
    </div>
  );
};

export default CreateRegisteredEventRequestForm;
