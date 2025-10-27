import { useEffect, useState } from "react";
import DynamicForm from "../DynamicForm";
import formClient from "../../clients/formClient";
import customerClient from "../../clients/customerClient";

const ReviewSCSOEventRequestForm = (id) => {

  const [clientOptions, setClientOptions] = useState([])
  const [initialValues, setInitialValues] = useState({
    // Placeholder values for visual confirmation
    recordNumber: 3,
    eventType: "Corporate Conference",
    startsOn: new Date("2025-11-05"),
    endsOn: new Date("2025-11-07"),
    estimatedBudget: 8500,
    expectedNumberOfAttendees: 120,
    preferences: {
      decorations: true,
      parties: false,
      photosOrFilming: true,
      breakfastLunchDinner: true,
      softHotDrinks: false,
    },
    review: {
      approved: false,
      rejected: false,     
    },
  })

  useEffect(() => {
    // Add logic to read target event request (id),
    // map values to initialValues fields
  }, []);

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
    },
    {
      name: "review",
      label: "Review (Senior Customer Service Officer)",
      type: "checkbox-group",
      options: [
        { name: "approve", description: "Approve" },
        { name: "reject", description: "Reject" },
      ],
    }
  ]}

  const handleEditSubmit = async (formData) => {
    return await formClient.updateEventRequest(id, formData);
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

export default ReviewSCSOEventRequestForm;
