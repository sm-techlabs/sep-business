import { useEffect, useState } from "react";
import DynamicForm from "../DynamicForm";
import formClient from "../../clients/formClient";
import eventRequestClient from "../../clients/eventRequestClient";

const ReviewFMRegisteredEventRequestForm = ({ id }) => {

  const [initialValues, setInitialValues] = useState({})
  const [clientOptions, setClientOptions] = useState([])


  useEffect(() => {
  const getInitialValues = async () => {
    try {
      const response = await eventRequestClient.getById(id);

      // Map API structure -> form structure
      const mapped = {
        recordNumber: response.client?.id || "",
        eventType: response.eventType || "",
        startsOn: new Date(response.startsOn),
        endsOn: new Date(response.endsOn),
        estimatedBudget: response.estimatedBudget || 0,
        expectedNumberOfAttendees: response.expectedNumberOfAttendees || 0,
        preferences: {
          decorations: response.preferences?.decorations ?? false,
          parties: response.preferences?.parties ?? false,
          photosOrFilming: response.preferences?.photosOrFilming ?? false,
          breakfastLunchDinner: response.preferences?.breakfastLunchDinner ?? false,
          softHotDrinks: response.preferences?.softHotDrinks ?? false,
        },
      };
      setInitialValues(mapped);
    } catch (err) {
      console.error("Failed to fetch event request:", err);
    }
  };

  getInitialValues();
}, [id]);

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
    title: "Review Event Request - Registered Client",
    fields: [
    {
      name: "recordNumber",
      label: "Client Record",
      type: "dropdown",
      placeholder: "Select a Client Record",
      options: clientOptions,
      required: true,
      readOnly: true,
    },
    {
      name: "eventType",
      label: "Event Type",
      type: "text",
      placeholder: "e.g. Conference, Birthday, Wedding...",
      required: true,
      readOnly: true,
    },
    {
      name: "startsOn",
      label: "Start Date",
      type: "date",
      required: true,
      readOnly: true,
    },
    {
      name: "endsOn",
      label: "End Date",
      type: "date",
      required: true,
      readOnly: true,
    },
    {
      name: "estimatedBudget",
      label: "Estimated Budget (SEK)",
      type: "number",
      placeholder: "Enter estimated cost",
      required: true,
      readOnly: true,
    },
    {
      name: "expectedNumberOfAttendees",
      label: "Expected Number of Attendees",
      type: "number",
      placeholder: "e.g. 50",
      required: true,
      readOnly: true,
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
      readOnly: true,
    },
    {
      name: "budgetComment",
      label: "Budget Comment",
      type: "string",
      placeholder: "e.g. Budget seems reasonable.",
      required: true
    }
  ]}

  const handleEditSubmit = async (formData) => {
    await eventRequestClient.updateRegistered(id, formData);
    await eventRequestClient.approve(id);
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

export default ReviewFMRegisteredEventRequestForm;
